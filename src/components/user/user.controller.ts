import { Request, Response } from 'express';
import { ICreateUser } from './user.interfaces';
import User from './user.model';
import bcrypt from 'bcryptjs';
require('dotenv').config();

class UserController {
  async getUser(req: Request, res: Response) {
    const user = await User.findOneById(+req.params.id);
    if (!user) {
      res.status(404).send({ message: 'User Not Found!' });
    }
    res.send(user);
  }

  async getUsers(req: Request, res: Response) {
    const users = await User.findAll();
    res.send(users);
  }

  async signUp(req: Request, res: Response) {

    const { firstname, lastname, email, password } = req.body;
    const pepper = process.env.BCRYPT_PASSWORD;
    const saltRounds = process.env.SALT_ROUNDS;
    const hashPassword = bcrypt.hashSync(password + pepper, parseInt(saltRounds as string, 10));
    const existingUser = await User.findOneByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .send({ message: 'There\'s a user with this email already!' });
    }

    const dataObject: ICreateUser = { firstname, lastname, email, password:hashPassword };

    const user = await User.create(dataObject);
    res.status(201).send(user);
  }
}

export default new UserController();
