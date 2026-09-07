import type { ServicePageContent } from "./types";

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "artificial-intelligence": {
    problem:
      "Most teams do not need another model demo. They need AI that sits inside a real product — with data, latency, cost, and quality you can run in production.",
    challenges: [
      {
        title: "Unclear use cases",
        body: "Pilots stall when the problem is framed as “add AI” instead of a measurable workflow: intake, search, forecasting, or support.",
      },
      {
        title: "Fragile prototypes",
        body: "Notebooks and vendor sandboxes do not survive auth, audit logs, or the first traffic spike.",
      },
      {
        title: "Cost and drift",
        body: "Without evaluation and monitoring, quality slips and token spend grows while nobody owns the operating budget.",
      },
    ],
    method: [
      {
        title: "Frame the outcome",
        body: "We map the job to be done, the data you actually have, and the risk envelope — then pick the thinnest model path that can ship.",
      },
      {
        title: "Build into the product",
        body: "Retrieval, agents, and ML services are wired to your APIs, permissions, and UI — not left as a sidecar chatbot.",
      },
      {
        title: "Operate after launch",
        body: "Eval sets, human review loops, and cost dashboards so the system stays useful after the first release.",
      },
    ],
    useCases: [
      {
        title: "Intelligent operations",
        body: "Classify, extract, and route documents, tickets, and claims so teams stop copying data by hand.",
      },
      {
        title: "Product copilots",
        body: "Assist users inside SaaS and mobile apps with grounded answers, not generic chat.",
      },
      {
        title: "Forecasting and NLP",
        body: "Custom models for demand, risk, and language when off-the-shelf APIs are not enough.",
      },
    ],
    stack: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "Hugging Face",
      "OpenAI / Gemini",
      "Vector search",
      "AWS",
      "GCP",
    ],
  },
  saas: {
    problem:
      "A SaaS product has to be multi-tenant, observable, and shippable on a calendar — not a pile of features that only works for the first ten customers.",
    challenges: [
      {
        title: "MVP that cannot scale",
        body: "Early shortcuts around tenancy, billing, and roles become a rewrite just as you start to win deals.",
      },
      {
        title: "Unclear architecture",
        body: "Founders need a system they can fund, demo, and hire into — not an unbounded “platform” sketch.",
      },
      {
        title: "Ops after launch",
        body: "Without CI/CD and observability, every release is a late-night incident.",
      },
    ],
    method: [
      {
        title: "Scope a buildable MVP",
        body: "We cut the first version to the workflow that wins the next round of customers, with an architecture that can grow.",
      },
      {
        title: "Ship cloud-native",
        body: "Multi-tenant data, auth, and billing patterns on AWS or GCP, with infrastructure as code from the start.",
      },
      {
        title: "Leave a clean codebase",
        body: "The next engineer you hire should be able to ship in week one — documented, tested, and owned.",
      },
    ],
    useCases: [
      {
        title: "B2B platforms",
        body: "Role-based workspaces, audit trails, and integrations for operations, legal, and healthcare teams.",
      },
      {
        title: "Vertical products",
        body: "Domain-specific SaaS for real estate, mobility, and professional services.",
      },
      {
        title: "Internal platforms",
        body: "Tools your own company runs as a product — with the same reliability bar as customer-facing software.",
      },
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Postgres",
      "AWS",
      "GCP",
      "Kubernetes",
      "Terraform",
    ],
  },
  "mobile-development": {
    problem:
      "Users judge your company on the first three seconds of the app. Slow screens, broken gestures, and store-rejection cycles kill products that looked fine in Figma.",
    challenges: [
      {
        title: "Two platforms, one budget",
        body: "Separate iOS and Android teams double cost unless the shared layer is designed on purpose.",
      },
      {
        title: "Store and device reality",
        body: "Permissions, offline, push, and OS versions are where “it works on my phone” falls apart.",
      },
      {
        title: "Design drift",
        body: "Without a system, every sprint ships a slightly different button and the brand unravels.",
      },
    ],
    method: [
      {
        title: "Pick the right runtime",
        body: "Flutter or React Native when one codebase is enough; native iOS and Android when the experience demands it.",
      },
      {
        title: "Design-system UI",
        body: "Components, spacing, and motion that stay on-brand as you add features.",
      },
      {
        title: "Launch and keep shipping",
        body: "Store listings, crash reporting, and performance budgets so v1 is the start, not the finish.",
      },
    ],
    useCases: [
      {
        title: "On-demand and mobility",
        body: "Booking, tracking, and payments for last-mile, EV, and field-service apps.",
      },
      {
        title: "Consumer products",
        body: "Retail, grocery, and food experiences that feel native on both stores.",
      },
      {
        title: "Companion apps",
        body: "Mobile clients for SaaS and operations tools your desktop product already has.",
      },
    ],
    stack: ["Flutter", "React Native", "iOS", "Android", "TypeScript", "Figma"],
  },
  design: {
    problem:
      "Engineering cannot guess the product. If journeys, states, and brand rules are not designed first, you pay for it in rework and confused users.",
    challenges: [
      {
        title: "Building before seeing",
        body: "Stakeholders approve a slide, then discover the flow is wrong once it is in code.",
      },
      {
        title: "Inconsistent UI",
        body: "Every screen is a one-off. The product never feels like one system.",
      },
      {
        title: "No evidence",
        body: "Opinions replace usability tests, and the first customers become unpaid QA.",
      },
    ],
    method: [
      {
        title: "Research the job",
        body: "Interviews, journey maps, and constraints from the people who will actually use the product.",
      },
      {
        title: "Prototype the risky parts",
        body: "Wireframes to high-fidelity clicks so you can fail cheaply before sprint zero.",
      },
      {
        title: "Hand off a system",
        body: "Tokens, components, and specs engineering can implement without a design bottleneck.",
      },
    ],
    useCases: [
      {
        title: "New product UX",
        body: "Zero-to-one interfaces for SaaS, mobile, and marketplaces.",
      },
      {
        title: "Redesigns",
        body: "Clarify a shipped product that grew too many screens and too little structure.",
      },
      {
        title: "Brand in product",
        body: "Make Crystal-grade visual language work at component scale, not just on a landing page.",
      },
    ],
    stack: ["Figma", "Prototyping", "Design systems", "User testing"],
  },
  ecommerce: {
    problem:
      "A store that looks good and cannot check out, sync inventory, or run promotions is a brochure. Commerce has to convert and operate.",
    challenges: [
      {
        title: "Checkout drop-off",
        body: "Slow carts, surprise fees, and broken payments leak revenue you already paid to acquire.",
      },
      {
        title: "Ops in spreadsheets",
        body: "Catalog, shipping, and inventory live in tools the storefront does not talk to.",
      },
      {
        title: "Platform lock-in anxiety",
        body: "Shopify, Woo, or custom — the wrong bet is expensive if the architecture is not honest about growth.",
      },
    ],
    method: [
      {
        title: "Choose the right stack",
        body: "Shopify or WooCommerce when they fit; a custom storefront when merchandising or B2B rules demand it.",
      },
      {
        title: "Wire the operations",
        body: "Payments, shipping, tax, and inventory so the store matches how the warehouse actually works.",
      },
      {
        title: "Tune for conversion",
        body: "PDP, cart, and search treated as product work, not theme decoration.",
      },
    ],
    useCases: [
      {
        title: "DTC and retail",
        body: "Brand storefronts that stay fast on campaign days.",
      },
      {
        title: "Food and grocery",
        body: "Catalogs, slots, and delivery windows that match supply-chain reality.",
      },
      {
        title: "B2B catalogs",
        body: "Account pricing, quotes, and reorder flows your sales team can live with.",
      },
    ],
    stack: ["Shopify", "WooCommerce", "WordPress", "Next.js", "Stripe", "Headless commerce"],
  },
  "web3-development": {
    problem:
      "On-chain work fails in public. Contracts, keys, and UX have to be designed for audits and real users — not a weekend hackathon.",
    challenges: [
      {
        title: "Security is the product",
        body: "A clever contract that cannot be reviewed is a liability, not a launch.",
      },
      {
        title: "Wallet UX",
        body: "If signing, gas, and errors are opaque, only insiders will finish the flow.",
      },
      {
        title: "Public vs private",
        body: "Consortia and enterprises often need permissioned ledgers, not a public L1 by default.",
      },
    ],
    method: [
      {
        title: "Design the on-chain surface",
        body: "What must live on-chain, what stays off-chain, and how upgrades will work.",
      },
      {
        title: "Build and review",
        body: "Solidity (and related) contracts with tests, plus front ends that talk to them clearly.",
      },
      {
        title: "Deploy with discipline",
        body: "Staging, audits, and runbooks so mainnet is not the first time you see the failure mode.",
      },
    ],
    useCases: [
      {
        title: "dApps and tokens",
        body: "Consumer and community products with wallets, NFTs, or utility tokens.",
      },
      {
        title: "Enterprise ledgers",
        body: "Private or consortium chains for provenance and settlement.",
      },
      {
        title: "Smart-contract platforms",
        body: "Ethereum-class applications Clutch already ranks us among the top blockchain consultancies for.",
      },
    ],
    stack: ["Ethereum", "Solidity", "TypeScript", "Next.js", "Hardhat", "Wallet APIs"],
  },
  cms: {
    problem:
      "Marketing should not file a ticket to change a headline. A CMS has to match how your team actually publishes — with governance, not chaos.",
    challenges: [
      {
        title: "Everything is hard-coded",
        body: "Engineers become the bottleneck for campaigns, SEO pages, and landing experiments.",
      },
      {
        title: "Too much freedom",
        body: "An unstructured CMS produces off-brand pages and broken layouts.",
      },
      {
        title: "Headless confusion",
        body: "A new CMS without a front-end model is just another admin nobody wants to open.",
      },
    ],
    method: [
      {
        title: "Model the content",
        body: "Types, relationships, and roles that match editorial reality.",
      },
      {
        title: "Build the presentation",
        body: "WordPress, headless, or a custom admin — with components that stay on-brand.",
      },
      {
        title: "Train the team",
        body: "Playbooks so publishing continues after we leave.",
      },
    ],
    useCases: [
      {
        title: "Marketing sites",
        body: "Campaign pages, blogs, and SEO landing systems.",
      },
      {
        title: "Product content",
        body: "Help centers, catalogs, and multi-locale publishing.",
      },
      {
        title: "Editorial products",
        body: "News and education platforms with workflows, not just a WYSIWYG.",
      },
    ],
    stack: ["WordPress", "Headless CMS", "Next.js", "Custom admin", "TypeScript"],
  },
  "digital-marketing": {
    problem:
      "A strong product still has to be found. Growth work that chases vanity traffic wastes budget; we measure against pipeline and retention.",
    challenges: [
      {
        title: "Channels without a system",
        body: "Ads, SEO, and content run as disconnected experiments with no shared scoreboard.",
      },
      {
        title: "Technical SEO debt",
        body: "Slow pages, weak IA, and unindexable apps cap organic growth no matter how much you write.",
      },
      {
        title: "Creative without conversion",
        body: "Campaigns that look busy but never hand a qualified lead to sales.",
      },
    ],
    method: [
      {
        title: "Set the scoreboard",
        body: "Acquisition, activation, and pipeline goals before a single campaign goes live.",
      },
      {
        title: "Fix the foundation",
        body: "Technical SEO, analytics, and on-site paths so spend is not leaking.",
      },
      {
        title: "Run and report",
        body: "Content and paid programs with reporting your leadership can act on.",
      },
    ],
    useCases: [
      {
        title: "Product launches",
        body: "Demand programs timed to a SaaS or app release.",
      },
      {
        title: "Organic compounding",
        body: "SEO and content systems that keep working after the sprint ends.",
      },
      {
        title: "Always-on paid",
        body: "Search and social with creative and landing pages that match the offer.",
      },
    ],
    stack: ["SEO", "Analytics", "Content ops", "Paid media", "Landing pages"],
  },
  "staff-augmentation": {
    problem:
      "Hiring full-time for a six-month spike is slow and expensive. You need senior people in the repo this month — from a pool you can trust.",
    challenges: [
      {
        title: "Time-to-hire",
        body: "Critical roadmap work waits on recruiting cycles you cannot compress.",
      },
      {
        title: "Wrong seniority",
        body: "Agencies send juniors who need the mentoring you were trying to buy.",
      },
      {
        title: "Cultural mismatch",
        body: "Contractors who never join Slack, standups, or your definition of done.",
      },
    ],
    method: [
      {
        title: "Match the stack",
        body: "AI, mobile, SaaS, and digital specialists drawn from a top 3% global pool, screened for the work you named.",
      },
      {
        title: "Embed, do not park",
        body: "Engineers join your tools, rituals, and codebase as dedicated capacity.",
      },
      {
        title: "Scale the squad",
        body: "Add or release people as the roadmap moves — without a second recruiting process.",
      },
    ],
    useCases: [
      {
        title: "AI and platform spikes",
        body: "Add ML or backend depth for a release you cannot staff internally in time.",
      },
      {
        title: "Product squads",
        body: "A full pod (design + engineering) sitting inside your org chart.",
      },
      {
        title: "Ongoing capacity",
        body: "A standing remote bench in the USA–Pakistan model we already operate.",
      },
    ],
    stack: [
      "AI engineers",
      "Full-stack",
      "Mobile",
      "QA",
      "DevOps",
      "Product design",
    ],
  },
};
