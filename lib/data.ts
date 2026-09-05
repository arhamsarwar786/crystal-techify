import {
  Activity,
  Award,
  Blocks,
  BrainCircuit,
  Building2,
  Compass,
  Cpu,
  Factory,
  FlaskConical,
  Globe2,
  HeartPulse,
  LayoutDashboard,
  LineChart,
  Megaphone,
  Users,
  PenTool,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TerminalSquare,
  TestTube2,
  Truck,
  Wrench,
} from "lucide-react";
import type {
  EngagementModel,
  Industry,
  NavLink,
  PortfolioItem,
  ProcessStep,
  Service,
  Testimonial,
  TrustMetric,
} from "./types";

export const COMPANY = {
  name: "Crystal Techify",
  tagline:
    "Empowering businesses to weave the future of software, seamlessly together.",
  location: "Dublin, Ohio, USA",
  email: "info@crystaltechify.com",
  phone: "+1 (614) 714-6688",
  phoneHref: "tel:+16147146688",
} as const;

// Public profiles. Update the handles here if the company's accounts differ.
export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/crystaltechify/",
  },
  { label: "X", href: "https://x.com/crystaltechify" },
  { label: "GitHub", href: "https://github.com/crystaltechify" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
];

export const TRUST_METRICS: TrustMetric[] = [
  {
    icon: Rocket,
    value: "500+",
    label: "Projects executed worldwide",
  },
  {
    icon: Award,
    value: "Top 15",
    label: "Generative AI & Blockchain consulting on Clutch",
  },
  {
    icon: Star,
    value: "Top Rated Plus",
    label: "Ranked on Upwork",
  },
  {
    icon: ShieldCheck,
    value: "ISO 27001:2013",
    label: "Certified information security",
  },
];

export const SERVICES: Service[] = [
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Production-grade intelligence — from NLP and process automation to generative AI strategy and model deployment.",
    capabilities: ["NLP & LLMs", "Intelligent automation", "Generative AI consulting"],
    accent: "from-brand-red to-brand-orange",
  },
  {
    icon: ServerCog,
    title: "SaaS & Product Development",
    description:
      "End-to-end cloud platforms and rapid MVP creation engineered for scale, reliability, and time-to-market.",
    capabilities: ["Cloud-native architecture", "MVP to scale", "Multi-tenant SaaS"],
    accent: "from-brand-orange to-brand-red",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Development",
    description:
      "High-performance cross-platform applications with pixel-perfect interfaces and sub-second load times.",
    capabilities: ["Cross-platform apps", "Progressive web apps", "Design systems"],
    accent: "from-brand-red to-brand-orange",
  },
  {
    icon: Blocks,
    title: "Web3 & Blockchain",
    description:
      "Public and private smart contracts, decentralized applications, and tokenized infrastructure audited for security.",
    capabilities: ["Smart contracts", "dApps", "Private ledgers"],
    accent: "from-brand-orange to-brand-red",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Research-driven wireframing, prototyping, and experience strategy that turns complexity into clarity.",
    capabilities: ["Wireframing", "Prototyping", "UX strategy"],
    accent: "from-brand-red to-brand-orange",
  },
  {
    icon: Users,
    title: "Staff Augmentation",
    description:
      "Rapid access to the top 3% of dedicated AI engineers and developers, embedded directly in your team.",
    capabilities: ["Top 3% talent", "Dedicated engineers", "Flexible scaling"],
    accent: "from-brand-orange to-brand-red",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Strategic growth programs and digital presence optimization that compound your engineering investment.",
    capabilities: ["Growth strategy", "SEO & content", "Presence optimization"],
    accent: "from-brand-red to-brand-orange",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: 1,
    title: "Discovery",
    description:
      "We immerse in your business context, users, and constraints to define the problem worth solving.",
    icon: Search,
  },
  {
    index: 2,
    title: "Ideation",
    description:
      "Cross-functional workshops translate opportunities into a prioritized, testable product vision.",
    icon: Sparkles,
  },
  {
    index: 3,
    title: "Planning",
    description:
      "Architecture, roadmap, and delivery cadence are locked in with clear milestones and ownership.",
    icon: Compass,
  },
  {
    index: 4,
    title: "Design",
    description:
      "Wireframes evolve into interactive prototypes and a production-ready design system.",
    icon: PenTool,
  },
  {
    index: 5,
    title: "Development",
    description:
      "Engineers ship in tight iterations with continuous integration and code review at every merge.",
    icon: TerminalSquare,
  },
  {
    index: 6,
    title: "Testing",
    description:
      "Automated and exploratory QA validate performance, security, and edge cases before release.",
    icon: TestTube2,
  },
  {
    index: 7,
    title: "Deployment",
    description:
      "Zero-downtime releases with observability, rollback safety, and infrastructure as code.",
    icon: Rocket,
  },
  {
    index: 8,
    title: "Maintenance",
    description:
      "Ongoing optimization, monitoring, and feature evolution keep the product ahead of demand.",
    icon: Wrench,
  },
];

export const INDUSTRIES: Industry[] = [
  { icon: Truck, name: "Mobility & Logistics" },
  { icon: Building2, name: "Real Estate" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: LineChart, name: "Fintech" },
  { icon: Factory, name: "Manufacturing" },
  { icon: FlaskConical, name: "Legal & Compliance" },
  { icon: Globe2, name: "Sustainability" },
  { icon: Cpu, name: "Deep Tech" },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    name: "EV-Powered Last-Mile Mobility",
    client: "SW Industries",
    category: "Platforms",
    summary:
      "Customizable electric vehicles and fleet software built for dense urban logistics operations.",
    outcome: "Configurable EV platform powering last-mile delivery at city scale.",
    tags: ["IoT", "Fleet Software", "Hardware + Software"],
  },
  {
    name: "Visas.pt",
    client: "Visas.pt",
    category: "Web & Mobile",
    summary:
      "Legal consultation platform for Portuguese immigration and tax services with guided case flows.",
    outcome: "Digitized intake and advisory for cross-border immigration clients.",
    tags: ["Legal Tech", "Web App", "Workflow Automation"],
  },
  {
    name: "Parker & Co.",
    client: "Parker & Co.",
    category: "AI & Data",
    summary:
      "Real estate search experience with an automated home valuation engine driven by market data.",
    outcome: "Instant, data-backed property valuations at the point of search.",
    tags: ["ML Valuation", "Search", "Real Estate"],
  },
  {
    name: "PTVA Dashboard",
    client: "PTVA",
    category: "Sustainability",
    summary:
      "Public transit and personal vehicle carbon footprint analysis tool with scenario modeling.",
    outcome: "Actionable emissions insight for transit planners and commuters.",
    tags: ["Analytics", "Carbon Modeling", "Dashboards"],
  },
  {
    name: "Serreva",
    client: "Serreva",
    category: "Web & Mobile",
    summary:
      "Custom glass house architecture and construction showcase with immersive project galleries.",
    outcome: "A premium digital showroom for bespoke architectural builds.",
    tags: ["Brand Site", "3D / Visual", "CMS"],
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "AI & Data",
  "Web & Mobile",
  "Platforms",
  "Sustainability",
] as const;

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "A cross-functional squad — engineering, design, and delivery — operating as an extension of your org.",
    bestFor: "Long-term product ownership",
  },
  {
    icon: Rocket,
    title: "Product Development",
    description:
      "Full lifecycle delivery from discovery to launch with fixed outcomes and shared accountability.",
    bestFor: "New products & platforms",
  },
  {
    icon: Cpu,
    title: "Staff Augmentation",
    description:
      "Embed vetted senior engineers into your existing teams within days, not months.",
    bestFor: "Scaling capacity fast",
  },
  {
    icon: Compass,
    title: "Strategic Consulting",
    description:
      "Executive-level advisory on architecture, AI adoption, and digital transformation roadmaps.",
    bestFor: "Direction & de-risking",
  },
];

export const AUDIT_DELIVERABLES = [
  { icon: Activity, label: "Digital Transformation Audit" },
  { icon: TerminalSquare, label: "Code Review" },
  { icon: LayoutDashboard, label: "Scalability Assessment" },
  { icon: Cpu, label: "Tech Stack Evaluation" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Crystal Techify moved faster than any partner we've worked with and the quality never slipped. They felt like our own team from week one.",
    name: "Tristan Mogari",
    role: "Founder",
    company: "Green Light Media",
    initials: "TM",
  },
  {
    quote:
      "Their engineers understood our product goals deeply and made architectural calls that saved us months down the line.",
    name: "Trevor Shim",
    role: "Product Lead",
    company: "Porter",
    initials: "TS",
  },
  {
    quote:
      "Clear communication, senior talent, and real ownership of outcomes. The strategic consulting alone paid for itself.",
    name: "Mike Che",
    role: "Principal",
    company: "Plum Consulting",
    initials: "MC",
  },
  {
    quote:
      "From EV hardware integration to fleet software, they delivered a complex system on time and kept iterating with us.",
    name: "Sumuditha Wijesuriya",
    role: "CEO",
    company: "SW Industries",
    initials: "SW",
  },
];

export const TECH_STACK = [
  "Next.js",
  "TypeScript",
  "Python",
  "PyTorch",
  "TensorFlow",
  "LangChain",
  "OpenAI",
  "AWS",
  "GCP",
  "Kubernetes",
  "Solidity",
  "Rust",
  "React Native",
  "Postgres",
  "Snowflake",
  "Terraform",
];
