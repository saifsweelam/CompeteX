import { z } from "zod";

export const getCompetitionsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.string().optional(),
    sortBy: z.enum(["name", "startDate", "endDate"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
})
export type GetCompetitionsQuery = z.output<typeof getCompetitionsQuerySchema>;
