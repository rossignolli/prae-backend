import { Router } from 'express';
import preventivesRouter from './preventives.routes';
import sessionsRouter from '../routes/sessions.routes';
import usersRouter from './users.routes';
import equipamentsRouter from './equipaments.routes';

const routes = Router();

routes.use('/preventives', preventivesRouter);
routes.use('/users', usersRouter);
routes.use('/equipaments', equipamentsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
