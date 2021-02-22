import { Router } from 'express';
import preventivesRouter from './preventives.routes';
import sessionsRouter from '../routes/sessions.routes';
import usersRouter from './users.routes';
import equipamentsRouter from './equipaments.routes';
import suppliesRouter from './supplies.routes';
import jobsRouter from './jobs.routes';
import categories from './category.routes';
import brands from './brand.routes';

const routes = Router();

routes.use('/preventives', preventivesRouter);
routes.use('/users', usersRouter);
routes.use('/equipaments', equipamentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/supplies', suppliesRouter);
routes.use('/jobs', jobsRouter);
routes.use('/categories', categories);
routes.use('/brands', brands);

export default routes;
