import { Request, Response } from 'express';
import { ICreateUser } from './user.interfaces';
import User from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Logger from '../../middlewares/logger';
require('dotenv').config();

class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const user = await User.findOneById(+req.params.id);
      if (!user) {
        res.status(404).send({ message: 'User Not Found!' });
      }
      res.send(user);
    } catch (error) {
      Logger.log('User Controller Error', error);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (error) {
      Logger.log('User Controller Error', error);
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const { firstname, lastname, email, password } = req.body;
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltRounds = process.env.SALT_ROUNDS as string;
      const hashPassword = bcrypt.hashSync(
        password + pepper,
        parseInt(saltRounds));
      const existingUser = await User.findOneByEmail(email);

      if (existingUser) {
        return res
          .status(400)
          .send({ message: 'Theres a user with this email already!' });
      }
      const dataObject: ICreateUser = {
        firstname,
        lastname,
        email,
        password: hashPassword,
      };
      const user = await User.create(dataObject);
      res.status(201).send(user);
    } catch (error) {
      Logger.log('User Controller Error', error);
    }
  }
  async signIn(req: Request, res: Response) {
    try {
      const {email,  password} = req.body;
      const user = await User.findOneByEmail((email as unknown) as string);
      if(user == null){
        res.status(401).send({ message: 'Error No User Found with given Email !'});
        return;
      }
      if(!bcrypt.compare((password as unknown) as string, user.password)){
        res.status(401).send({ message: 'Error Wrong Password for given User !'});
        return;
      }
      const token = jwt.sign({user: user}, process.env.JWT_KEY as jwt.Secret);
      res.header({Authorization: 'Bearer ' + token}).send({status:'ok',token:token});
    } catch (error) {
      Logger.log('User Controller Error', error);
    }

  }
}

export default new UserController();
