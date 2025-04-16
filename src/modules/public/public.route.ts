import { Router } from "express";
import competitionsRoute from "./competitions/competitions.route";
import teamsRoute from "./teams/teams.route";

const router = Router();

router.use(competitionsRoute.prefix, competitionsRoute.router);
router.use(teamsRoute.prefix, teamsRoute.router);

export default {
    router,
    prefix: '/public',
}