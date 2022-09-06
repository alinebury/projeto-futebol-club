import { Request } from 'express';
import * as Joi from 'joi';
import * as Bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';
import UnauthorizedError from '../middlewares/UnauthoriedError';
import { Login } from '../interfaces/interfaces';

export default class UsersService {
  public model;
  constructor() {
    this.model = User;
  }

  public static async validateBodyLogin(data: object): Promise<void> {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }).messages({
      'any.required': 'All fields must be filled',
      'string.empty': 'All fields must be filled',
    });
    await schema.validateAsync(data);
  }

  async validateEmail(email: string): Promise<User> {
    const user = await this.model.findOne({
      where: { email },
    });
    if (!user) throw new UnauthorizedError('Incorrect email or password');
    return user;
  }

  public static async validatePassword(password: string, userPassword: string): Promise<void> {
    const result = Bcrypt.compare(password, userPassword);
    if (!result) throw new UnauthorizedError('Incorrect email or password');
  }

  public static async makeToken(user: User): Promise<string> {
    const secret = process.env.JWT_SECRET || 'secret';
    const { id, username } = user;
    const payload = { data: { id, username } };
    const token = jwt.sign(payload, secret);

    return token;
  }

  public static async readToken(req: Request): Promise<Login> {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'secret';
    if (!token) throw new UnauthorizedError('Token not found');
    try {
      const decoded = jwt.verify(token, secret);
      return decoded as Login;
    } catch (error) {
      throw new UnauthorizedError('Token must be a valid token');
    }
  }

  async getUser(username: string): Promise<User> {
    const user = await this.model.findOne({
      where: { username },
    });
    return user as User;
  }
}
