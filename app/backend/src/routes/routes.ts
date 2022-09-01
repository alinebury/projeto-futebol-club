import { Router } from 'express';
import UsersController from '../controllers/usersController';
import TeamsController from '../controllers/teamsController';

const router = Router();

const usersController = new UsersController();
const teamsController = new TeamsController();

// login
router.post('/login', (req, res) => usersController.login(req, res));
router.get('/login/validate', (req, res) => usersController.readToken(req, res));

// team
router.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teamsController.getTeamById(req, res));

export default router;
