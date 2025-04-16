import { Express } from "express";
import competitorRoute from "./modules/competitor/competitor.route";
import publicRoute from "./modules/public/public.route";

export default function routes(app: Express) {
    // Public/Anonymous Router
    app.use(publicRoute.prefix, publicRoute.router);

    // Competitor Main Router
    app.use(competitorRoute.prefix, competitorRoute.router);
};