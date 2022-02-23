import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import authRouter from '../../middlewares/verfiyAuthToken';

import UserController from './user.controller';
import { getUserValidation } from './user.schemas';

const userRouter = express.Router();

userRouter.get('/users', authRouter, UserController.getUsers);
userRouter.get('/users/:id',authRouter, validateRequest(getUserValidation), UserController.getUser);
userRouter.post('/users',authRouter, UserController.signUp);
userRouter.post('/login', UserController.signIn);

export default userRouter;