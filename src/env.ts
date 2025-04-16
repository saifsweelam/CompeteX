import { z } from "zod";

export default z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
    MIN_TEAM_MEMBERS: z.coerce.number().default(4),
    MAX_TEAM_MEMBERS: z.coerce.number().default(10),
}).parse(process.env);