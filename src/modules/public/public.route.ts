import { Router } from "express";
import competitionsRoute from "./competitions/competitions.route";

const router = Router();

router.use(competitionsRoute.prefix, competitionsRoute.router);

export default {
    router,
    prefix: '/public',
}