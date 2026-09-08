import type { IndustryPageContent } from "./types";

export const INDUSTRY_PAGES: Record<string, IndustryPageContent> = {
  "e-commerce": {
    overview:
      "We build storefronts, marketplaces, and operations tools that convert — inventory, checkout, and fulfillment wired to the same system.",
    challenges: [
      {
        title: "Checkout drop-off",
        body: "Slow carts, weak search, and broken promotions leak revenue before ads ever pay back.",
      },
      {
        title: "Ops vs storefront",
        body: "Catalog, warehouse, and support live in different tools, so stock and promises drift.",
      },
      {
        title: "Channel sprawl",
        body: "Web, app, and marketplaces need one product and inventory source of truth.",
      },
    ],
    approach: [
      {
        title: "Commerce core",
        body: "Headless or Shopify-plus custom when the catalog and checkout need real product logic.",
      },
      {
        title: "Integrations",
        body: "ERP, payments, tax, and 3PL connected with jobs you can retry and observe.",
      },
      {
        title: "Growth loops",
        body: "Search, personalization, and merchandising that merchandisers can actually run.",
      },
    ],
    outcomes: [
      "Faster storefronts and fewer failed checkouts",
      "One catalog across web and app",
      "Admin tools for ops, not only marketing",
    ],
  },
  healthcare: {
    overview:
      "Healthcare software has to be usable on a ward and defensible in an audit. We ship clinical and ops products with access control, audit trails, and integrations that do not leak PHI.",
    challenges: [
      {
        title: "Fragmented records",
        body: "Intake, imaging, and billing sit in silos; staff re-key the same patient all day.",
      },
      {
        title: "Compliance as an afterthought",
        body: "HIPAA-style controls bolted on late force a rewrite of auth and logging.",
      },
      {
        title: "Clinician UX",
        body: "If the product fights the workflow, it will not get used — no matter how smart the model is.",
      },
    ],
    approach: [
      {
        title: "Workflow first",
        body: "We map the shift, not the org chart, then design the thinnest product that removes a step.",
      },
      {
        title: "Secure by default",
        body: "Roles, encryption, audit, and environment isolation from the first sprint.",
      },
      {
        title: "Interoperability",
        body: "HL7 / FHIR and vendor APIs where they exist; careful ETL where they do not.",
      },
    ],
    outcomes: [
      "Fewer manual handoffs between clinic and billing",
      "Audit-ready access logs",
      "Interfaces staff will actually open",
    ],
  },
  edtech: {
    overview:
      "Learning products need content, progress, and live sessions that stay reliable when a cohort hits at once. We build LMS, tutoring, and assessment platforms for that load.",
    challenges: [
      {
        title: "Content ops",
        body: "Authors, video, and quizzes live in different tools; learners see stale modules.",
      },
      {
        title: "Engagement drop",
        body: "Generic video players without progress, cohorts, or feedback do not retain students.",
      },
      {
        title: "Scale at term start",
        body: "Enrollment spikes break naive architectures every August.",
      },
    ],
    approach: [
      {
        title: "Learner loop",
        body: "Enroll, learn, practice, certify — with analytics instructors can act on.",
      },
      {
        title: "Media and realtime",
        body: "Streaming, live class, and chat that degrade gracefully on poor networks.",
      },
      {
        title: "Admin and SSO",
        body: "Schools and enterprises need rostering, roles, and the identity they already have.",
      },
    ],
    outcomes: [
      "Cohorts that can start on day one",
      "Content teams shipping without engineering every time",
      "Progress and assessment you can report on",
    ],
  },
  "food-grocery": {
    overview:
      "Food and grocery run on freshness, slots, and last-mile. We build ordering, inventory, and dispatch products that keep promises to the customer and the store.",
    challenges: [
      {
        title: "Slot and stock mismatch",
        body: "Customers book a window the warehouse cannot fill.",
      },
      {
        title: "Dark stores vs retail",
        body: "Picking, substitutions, and routing need different logic than a normal e-commerce cart.",
      },
      {
        title: "Thin margins",
        body: "Every extra click in the picker app or failed delivery eats the order.",
      },
    ],
    approach: [
      {
        title: "Promise engine",
        body: "Availability, cut-off times, and substitutions that ops can configure.",
      },
      {
        title: "Picker and rider apps",
        body: "Mobile flows for the people who actually move the goods.",
      },
      {
        title: "Demand signals",
        body: "Forecasting and promotions that do not oversell perishable stock.",
      },
    ],
    outcomes: [
      "Fewer substitutions and missed slots",
      "Faster pick paths",
      "Clear live order status for customers",
    ],
  },
  "real-estate": {
    overview:
      "Agents and operators need lead flow, listings, and documents in one place. We build CRMs, portals, and analytics for brokerage, proptech, and facilities.",
    challenges: [
      {
        title: "Leads in inboxes",
        body: "Portals dump inquiries that never become a pipeline with owners and SLAs.",
      },
      {
        title: "Listing drift",
        body: "Photos, prices, and availability differ across IDX, the website, and print.",
      },
      {
        title: "Slow close",
        body: "Contracts and KYC still bounce through email.",
      },
    ],
    approach: [
      {
        title: "Lead system",
        body: "Capture, score, assign, and follow up with a trail sales managers can see.",
      },
      {
        title: "Listing truth",
        body: "One inventory feed into web, app, and partner portals.",
      },
      {
        title: "Deal room",
        body: "Documents, e-sign, and status without another shared drive.",
      },
    ],
    outcomes: [
      "Faster response on inbound leads",
      "Listings that match what is actually for sale",
      "Less admin per closed deal",
    ],
  },
  retail: {
    overview:
      "Retail needs the floor, the site, and the warehouse telling the same story. We connect POS, e-commerce, and loyalty so staff and shoppers see one inventory.",
    challenges: [
      {
        title: "Channel conflict",
        body: "Online discounts fight in-store stock and confuse associates.",
      },
      {
        title: "Loyalty that does not stick",
        body: "Points systems nobody can explain at the register.",
      },
      {
        title: "Reporting lag",
        body: "Merchants wait overnight for numbers they needed this afternoon.",
      },
    ],
    approach: [
      {
        title: "Unified catalog",
        body: "SKU, price, and availability shared across POS and digital.",
      },
      {
        title: "Associate tools",
        body: "Clienteling and endless aisle that work on the device they already carry.",
      },
      {
        title: "Near-real-time ops",
        body: "Dashboards on sell-through, not a weekly export.",
      },
    ],
    outcomes: [
      "Fewer “out of stock” surprises",
      "Loyalty that cashiers can actually apply",
      "Buy-online-pickup-in-store that holds up",
    ],
  },
  blockchain: {
    overview:
      "We ship wallets, marketplaces, and on-chain integrations when the product actually needs a ledger — with the same product discipline as any other SaaS.",
    challenges: [
      {
        title: "Chain for its own sake",
        body: "Tokens without a user job create support load and regulatory risk.",
      },
      {
        title: "Key and custody UX",
        body: "If signing is hostile, only insiders will use the product.",
      },
      {
        title: "Indexing and ops",
        body: "Reads, reorgs, and gas make naive backends fail in production.",
      },
    ],
    approach: [
      {
        title: "Product gate",
        body: "We only put state on-chain when it earns its complexity.",
      },
      {
        title: "Safe UX",
        body: "Account abstraction, clear signing, and recovery paths.",
      },
      {
        title: "Reliable data",
        body: "Indexers, queues, and admin tools for support — not Discord as ops.",
      },
    ],
    outcomes: [
      "Contracts and frontends that match",
      "Support that can see on-chain state",
      "A launch you can monitor",
    ],
  },
  "on-demand-services": {
    overview:
      "On-demand products are matching, dispatch, and live status. We build booking, provider apps, and customer apps that stay in sync when demand spikes.",
    challenges: [
      {
        title: "Matching quality",
        body: "The wrong provider or a late assignment kills the brand in one ride or visit.",
      },
      {
        title: "Realtime maps",
        body: "Location, ETA, and chat have to work on cheap phones and bad networks.",
      },
      {
        title: "Two-sided ops",
        body: "Pricing, incentives, and support for both the customer and the fleet.",
      },
    ],
    approach: [
      {
        title: "Dispatch core",
        body: "Rules and optimization you can explain, then tune.",
      },
      {
        title: "Provider and customer apps",
        body: "Native or high-quality React Native with offline-tolerant status.",
      },
      {
        title: "Ops console",
        body: "Live map, tickets, and payouts for the control room.",
      },
    ],
    outcomes: [
      "Lower cancel rates",
      "ETAs people can trust",
      "A control tower instead of a spreadsheet",
    ],
  },
};
