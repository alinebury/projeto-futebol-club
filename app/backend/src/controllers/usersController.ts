import { Request, Response } from 'express';
import { StatusCodes as HTTP } from 'http-status-codes';
import UsersService from '../services/usersService';

export default class UsersController {
  private usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  async login(req: Request, res: Response): Promise<void> {
    await UsersService.validateBodyLogin(req.body);
    const user = await this.usersService.validateEmail(req.body.email);
    await UsersService.validatePassword(user.password, req.body.password);
    const token = await UsersService.makeToken(user);

    res.status(HTTP.OK).json({ token });
  }

  async readToken(req: Request, res: Response): Promise<void> {
    const { data: { username } } = await UsersService.readToken(req);
    const { role } = await this.usersService.getUser(username);
    res.status(HTTP.OK).json({ role });
  }
}
