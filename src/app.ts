import express from 'express';
import routes from './routes';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());

routes(app);

app.use(errorHandler);

export default app;