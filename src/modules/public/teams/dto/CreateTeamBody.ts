import { z } from "zod";
import env from "../../../../env";

export const createTeamBodySchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().optional(),
    competitionId: z.number().int().positive({ message: "Competition ID must be a positive integer" }),
    members: z.array(z.object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
    }))
        .min(env.MIN_TEAM_MEMBERS, { message: `At least ${env.MIN_TEAM_MEMBERS} members are required` })
        .max(env.MAX_TEAM_MEMBERS, { message: `At most ${env.MAX_TEAM_MEMBERS} members are allowed` }),
});
export type CreateTeamBody = z.output<typeof createTeamBodySchema>;