import { Express } from "express";
import { teamsPublicRouter } from "./routes";

export const registerTeamsRoutes = (app: Express) => {
    app.use("/public/teams", teamsPublicRouter);
}

export { default as TeamsService } from "./teams.service";