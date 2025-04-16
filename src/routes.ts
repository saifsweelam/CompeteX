import { Express } from "express";
import { registerCompetitionsRoutes } from "./modules/competitions";
import { registerTeamsRoutes } from "./modules/teams";

export default function routes(app: Express) {
    registerCompetitionsRoutes(app);
    registerTeamsRoutes(app);
};