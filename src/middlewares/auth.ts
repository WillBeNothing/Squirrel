import * as util from 'util';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface decodedJWT {
    id?: number
}

export default async function JWTValidation(req: Request, res: Response, next: NextFunction) {
  const JWT = req.headers.authorization;

  if (!JWT) {
    return res.status(401).json({ err: 'Unathorized, must be logged' });
  }
  const [, token] = JWT.split('');

  try {
    const authSecret = process.env.AUTH_SECRET;
    const decodedJWT: decodedJWT = await util.promisify(jwt.verify)(token, authSecret);
    req.cookies.user_id = decodedJWT.id;
    return next();
  } catch (err) {
    console.log(err);
  }
}
