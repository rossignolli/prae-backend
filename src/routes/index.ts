import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from '../routes/sessions.routes';
import usersRouter from './users.routes';
import equipamentsRouter from './equipaments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/equipaments', equipamentsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
