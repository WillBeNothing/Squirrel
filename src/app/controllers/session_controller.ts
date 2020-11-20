import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import 'dotenv/config';

import User from '../models/User';

class Session {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const UserRepository = getRepository(User);

    const findUser = await UserRepository.findOne({ where: { email } });

    if (!findUser) {
      return res.status(404).json({ msg: 'This user does not exists.' });
    }
    const { password_hash, id } = findUser;

    const validate = bcrypt.compareSync(password, password_hash);

    if (!validate) {
      return res.status(401).json({ msg: 'The password recived is wrong' });
    }

    const authSecret = process.env.AUTH_SECRET;
    const expiresIn = process.env.EXPIRES_IN;
    return res.status(200).json({
      token: jwt.sign({ id }, authSecret, {
        expiresIn,
      }),
    });
  }
}

export default new Session();
