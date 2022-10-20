import { Router } from 'express';
import MatchesController from '../controller/matchesController';
import verifyToken from '../middlewares/validToken';
import verifyMatche from '../middlewares/validMatches';

const matcheRouter = Router();

const matchesController = new MatchesController();

matcheRouter.get('/', (req, res) => matchesController.getAll(req, res));

matcheRouter.post('/', verifyToken, verifyMatche, (req, res) => matchesController.create(req, res));

matcheRouter.patch('/:id', verifyToken, (req, res) => matchesController.updateMatche(req, res));

matcheRouter.patch('/:id/finish', verifyToken, (req, res) => matchesController
  .updateStatus(req, res));

export default matcheRouter;
