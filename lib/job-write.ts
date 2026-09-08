export type JobPayload = {
  title?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  salaryRange?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  niceToHave?: string;
  benefits?: string;
  active?: boolean;
};

export function jobWriteData(body: JobPayload, mode: "create" | "update") {
  if (mode === "create") {
    return {
      title: (body.title ?? "").trim(),
      department: body.department?.trim() || "",
      location: body.location?.trim() || "Remote",
      employmentType: body.employmentType?.trim() || "Full-time",
      salaryRange: body.salaryRange?.trim() || "",
      description: body.description?.trim() || "",
      responsibilities: body.responsibilities?.trim() || "",
      requirements: body.requirements?.trim() || "",
      niceToHave: body.niceToHave?.trim() || "",
      benefits: body.benefits?.trim() || "",
      active: body.active ?? true,
    };
  }

  return {
    ...(body.title !== undefined ? { title: body.title.trim() } : {}),
    ...(body.department !== undefined
      ? { department: body.department.trim() }
      : {}),
    ...(body.location !== undefined ? { location: body.location.trim() } : {}),
    ...(body.employmentType !== undefined
      ? { employmentType: body.employmentType.trim() }
      : {}),
    ...(body.salaryRange !== undefined
      ? { salaryRange: body.salaryRange.trim() }
      : {}),
    ...(body.description !== undefined ? { description: body.description } : {}),
    ...(body.responsibilities !== undefined
      ? { responsibilities: body.responsibilities }
      : {}),
    ...(body.requirements !== undefined
      ? { requirements: body.requirements }
      : {}),
    ...(body.niceToHave !== undefined ? { niceToHave: body.niceToHave } : {}),
    ...(body.benefits !== undefined ? { benefits: body.benefits } : {}),
    ...(body.active !== undefined ? { active: body.active } : {}),
  };
}
