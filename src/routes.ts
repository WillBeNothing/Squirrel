import { Router } from 'express';

import SessionController from './app/controllers/session_controller';
import User from './app/controllers/user_controller';

const routes = Router();

routes.post('/register', User.create);
routes.post('/login', SessionController.login);
routes.get('/register', User.get);

export default routes;
