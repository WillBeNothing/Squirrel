import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import id from '../../utils/userid';

import UserEntity from '../models/User';

class User {
  async create(req: Request, res: Response) {
    try {
      const {
        name, email, password, goal,
      } = req.body;

      const userRepository = getRepository(UserEntity);

      const email_verify = await userRepository.findOne({ email });

      if (email_verify) {
        return res.status(403).send('error: This email already exist');
      }
      const password_hash = await bcrypt.hash(password, 8);

      const data = {
        name,
        email,
        password_hash,
        goal,
        created_at: new Date(),
      };

      const user = userRepository.create(data);
      await userRepository.save(user);

      return res.status(201).json({ data });
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  async show(req: Request, res: Response) {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({
      where: { id: id(req) },
      relations: ['spendings'],
    });

    return res.json({ user }).status(200);
  }
}

export default new User();
