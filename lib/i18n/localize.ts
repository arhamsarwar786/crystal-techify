import type { Messages } from "@/lib/i18n/types";
import type { Industry, PortfolioItem, Service } from "@/lib/types";
import { ENGAGEMENT_MODELS } from "@/lib/data";

export function locService(t: Messages, service: Service): Service {
  const copy = t.serviceItems[service.slug];
  return {
    ...service,
    title: copy?.title ?? t.nav[service.title] ?? service.title,
    description: copy?.description ?? service.description,
    overview: copy?.overview ?? service.overview,
    capabilities: copy?.capabilities ?? service.capabilities,
    deliverables: copy?.deliverables ?? service.deliverables,
  };
}

export function locIndustry(t: Messages, industry: Industry): Industry {
  const copy = t.industryItems[industry.slug];
  return {
    ...industry,
    name: copy?.name ?? t.nav[industry.name] ?? industry.name,
    description: copy?.description ?? industry.description,
  };
}

export function locCase(t: Messages, item: PortfolioItem): PortfolioItem {
  const copy = t.caseItems[item.slug];
  if (!copy) return item;
  return {
    ...item,
    name: copy.name,
    category: copy.category as PortfolioItem["category"],
    summary: copy.summary,
    outcome: copy.outcome,
    timeline: copy.timeline,
    teamSize: copy.teamSize,
    tags: copy.tags,
  };
}

export function locEngagement(t: Messages) {
  return ENGAGEMENT_MODELS.map((model) => {
    const copy = model.slug ? t.engagementModels[model.slug] : undefined;
    if (!copy) return model;
    return {
      ...model,
      title: copy.title,
      description: copy.description,
      bestFor: copy.bestFor,
      points: copy.points ?? model.points,
      qualifierLabel: copy.qualifierLabel ?? model.qualifierLabel,
      qualifierOptions: copy.qualifierOptions ?? model.qualifierOptions,
    };
  });
}
