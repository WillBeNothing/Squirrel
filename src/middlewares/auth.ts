import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface Decoded {
  id: string
}

export default async function JWTValidation(req: Request, res: Response, next: NextFunction) {
  const JWT = req.headers.authorization;
  if (!JWT) {
    return res.status(401).json({ err: 'Unathorized, must be logged' });
  }

  const token = JWT.split(' ')[1];

  try {
    const authSecret = process.env.AUTH_SECRET;
    await jwt.verify(token, authSecret, (err, decoded: Decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'unssusefuly', err });
      }
      res.cookie('userID', decoded.id);
      return next();
    });
  } catch (err) {
    console.log(err);
  }
}
