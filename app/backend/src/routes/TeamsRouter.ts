import { Router } from 'express';
import TeamController from '../controller/teamController';

const teamsRouter = Router();

const teamController = new TeamController();

teamsRouter.get('/', (req, res) => teamController.getAll(req, res));
teamsRouter.get('/:id', (req, res) => teamController.getById(req, res));

export default teamsRouter;
