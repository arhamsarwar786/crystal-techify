import type { CasePageContent } from "./types";

export const CASE_PAGES: Record<string, CasePageContent> = {
  "ai-automation-real-estate": {
    brief:
      "Parker & Co. needed listing, lead, and valuation work to stop living in inboxes and spreadsheets so brokers could stay with clients instead of copying data between tools.",
    context:
      "Parker & Co. is a Boston real-estate firm. Brokers were already good at clients, pricing judgment, and showings. The drag was the work around those conversations: listing records that had to be typed twice, inbound leads that sat in a shared inbox, and valuation support assembled by hand for every comparable home. We did not replace the firm’s process. We sat with how listing and intake actually ran, then automated the repeatable layer so the same people could spend the week with buyers and sellers instead of with spreadsheets.",
    challenges: [
      {
        title: "Repetitive listing ops",
        body: "Property details, photos, and status updates were re-entered by hand every time a listing moved.",
      },
      {
        title: "Leads without a path",
        body: "Inbound interest arrived faster than the team could route it, so follow-up depended on whoever saw the email first.",
      },
      {
        title: "Valuation as a side task",
        body: "Pricing support existed, but it was slow to assemble and hard to reuse across similar homes.",
      },
    ],
    approach: [
      {
        title: "Map the real workflow",
        body: "We sat with the listing and intake path as it actually ran — not an idealized funnel — and marked the steps that should never be typed twice.",
      },
      {
        title: "Automate the repeatable layer",
        body: "AI-assisted listing and lead-routing took the copy-paste work. Brokers kept judgment, pricing, and client conversations.",
      },
      {
        title: "Keep people in the loop",
        body: "Routing and valuation support surfaced in the tools the team already used, so adoption did not require a second system.",
      },
    ],
    shipped: [
      "Listing assistance that drafts and updates property records from the information the team already captures",
      "Lead routing so new inquiries reach the right broker without a shared inbox scramble",
      "Valuation support the team can reuse on comparable homes",
      "A specialist engagement sized to the workflow — not a multi-year platform rewrite",
    ],
    stack: ["AI workflows", "Listing ops", "Lead routing", "Valuation support"],
  },
  "ai-automation-marketing": {
    brief:
      "Green Light Media & Marketing was spending senior time on campaign setup, content assembly, and reporting. The work needed a production path so strategy stayed with people and repetition did not.",
    context:
      "The agency’s clients still needed original briefs, offers, and creative direction. What ate the calendar was rebuilding campaign scaffolding every flight: checklists, asset folders, copy fragments, and a reporting export that arrived too late to change the next burst. We kept strategy with the team and built AI-assisted production so a new campaign starts from the last one. The point was not a new marketing stack. It was getting senior people off assembly work without hiring a dedicated ops role.",
    challenges: [
      {
        title: "Campaign ops as the job",
        body: "Launches meant rebuilding briefs, assets, and checklists instead of reusing a known sequence.",
      },
      {
        title: "Content in fragments",
        body: "Copy and creative lived across docs and threads, so every client cycle started from a blank page.",
      },
      {
        title: "Reporting after the fact",
        body: "Performance arrived as a manual export, too late to change the next flight.",
      },
    ],
    approach: [
      {
        title: "Separate strategy from production",
        body: "We kept briefs, offers, and client judgment with the team, and automated the assembly work that followed.",
      },
      {
        title: "Wire a repeatable campaign path",
        body: "AI-assisted workflows for content and reporting so a new flight starts from the last one, not from zero.",
      },
      {
        title: "Hand back the calendar",
        body: "The agency still owns creative direction. The system owns the busywork that was eating the week.",
      },
    ],
    shipped: [
      "Campaign operations that reuse structure from prior launches",
      "Content assembly support grounded in the client’s existing voice and assets",
      "Reporting workflows that do not wait on a one-off spreadsheet",
      "A specialist engagement the marketing team can run without a new ops hire",
    ],
    stack: ["Campaign ops", "Content assembly", "Reporting", "AI assistance"],
  },
  "ev-last-mile-mobility": {
    brief:
      "SW Industries needed a configurable last-mile EV story they could sell and operate — vehicle options, sustainability claims, and delivery reality in one place, not a static brochure.",
    context:
      "SW Industries builds customizable electric vehicles for last-mile work. Buyers needed to see what they could actually order — payload, configuration, and how the vehicle supported sustainability goals — without waiting on someone who knew the catalog by heart. The window was one month and two specialists. We treated configuration as the product: a structured catalog, claims next to the vehicle, and a platform the SW team could keep running after we left instead of a brochure site that would be stale in a quarter.",
    challenges: [
      {
        title: "Configuration was tribal",
        body: "Last-mile specs lived with a few people. Buyers could not see what they could actually order.",
      },
      {
        title: "Sustainability without a system",
        body: "Environmental goals were real, but they were not expressed as product choices a customer could make.",
      },
      {
        title: "Ops had to keep moving",
        body: "The engagement was a month with two specialists — the platform had to ship, not wait on a greenfield rebuild.",
      },
    ],
    approach: [
      {
        title: "Make configuration the product",
        body: "We treated EV options as a structured catalog so last-mile buyers could see fit, not a PDF of variants.",
      },
      {
        title: "Tie claims to the vehicle",
        body: "Sustainability and efficiency messaging sat next to the configuration, not in a separate brand deck.",
      },
      {
        title: "Ship a usable platform",
        body: "A small team, a one-month window, and a surface SW Industries could keep operating after we left.",
      },
    ],
    shipped: [
      "A configurable EV platform for last-mile mobility",
      "Product presentation that connects vehicle options to sustainability and operations",
      "A delivery path a two-person specialist team could complete in a month",
      "A foundation SW Industries can extend as the catalog grows",
    ],
    stack: ["Product catalog", "Configuration", "Web platform", "Operations"],
  },
  "visas-pt-legal": {
    brief:
      "Visas.pt needed intake and advisory for immigration, relocation, NIF, and banking support to run as a product — not a stack of forms and email threads.",
    context:
      "Visas.pt helps people with Portuguese immigration, relocation, NIF, and bank-account setup. Clients often buy several of those services together, but the work arrived as unstructured email. Staff re-asked for documents, and advisory lived in calls no one else could continue. In a one-month, two-specialist engagement we digitized the front door: structured intake, a single client record across visa and relocation work, and a consultation path that supports counsel instead of pretending to replace it.",
    challenges: [
      {
        title: "Intake by inbox",
        body: "New matters arrived as unstructured messages. Staff re-asked for the same documents on every case.",
      },
      {
        title: "Several services, one client",
        body: "Visa, relocation, tax ID, and bank setup were sold together but tracked separately.",
      },
      {
        title: "Advisory had no home",
        body: "Legal guidance lived in calls and attachments instead of a record the next advisor could continue.",
      },
    ],
    approach: [
      {
        title: "Digitize the front door",
        body: "Structured intake so documents and matter type are captured once, before a lawyer spends time reconstructing the file.",
      },
      {
        title: "One path per client",
        body: "Immigration, relocation, and adjacent services share a record so handoffs do not restart the story.",
      },
      {
        title: "Keep counsel in the product",
        body: "The platform supports advisory. It does not pretend to replace it.",
      },
    ],
    shipped: [
      "Digitized intake for immigration and relocation matters",
      "A consultation path that covers visa, NIF, and bank-account support in one place",
      "Records staff can continue from instead of rebuilding from email",
      "A one-month, two-specialist delivery the Visas.pt team could start using immediately",
    ],
    stack: ["Intake", "Case records", "Consultation UX", "Document capture"],
  },
  "parker-co-real-estate": {
    brief:
      "Parker & Co. wanted buyers and renters to search homes and understand value with the firm’s professionals still in the loop — a platform, not another generic listing wall.",
    context:
      "Public portals already showed Boston inventory. They did not carry Parker & Co.’s process, brand, or people. Buyers left search to get a valuation, then disappeared into a contact form. In 2025 a two-specialist team spent a month putting search, home-value tools, and a path to an advisor in one product. The firm stays in the journey. The platform is the front door, not a replacement for a professional.",
    challenges: [
      {
        title: "Search without a firm behind it",
        body: "Public portals showed inventory. They did not carry Parker & Co.’s process or people.",
      },
      {
        title: "Valuation as a separate errand",
        body: "Estimating a home meant leaving the search experience and waiting on a follow-up.",
      },
      {
        title: "Professionals were an afterthought",
        body: "If support from an agent was the differentiator, it had to be in the product, not a footer phone number.",
      },
    ],
    approach: [
      {
        title: "Search as the front door",
        body: "We built listing search for homes and rentals the way a Boston buyer actually filters — then kept the firm’s brand on every step.",
      },
      {
        title: "Put valuation next to the listing",
        body: "Home-value tools sit in the same journey as search, so interest does not drop into a contact form and disappear.",
      },
      {
        title: "Keep the advisor in the flow",
        body: "The product makes it easier to involve a Parker & Co. professional, not to skip them.",
      },
    ],
    shipped: [
      "Online search for homes and rentals under the Parker & Co. brand",
      "Home valuation tools in the same experience as discovery",
      "Paths for buyers to involve a real estate professional without leaving the product",
      "A one-month, two-specialist delivery in 2025",
    ],
    stack: ["Property search", "Home valuation", "Advisor handoff", "Web platform"],
  },
  "ptva-transit-dashboard": {
    brief:
      "PTVA needed a dashboard that made public-transit and personal-vehicle data usable for fuel use and carbon questions — so environmental assessments could be argued from the same numbers.",
    context:
      "Transit and private vehicles were measured in different files, so sustainability comparisons were slow and easy to dispute. Fuel and emissions lived with a few people who understood the spreadsheets. Leadership could not interrogate the picture themselves. Over three months, three specialists framed both modes in one model and shipped a dashboard for consumption, carbon, and the cuts that change a recommendation — a working surface, not a quarterly slide.",
    challenges: [
      {
        title: "Two modes, one question",
        body: "Transit and private vehicles were measured differently, so comparisons for sustainability work were slow and disputed.",
      },
      {
        title: "Spreadsheets as the product",
        body: "Fuel and emissions lived in files a few people understood. Leadership could not interrogate the picture themselves.",
      },
      {
        title: "Insight had to be operational",
        body: "The dashboard had to guide transport strategy, not decorate a slide once a quarter.",
      },
    ],
    approach: [
      {
        title: "One model for both fleets",
        body: "We framed public transit and personal vehicles in the same analysis so fuel and carbon could be compared without a side conversion.",
      },
      {
        title: "Make the data visible",
        body: "A dashboard for the assessments PTVA already runs — consumption, emissions, and the cuts that change a recommendation.",
      },
      {
        title: "Leave it in their hands",
        body: "Three specialists over three months, with a surface the team can keep using as new data arrives.",
      },
    ],
    shipped: [
      "A dashboard covering public transit and personal-vehicle analysis",
      "Views for fuel consumption and carbon emissions in the same working file",
      "Environmental assessments the team can take into transport strategy conversations",
      "A three-month engagement with a three-person specialist team",
    ],
    stack: ["Dashboards", "Data visualization", "Emissions analysis", "Transit data"],
  },
  "serreva-glass-house": {
    brief:
      "Serreva’s custom glass houses are a high-touch design and construction offer. They needed a digital experience that matched that standard so prospects could see the work before a site visit.",
    context:
      "A glass house is not a catalog SKU. Materials, light, and the landscape have to show up before anyone books a site visit, and Serreva sells a design-and-build process rather than a product grid. The engagement was fifteen days and one specialist. We led with craft — photography, structure, and copy that treat the houses as architecture — then explained what happens after the first conversation so the site could be the front door without a long platform program.",
    challenges: [
      {
        title: "The product is the building",
        body: "A glass house cannot be understood from a generic contractor site. Materials, light, and nature had to show up in the experience.",
      },
      {
        title: "Design and construction together",
        body: "Serreva sells a process, not a catalog SKU. The site had to explain how a house is specified, not only how it looks.",
      },
      {
        title: "A short, focused build",
        body: "Fifteen days and one specialist — the experience had to be premium without a long platform program.",
      },
    ],
    approach: [
      {
        title: "Lead with the craft",
        body: "Photography, structure, and copy that treat glass houses as architecture, not as a theme template.",
      },
      {
        title: "Explain the path",
        body: "Design and construction sit in one narrative so a prospect knows what happens after the first conversation.",
      },
      {
        title: "Ship the experience",
        body: "A concise engagement: one specialist, a two-week window, a site Serreva can keep as the front door.",
      },
    ],
    shipped: [
      "A premium digital experience for bespoke glass-house design and construction",
      "A narrative that connects aesthetics, function, and the landscape around the house",
      "A path from first look to a design conversation",
      "A 15-day, single-specialist delivery",
    ],
    stack: ["Brand site", "Architecture narrative", "Visual design", "Inquiry path"],
  },
};
