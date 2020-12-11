import { Router } from 'express';

import SessionController from './app/controllers/session_controller';
import User from './app/controllers/user_controller';
import SpendingController from './app/controllers/spening_controllers';
import auth from './middlewares/auth';

const routes = Router();

routes.post('/register', User.create);
routes.post('/login', SessionController.login);
routes.get('/spends', auth, SpendingController.index);
routes.post('/spends', auth, SpendingController.store);
routes.get('/user', auth, User.show);
routes.get('/spends/month', auth, SpendingController.byMonth);

export default routes;
