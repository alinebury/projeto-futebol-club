import { Router } from 'express';
import UsersController from '../controllers/usersController';

const router = Router();

const usersController = new UsersController();

// login
router.post('/login', (req, res) => usersController.login(req, res));
router.get('/login/validate', (req, res) => usersController.readToken(req, res));

export default router;
