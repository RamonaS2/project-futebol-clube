import { Router } from 'express';
import verifyLogin from '../middlewares/validLogin';
import LoginController from '../controller/loginController';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', verifyLogin, (req, res) => loginController.login(req, res));
loginRouter.get('/validate', (req, res) => loginController.validate(req, res));

export default loginRouter;
