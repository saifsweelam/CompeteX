import { Express } from 'express';
import { competitionsPublicRouter } from './routes';

export { default as CompetitionsService } from './competitions.service';

export const registerCompetitionsRoutes = (app: Express) => {
    app.use('/public/competitions', competitionsPublicRouter);
}