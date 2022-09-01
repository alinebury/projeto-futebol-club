import { Router } from 'express';
import UsersController from '../controllers/usersController';
import TeamsController from '../controllers/teamsController';
import MatchesController from '../controllers/matchesController';

const router = Router();

const usersController = new UsersController();
const teamsController = new TeamsController();
const matchesController = new MatchesController();

// login
router.post('/login', (req, res) => usersController.login(req, res));
router.get('/login/validate', (req, res) => usersController.readToken(req, res));

// team
router.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teamsController.getTeamById(req, res));

// matches
router.get('/matches', (req, res) => matchesController.getAllMatches(req, res));

export default router;
