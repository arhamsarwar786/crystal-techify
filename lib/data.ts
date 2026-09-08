import {
  Activity,
  Blocks,
  BrainCircuit,
  Building2,
  ClipboardList,
  Compass,
  Cpu,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  LayoutGrid,
  Lightbulb,
  Megaphone,
  Users,
  PenTool,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  TerminalSquare,
  TestTube2,
  Trophy,
  UtensilsCrossed,
  Wrench,
  Globe2,
} from "lucide-react";
import { FaAws } from "react-icons/fa6";
import {
  SiAndroid,
  SiAngular,
  SiEthereum,
  SiFigma,
  SiFlutter,
  SiGooglecloud,
  SiHuggingface,
  SiApple,
  SiKubernetes,
  SiLangchain,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPytorch,
  SiPython,
  SiReact,
  SiShopify,
  SiSolidity,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiWordpress,
} from "react-icons/si";
import type {
  Advantage,
  EngagementModel,
  Industry,
  JourneyMilestone,
  MissionPoint,
  NavLink,
  PortfolioItem,
  ProcessStep,
  Service,
  TechStackItem,
  Testimonial,
  TrustMetric,
} from "./types";

export const COMPANY = {
  name: "Crystal Techify",
  tagline:
    "Empowering businesses to weave the future of software, seamlessly together.",
  about:
    "Crystal Techify is a premier technology company based in Dublin, Ohio, with a strong focus on Artificial Intelligence and advanced software solutions. We specialize in turning complex challenges into intelligent, data-driven digital products that help businesses innovate, operate smarter, and scale faster.",
  location: "Dublin, Ohio, USA",
  email: "info@crystaltechify.com",
  phone: "+1 (614) 714-6688",
  phoneHref: "tel:+16147146688",
  website: "www.crystaltechify.com",
} as const;

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
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Process", href: "/#process" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Careers", href: "/careers" },
];

export const TRUST_METRICS: TrustMetric[] = [
  {
    icon: Rocket,
    value: "500+",
    label: "Projects completed worldwide",
  },
  {
    icon: Users,
    value: "500+",
    label: "Happy clients",
  },
  {
    icon: Star,
    value: "Top 3%",
    label: "Global talent pool",
  },
  {
    icon: Globe2,
    value: "02",
    label: "Locations — USA & Pakistan",
  },
];

export const MISSION_POINTS: MissionPoint[] = [
  {
    index: "01",
    title: "Dedicated talent, on demand",
    description:
      "Provide instant access to dedicated, world-class developers through a remote, cloud-based model.",
  },
  {
    index: "02",
    title: "Frontier technology consulting",
    description:
      "Offer consultation in cutting-edge technologies like AI, Blockchain, and SaaS.",
  },
  {
    index: "03",
    title: "Built for startups and SMEs",
    description:
      "Cater specifically to startups and SMEs, offering comprehensive support throughout the entire software development lifecycle.",
  },
];

export const JOURNEY: JourneyMilestone[] = [
  {
    icon: Lightbulb,
    title: "Global Expansion Success",
    description:
      "Founded in 2021, providing development services in the US, expanding globally with over 500 successful projects executed worldwide.",
  },
  {
    icon: Globe2,
    title: "Tech Trend Mastery and Industry Recognition",
    description:
      "Embracing tech trends, ranked top in blockchain and AI on Clutch and others.",
  },
  {
    icon: Trophy,
    title: "International Growth and Market Penetration",
    description:
      "Our dedication to staying ahead of the curve has earned a top-15 ranking in both Generative AI and Blockchain Consulting.",
  },
  {
    icon: Sparkles,
    title: "Innovative Transition Strategy",
    description:
      "With over 500 successful projects, Crystal Techify continues to be a driving force in creating cutting-edge digital solutions.",
  },
];

export const ADVANTAGES: Advantage[] = [
  {
    index: "1",
    title: "Innovative and Action Oriented",
    description:
      "We are not only innovative thinkers — we take action to make our projects big, unique, and successful.",
  },
  {
    index: "2",
    title: "Quality and Growth-Focused",
    description:
      "Our team prioritizes quality and growth, which is essential for the success of our clients and company.",
  },
  {
    index: "3",
    title: "Streamlined Services",
    description:
      "Despite offering a range of services, Crystal Techify manages them seamlessly through a well-organized structure ensuring smooth project delivery.",
  },
  {
    index: "4",
    title: "Dedicated Support",
    description:
      "Crystal Techify is always available to provide continuous support and assistance so clients stay satisfied with our services.",
  },
];

export const SERVICES: Service[] = [
  {
    slug: "artificial-intelligence",
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    description:
      "AI-driven software, machine learning, natural language processing, and automation that turn complex work into intelligent products.",
    overview:
      "Our core expertise is Artificial Intelligence — from machine learning and NLP to intelligent automation. We take models from research to production so your product can operate smarter and scale faster.",
    capabilities: ["Machine Learning", "NLP", "Automation", "Generative AI"],
    deliverables: [
      "AI strategy and use-case framing tied to business outcomes",
      "ML, NLP, and generative models deployed into live products",
      "Automation of manual workflows with measurable time and cost savings",
      "Monitoring for quality, drift, and operating cost after launch",
    ],
    accent: "from-brand-red to-brand-orange",
  },
  {
    slug: "saas",
    icon: ServerCog,
    title: "SaaS",
    description:
      "Cloud platforms and multi-tenant products engineered for reliability, scale, and time-to-market.",
    overview:
      "We design and ship SaaS products end to end — from a fundable MVP to a multi-tenant platform — using the cloud architecture your next stage of growth will actually need.",
    capabilities: ["Cloud-native architecture", "MVP to scale", "Multi-tenant SaaS"],
    deliverables: [
      "Technical scoping and architecture for a buildable MVP",
      "Multi-tenant, cloud-native infrastructure",
      "CI/CD, observability, and infrastructure-as-code from day one",
      "A codebase your next engineering hire can work in",
    ],
    accent: "from-brand-orange to-brand-red",
  },
  {
    slug: "mobile-development",
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "High-performance iOS, Android, and cross-platform apps with pixel-perfect interfaces.",
    overview:
      "We build the apps your users actually feel — fast, consistent, and native-quality on iOS and Android, from Flutter and React Native to platform-specific work when it matters.",
    capabilities: ["iOS", "Android", "Flutter", "React Native"],
    deliverables: [
      "Native-feel cross-platform apps from a single codebase",
      "App Store and Play Store launch support",
      "Design-system-backed UI that stays on-brand as you ship",
      "Performance budgets enforced through automated testing",
    ],
    accent: "from-brand-red to-brand-orange",
  },
  {
    slug: "design",
    icon: PenTool,
    title: "Design",
    description:
      "Research-driven UI/UX, wireframes, and prototypes that turn complexity into clarity.",
    overview:
      "Our design team creates high-quality wireframes and prototypes so you can see the product before it is built — aligned with your brand and user-experience goals.",
    capabilities: ["Wireframing", "Prototyping", "UI/UX", "Design systems"],
    deliverables: [
      "User research and journey mapping grounded in real usage",
      "Low- to high-fidelity wireframes and clickable prototypes",
      "A design system ready to hand off to engineering",
      "Usability testing before a single line of code ships",
    ],
    accent: "from-brand-orange to-brand-red",
  },
  {
    slug: "ecommerce",
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Storefronts, catalogs, and checkout experiences that convert — from Shopify to custom platforms.",
    overview:
      "We build e-commerce that sells: catalog, cart, payments, and operations wired together so merchants can grow without fighting their own stack.",
    capabilities: ["Shopify", "WordPress / WooCommerce", "Custom storefronts"],
    deliverables: [
      "Store architecture, catalog, and checkout flows",
      "Payments, shipping, and inventory integrations",
      "Conversion-minded UX across web and mobile",
      "Admin tools your operations team can actually use",
    ],
    accent: "from-brand-red to-brand-orange",
  },
  {
    slug: "web3-development",
    icon: Blocks,
    title: "Web3 Development",
    description:
      "Public and private blockchain services, smart contracts, and decentralized applications.",
    overview:
      "We deliver innovative blockchain services including private and public development — smart contracts, dApps, and tokenized infrastructure with audit-grade rigor.",
    capabilities: ["Smart contracts", "dApps", "Private ledgers", "Tokenization"],
    deliverables: [
      "Smart contract design, development, and audit-ready delivery",
      "Decentralized application front ends wired to on-chain logic",
      "Public and private ledger infrastructure",
      "Security-reviewed contract deployments",
    ],
    accent: "from-brand-orange to-brand-red",
  },
  {
    slug: "cms",
    icon: LayoutGrid,
    title: "CMS",
    description:
      "Content platforms that let teams publish, manage, and scale without waiting on engineering.",
    overview:
      "We implement and customize content management systems so marketing and product teams can ship pages, campaigns, and catalogs with governance built in.",
    capabilities: ["WordPress", "Headless CMS", "Custom admin"],
    deliverables: [
      "CMS architecture matched to your editorial workflow",
      "Custom content models, roles, and publishing rules",
      "Theme and component systems that stay on-brand",
      "Training so your team can run the site after launch",
    ],
    accent: "from-brand-red to-brand-orange",
  },
  {
    slug: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Growth programs and digital presence that compound the product your engineers already shipped.",
    overview:
      "A great product still needs to be found. We build the growth engine — presence, content, and paid channels — measured against pipeline, not vanity metrics.",
    capabilities: ["Growth strategy", "SEO & content", "Paid media"],
    deliverables: [
      "A growth strategy tied to acquisition and retention goals",
      "Technical SEO and content programs built for compounding reach",
      "Campaign setup and reporting across core channels",
      "Reporting tied to pipeline and revenue, not just traffic",
    ],
    accent: "from-brand-orange to-brand-red",
  },
  {
    slug: "staff-augmentation",
    icon: Users,
    title: "Staff Augmentation",
    description:
      "Rapid access to dedicated AI engineers, developers, and digital professionals embedded in your team.",
    overview:
      "To support growing demand we offer staff augmentation, allowing organizations to rapidly scale with experienced AI engineers, developers, and digital professionals — ensuring agility and accelerated project timelines. Drawn from a top 3% global talent pool.",
    capabilities: ["Top 3% talent", "Dedicated engineers", "Flexible scaling"],
    deliverables: [
      "Pre-vetted senior engineers matched to your stack within days",
      "Direct integration into your existing team and workflow",
      "Flexible scaling up or down as roadmap needs shift",
      "No recruiting overhead, benefits admin, or long ramp-up",
    ],
    accent: "from-brand-red to-brand-orange",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: 1,
    title: "Discovery",
    description:
      "We begin with an in-depth discovery phase during which we gather information about the client’s business goals, project requirements, and technical specifications.",
    icon: Search,
  },
  {
    index: 2,
    title: "Ideation",
    description:
      "We work closely with the client to refine the project’s scope and goals, brainstorm ideas, and determine the best way to achieve the desired outcomes.",
    icon: Sparkles,
  },
  {
    index: 3,
    title: "Planning",
    description:
      "We create a detailed project plan, outlining the timeline, budget, and key deliverables, ensuring it aligns with the client’s requirements and is feasible.",
    icon: Compass,
  },
  {
    index: 4,
    title: "Design",
    description:
      "Our design team creates high-quality wireframes and prototypes to help the client visualize the final product — aligned with brand and user-experience goals.",
    icon: PenTool,
  },
  {
    index: 5,
    title: "Development",
    description:
      "Our development team uses the latest technologies and best practices to deliver high-quality software that aligns with the project plan and meets the client’s requirements.",
    icon: TerminalSquare,
  },
  {
    index: 6,
    title: "Testing",
    description:
      "Our quality assurance team rigorously tests the software to ensure it is free of bugs and performs optimally, meeting the client’s requirements.",
    icon: TestTube2,
  },
  {
    index: 7,
    title: "Deployment",
    description:
      "Upon successful testing and approval, we deploy the solution to ensure continued success without disrupting the client’s business.",
    icon: Rocket,
  },
  {
    index: 8,
    title: "Maintenance",
    description:
      "Upon successful deployment, we provide ongoing support and maintenance to ensure continued success without disrupting the client’s business.",
    icon: Wrench,
  },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "e-commerce",
    icon: ShoppingCart,
    name: "E-Commerce",
    description:
      "Empowering industries from technology to manufacture with our expert services.",
  },
  {
    slug: "healthcare",
    icon: HeartPulse,
    name: "Healthcare",
    description:
      "Offering comprehensive healthcare IT solutions from secure data storage.",
  },
  {
    slug: "edtech",
    icon: GraduationCap,
    name: "EdTech",
    description:
      "Delivering tailored EdTech solutions for seamless online learning.",
  },
  {
    slug: "food-grocery",
    icon: UtensilsCrossed,
    name: "Food & Grocery",
    description:
      "Enhancing the food and grocery sector with efficient supply chain management.",
  },
  {
    slug: "real-estate",
    icon: Building2,
    name: "Real Estate",
    description:
      "Empowering real estate professionals with cutting-edge tools for lead generation.",
  },
  {
    slug: "retail",
    icon: Store,
    name: "Retail",
    description:
      "We empower the retail industry through seamless e-commerce solutions and innovative digital strategies.",
  },
  {
    slug: "blockchain",
    icon: Blocks,
    name: "Blockchain",
    description:
      "Delivering innovative blockchain services including private and public development.",
  },
  {
    slug: "on-demand-services",
    icon: Smartphone,
    name: "On Demand Services",
    description:
      "Providing comprehensive on-demand services for efficient booking systems and customer interaction.",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "ev-last-mile-mobility",
    name: "EV-Powered Last-Mile Mobility Solutions",
    client: "SW Industries",
    category: "Mobility",
    summary:
      "Customizable electric vehicles (EVs) for last-mile mobility.",
    outcome:
      "A configurable EV platform that improved sustainability initiatives and operational efficiency for last-mile delivery.",
    tags: ["EV Solutions", "Transportation", "Mobility"],
    timeline: "1 Month (2024–2025)",
    teamSize: "2 Specialists",
  },
  {
    slug: "visas-pt-legal",
    name: "Legal Consultation Platform for Immigration & Tax Services",
    client: "Visas.pt",
    category: "Legal",
    summary:
      "Visa and relocation services, including legal assistance, NIF number, and bank account registration.",
    outcome:
      "Digitized intake and advisory for immigration, relocation, and legal services.",
    tags: ["Immigration", "Relocation", "Legal Services"],
    timeline: "1 Month",
    teamSize: "2 Specialists",
  },
  {
    slug: "parker-co-real-estate",
    name: "Real Estate Search and Home Valuation Platform",
    client: "Parker & Co.",
    category: "Real Estate",
    summary:
      "Online platform to search homes, rentals, and estimate property values with support from real estate professionals.",
    outcome:
      "Seamless search and home valuation tools that made the home-buying process easier and more efficient.",
    tags: ["Real Estate", "Property Search", "Home Valuation"],
    timeline: "1 Month (2025)",
    teamSize: "2 Specialists",
  },
  {
    slug: "ptva-transit-dashboard",
    name: "Public Transit and Personal Vehicles Analysis Dashboard",
    client: "PTVA",
    category: "Analytics",
    summary:
      "Dashboard for public transit and personal-vehicle analysis with data-driven insight into fuel consumption and carbon emissions.",
    outcome:
      "Actionable environmental assessments that help guide sustainable transport strategies.",
    tags: ["Data Visualization", "Transportation", "Environmental Analysis"],
    timeline: "3 Month",
    teamSize: "3 Specialists",
  },
  {
    slug: "serreva-glass-house",
    name: "Custom Glass House Design and Construction",
    client: "Serreva",
    category: "Architecture",
    summary:
      "Design and construction of custom glass houses with a focus on aesthetics and functionality, blending design and nature.",
    outcome:
      "A premium digital experience for bespoke architectural and construction services.",
    tags: ["Architecture", "Construction", "Design Services"],
    timeline: "15 Days",
    teamSize: "1 Specialist",
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Mobility",
  "Legal",
  "Real Estate",
  "Analytics",
  "Architecture",
] as const;

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    icon: Users,
    title: "Dedicated Development Team",
    description:
      "Our dedicated development team provides flexible and scalable solutions tailored to your business requirements, with personalized attention and specialized skills to bring your projects to life.",
    bestFor: "Long-term product ownership",
  },
  {
    icon: Rocket,
    title: "Product Development",
    description:
      "End-to-end support for teams looking to develop and bring new software products to market. Our experts work closely with clients to understand their vision — from ideation to launch and beyond.",
    bestFor: "New products & platforms",
  },
  {
    icon: Cpu,
    title: "Staff Augmentation",
    description:
      "Quickly scale internal engineering teams with highly skilled software development professionals. A flexible model that can be customized to the specific needs of the project.",
    bestFor: "Scaling capacity fast",
  },
  {
    icon: ClipboardList,
    title: "Consultant",
    description:
      "Ideal for businesses looking for expert advice on software initiatives. Experienced consultants provide guidance on the latest technologies and best practices so you can make informed decisions.",
    bestFor: "Direction & de-risking",
  },
];

export const AUDIT_DELIVERABLES = [
  { icon: Activity, label: "Digital Transformation Audit" },
  { icon: LayoutDashboard, label: "Market Gap Analysis" },
  { icon: Cpu, label: "Tech Stack Evaluation" },
  { icon: ShieldCheck, label: "ROI Projections" },
];

export const TECHNICAL_AUDIT = [
  { icon: Compass, label: "Architecture Review" },
  { icon: TerminalSquare, label: "Code Quality Report" },
  { icon: LayoutDashboard, label: "Scalability Assessment" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Crystal Techify is a core part of our engineering team. They are extremely responsive, always online, and by far the most effective programmers we’ve ever worked with.",
    name: "Tristan Mogari",
    role: "Green Light Media & Marketing",
    company: "Green Light Media & Marketing",
    initials: "TM",
  },
  {
    quote:
      "The Public Transit and Personal Vehicles Analysis Dashboard has been an invaluable tool for our environmental assessments. The data-driven insights into fuel consumption and carbon emissions are top-notch and have helped guide our sustainable transport strategies.",
    name: "Trevor Shim",
    role: "Co-Founder",
    company: "Porter",
    initials: "TS",
  },
  {
    quote:
      "Crystal Techify has been an invaluable partner in enhancing Parker & Co.’s real estate platform. Their technical expertise in developing seamless search and home valuation tools has made the home-buying process much easier and more efficient for our clients.",
    name: "Mike Che",
    role: "Plum Consulting Agency",
    company: "Plum Consulting Agency",
    initials: "MC",
  },
  {
    quote:
      "SW Industries has greatly benefited from the customizable EV solutions provided by their team. The innovative approach to last-mile mobility has significantly improved our sustainability initiatives and operational efficiency.",
    name: "Sumuditha Wijesuriya",
    role: "Founder",
    company: "SW Industries",
    initials: "SW",
  },
];

export const TECH_STACK: TechStackItem[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "iOS", icon: SiApple },
  { name: "Android", icon: SiAndroid, color: "#3DDC84" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
  { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
  { name: "Ethereum", icon: SiEthereum, color: "#627EEA" },
  { name: "Solidity", icon: SiSolidity, color: "#363636" },
  { name: "Shopify", icon: SiShopify, color: "#7AB55C" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Postgres", icon: SiPostgresql, color: "#4169E1" },
  { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
];
