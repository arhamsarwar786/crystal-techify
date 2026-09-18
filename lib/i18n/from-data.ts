import {
  ADVANTAGES,
  AUDIT_DELIVERABLES,
  COMPANY,
  ENGAGEMENT_MODELS,
  INDUSTRIES,
  JOURNEY,
  MISSION_POINTS,
  PARTNERSHIPS,
  PORTFOLIO_ITEMS,
  PROCESS_STEPS,
  SERVICES,
  TECHNICAL_AUDIT,
  TESTIMONIALS,
  TRUST_METRICS,
} from "@/lib/data";
import { CASE_PAGES } from "@/lib/case-pages";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { SERVICE_PAGES } from "@/lib/service-pages";
import type { Messages } from "./types";

export function englishFromData(): Pick<
  Messages,
  | "companyAbout"
  | "companyTagline"
  | "serviceItems"
  | "industryItems"
  | "caseItems"
  | "categories"
  | "mission"
  | "journey"
  | "advantageItems"
  | "processSteps"
  | "engagementModels"
  | "auditExec"
  | "auditTech"
  | "testimonialsItems"
  | "trust"
  | "partnerships"
> {
  return {
    companyAbout: COMPANY.about,
    companyTagline: COMPANY.tagline,
    serviceItems: Object.fromEntries(
      SERVICES.map((s) => {
        const page = SERVICE_PAGES[s.slug];
        return [
          s.slug,
          {
            title: s.title,
            description: s.description,
            overview: s.overview,
            capabilities: s.capabilities,
            deliverables: s.deliverables,
            problem: page?.problem,
            challenges: page?.challenges,
            method: page?.method,
            useCases: page?.useCases,
          },
        ];
      }),
    ),
    industryItems: Object.fromEntries(
      INDUSTRIES.map((i) => {
        const page = INDUSTRY_PAGES[i.slug];
        return [
          i.slug,
          {
            name: i.name,
            description: i.description,
            overview: page?.overview,
            challenges: page?.challenges,
            approach: page?.approach,
            outcomes: page?.outcomes,
          },
        ];
      }),
    ),
    caseItems: Object.fromEntries(
      PORTFOLIO_ITEMS.map((p) => {
        const page = CASE_PAGES[p.slug];
        return [
          p.slug,
          {
            name: p.name,
            category: p.category,
            summary: p.summary,
            outcome: p.outcome,
            timeline: p.timeline,
            teamSize: p.teamSize,
            tags: p.tags,
            brief: page?.brief,
            context: page?.context,
            challenges: page?.challenges,
            approach: page?.approach,
            shipped: page?.shipped,
            stack: page?.stack,
          },
        ];
      }),
    ),
    categories: {
      All: "All",
      "Real Estate": "Real Estate",
      Marketing: "Marketing",
      Mobility: "Mobility",
      Legal: "Legal",
      Analytics: "Analytics",
      Architecture: "Architecture",
    },
    mission: MISSION_POINTS.map((p) => ({
      title: p.title,
      description: p.description,
    })),
    journey: JOURNEY.map((p) => ({
      title: p.title,
      description: p.description,
    })),
    advantageItems: ADVANTAGES.map((p) => ({
      title: p.title,
      description: p.description,
    })),
    processSteps: PROCESS_STEPS.map((p) => ({
      title: p.title,
      description: p.description,
    })),
    engagementModels: Object.fromEntries(
      ENGAGEMENT_MODELS.filter((m) => m.slug).map((m) => [
        m.slug as string,
        {
          title: m.title,
          description: m.description,
          bestFor: m.bestFor,
          points: m.points,
          qualifierLabel: m.qualifierLabel,
          qualifierOptions: m.qualifierOptions,
        },
      ]),
    ),
    auditExec: AUDIT_DELIVERABLES.map((d) => d.label),
    auditTech: TECHNICAL_AUDIT.map((d) => d.label),
    testimonialsItems: TESTIMONIALS.map((t) => ({
      quote: t.quote,
      role: t.role,
    })),
    trust: [
      ...TRUST_METRICS.map((m) => m.label),
      "Supported technologies",
    ],
    partnerships: {
      title: "Partnerships & recognition",
      description:
        "Certifications, delivery, and independent recognition — from a single US base.",
      items: PARTNERSHIPS.map((p) => ({ title: p.title, body: p.body })),
    },
  };
}
