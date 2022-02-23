import express from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const authRouter = express.Router();

authRouter.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader?.split(' ')[1];
      jwt.verify(token as string, process.env.JWT_KEY as jwt.Secret);
    } catch (err) {
      res.status(401);
      res.json('Access denied, invalid token');
      return;
    }
    next();
  });
export default authRouter;
