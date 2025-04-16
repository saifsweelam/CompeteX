import { Router } from "express";
import validate from "../../../middlewares/validate.middleware";
import { createTeamBodySchema } from "./dto/CreateTeamBody";
import TeamsService from "./teams.service";

const router = Router();
const teamsService = new TeamsService();

router.post(
    '/',
    validate(createTeamBodySchema),
    async (req, res, next) => {
        const team = await teamsService.createOne(req.body);
        res.status(201).json(team);
    }
)

export default {
    router,
    prefix: "/teams",
}