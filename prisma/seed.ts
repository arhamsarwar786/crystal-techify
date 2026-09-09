import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const jobs = [
  {
    title: "Senior AI Engineer",
    department: "Artificial Intelligence",
    location: "Dublin, Ohio / Hybrid",
    employmentType: "Full-time",
    salaryRange: "$140,000 – $180,000 + equity",
    description:
      "Crystal Techify ships applied AI into products that already have customers — not slide decks. As a Senior AI Engineer you will own the path from problem framing to a monitored model in production.\n\nYou will sit with product, backend, and the client’s operators. Success is a feature that is accurate, explainable enough for the domain, and cheap enough to run. We work across NLP, retrieval, computer vision, and agentic workflows depending on the engagement.",
    responsibilities:
      "Frame business problems as evaluation-backed ML or LLM systems\nDesign data pipelines, RAG stacks, and fine-tuning loops when they actually help\nShip inference APIs (Python) that other teams can depend on\nInstrument quality, latency, cost, and drift — and act on the numbers\nReview research, reject hype, and write the decision down\nMentor mid-level engineers on the AI squad",
    requirements:
      "5+ years shipping software, with 3+ years in ML / applied AI\nProduction Python and one of PyTorch or TensorFlow\nExperience serving models (FastAPI, batch jobs, or GPU inference)\nComfort with evaluation harnesses, not only notebooks\nClear written English for client-facing design notes",
    niceToHave:
      "LLM product experience (tool calling, evals, guardrails)\nVector search / RAG in production\nMLOps (feature stores, CI for models)\nDomain work in healthcare, legal, or logistics",
    benefits:
      "Hybrid Dublin HQ plus a strong remote culture\nHardware and cloud budget for experiments that ship\nMedical, dental, and 401(k) (US)\nConference and learning stipend\nSmall teams — you will see your work in production quickly",
    questions: JSON.stringify([
      {
        id: "work-auth",
        prompt: "Are you authorized to work in the United States?",
      },
      {
        id: "notice",
        prompt: "What is your notice period or earliest start date?",
      },
    ]),
  },
  {
    title: "Full-Stack Product Engineer",
    department: "Product Engineering",
    location: "Pakistan / Remote (UTC+5 overlap)",
    employmentType: "Full-time",
    salaryRange: "Competitive PKR, role-banded",
    description:
      "Build multi-tenant SaaS with TypeScript, Next.js, and Postgres. You will work in weekly slices with design and a product owner, and you will own features end to end — schema, API, UI, and the boring operational bits.\n\nCrystal Techify’s product squads are small. We care about readable code, tests where they pay off, and interfaces that do not fight the user.",
    responsibilities:
      "Ship product slices in Next.js (App Router) and TypeScript\nModel data in Postgres / Prisma and keep migrations honest\nBuild accessible UI that matches our design system\nWrite the API contracts other services will call\nPair on estimates, then hit them or raise the flag early\nSupport production: logs, errors, and the occasional incident",
    requirements:
      "Strong TypeScript and React in production\nHands-on SQL and at least one cloud deploy path\nTaste for simple, testable code over clever abstractions\nAbility to work overlap hours with US product leads\nPortfolio or GitHub we can actually run",
    niceToHave:
      "Next.js App Router and server actions\nDesign-system or Storybook work\nStaff-augmentation experience with US clients\nPlaywright or similar E2E",
    benefits:
      "Remote-first with optional Islamabad / Lahore meetups\nLearning budget and certifications\nEquipment stipend\nClear growth path to tech lead on client accounts",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Dublin, Ohio / Remote US",
    employmentType: "Full-time",
    salaryRange: "$95,000 – $125,000",
    description:
      "Design the products our engineers ship — B2B SaaS, operator tools, and the occasional marketing surface. You will go from messy problem to prototype to a system the team can reuse.\n\nWe need someone who can sit with a warehouse manager or a GC and still produce a crisp Figma file. Visual craft matters; so does the flow.",
    responsibilities:
      "Run lightweight discovery with clients and engineers\nMap flows, then high-fidelity UI in Figma\nDefine and extend our component language\nPrototype enough to kill bad ideas before they are built\nPartner on implementation QA — pixels and copy\nPresent work without theater",
    requirements:
      "4+ years product design for web or mobile software\nA portfolio of shipped B2B or complex consumer work\nFigma fluency (components, variants, auto-layout)\nAbility to write interface copy that is not lorem\nComfort in a fast agency-plus-product mix",
    niceToHave:
      "Motion / prototype tools (Rive, ProtoPie)\nDesign-system documentation\nLight front-end (HTML/CSS) so handoff is real\nExperience in logistics, legal, or healthcare UX",
    benefits:
      "Hybrid Dublin office\nMedical, dental, 401(k)\nConference and tool budget\nWork that ships on a weekly cadence",
  },
  {
    title: "Cloud & Platform Engineer",
    department: "Infrastructure",
    location: "Remote (US or Pakistan)",
    employmentType: "Full-time",
    salaryRange: "Banded by location",
    description:
      "Keep Crystal Techify and our clients’ platforms boring in the best way: reproducible deploys, observed systems, and least-privilege access. You will land Kubernetes, Terraform, and CI on accounts that range from a single SaaS to multi-region AI inference.",
    responsibilities:
      "Own Terraform modules and environment promotion\nRun Kubernetes (EKS/GKE) with sane defaults\nBuild CI/CD that developers do not have to fight\nSet up logging, tracing, and on-call that is actually used\nHarden secrets, networks, and IAM with the security lead\nDocument runbooks so you are not a bus factor of one",
    requirements:
      "4+ years in platform, SRE, or DevOps roles\nProduction Terraform and at least one managed Kubernetes\nAWS or GCP as a daily driver\nLinux, containers, and networking fundamentals\nIncident communication that stays calm",
    niceToHave:
      "ISO 27001 or SOC 2 evidence collection\nGPU workloads / inference clusters\nPulumi or CDK\nFinOps / cost dashboards",
    benefits:
      "Remote with flexible hours around overlap\nHome-lab / cloud sandbox budget\nCertifications paid\nPath into architecture on larger accounts",
  },
  {
    title: "React Engineer — Staff Augmentation",
    department: "Staff Augmentation",
    location: "Remote, client-facing (US hours)",
    employmentType: "Contract-to-hire",
    salaryRange: "Hourly, senior band",
    description:
      "Embed with a Crystal Techify client as their React engineer. You will join their stand-ups, use their repo, and ship as if you were on staff — with us behind you for delivery quality and backup.\n\nThis is not a ticket farm. Clients hire us because they need a senior who can design a feature, not only implement a spec.",
    responsibilities:
      "Join the client squad and match their engineering bar\nDeliver React / Next.js features with tests\nRaise design and architecture issues early\nReport status to Crystal Techify delivery, not only the client\nHand over cleanly if the engagement ends",
    requirements:
      "5+ years professional front-end, mostly React\nProduction TypeScript\nEvidence of working inside someone else’s codebase\nExcellent async communication in English\nWillingness to overlap US mornings or afternoons",
    niceToHave:
      "Next.js, GraphQL, or React Native\nPrior staff-aug or consultancy embedding\nAccessibility (WCAG) as a habit",
    benefits:
      "Stable contract through Crystal Techify\nPath to full-time on our product squads\nEquipment stipend\nNo bench-time games — we staff what we sell",
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@crystaltechify.com";
  const password = process.env.ADMIN_PASSWORD || "changeme";
  const passwordHash = await hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, isAdmin: true, name: "Crystal Admin" },
    create: {
      email,
      name: "Crystal Admin",
      passwordHash,
      isAdmin: true,
    },
  });

  for (const job of jobs) {
    const slug = slugify(job.title);
    await prisma.job.upsert({
      where: { slug },
      update: { ...job, active: true },
      create: { ...job, slug, active: true },
    });
  }

  console.log(`Seeded admin ${email} and ${jobs.length} detailed jobs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
