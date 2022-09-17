import { Router } from 'express';
import UsersController from '../controllers/usersController';
import TeamsController from '../controllers/teamsController';
import MatchesController from '../controllers/matchesController';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const usersController = new UsersController();
const teamsController = new TeamsController();
const matchesController = new MatchesController();
const leaderboardController = new LeaderboardController();

// login
router.post('/login', (req, res) => usersController.login(req, res));
router.get('/login/validate', (req, res) => usersController.readToken(req, res));

// team
router.get('/teams', (req, res) => teamsController.getAllTeams(req, res));
router.get('/teams/:id', (req, res) => teamsController.getTeamById(req, res));

// matches
// router.get('/matches/', (req, res) => matchesController.getByStatus(req, res));
router.get('/matches', (req, res) => matchesController.getAllMatches(req, res));
router.post('/matches', (req, res) => matchesController.addMatch(req, res));
router.patch('/matches/:id/finish', (req, res) => matchesController.editProgress(req, res));
router.patch('/matches/:id', (req, res) => matchesController.editMatch(req, res));

// leaderboard
router.get('/leaderboard/home', (req, res) => leaderboardController.getHome(req, res));
router.get('/leaderboard/away', (req, res) => leaderboardController.getAway(req, res));
router.get('/leaderboard', (req, res) => leaderboardController.getAll(req, res));

export default router;
