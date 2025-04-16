import { Router } from "express";
import CompetitionsService from "../competitions.service";
import validate from "../../../middlewares/validate.middleware";
import { getCompetitionsQuerySchema } from "../dto/GetCompetitionsQuery";
import { idParamSchema } from "../../../schemas/id.schema";

const router = Router();
const competitionsService = new CompetitionsService();

router.get(
    '/',
    validate(undefined, getCompetitionsQuerySchema),
    async (req, res) => {
        const competitions = await competitionsService.getMany(req.query);
        res.status(200).json(competitions);
    }
);

router.get(
    '/:id',
    validate(undefined, undefined, idParamSchema),
    async (req, res) => {
        const competition = await competitionsService.getOne(req.params.id);
        res.status(200).json(competition);
    }
);

export default router;