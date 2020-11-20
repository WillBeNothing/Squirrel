import { Request, Response } from 'express';
import { getRepository, Between } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

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

  async get(req: Request, res: Response) {
    let { start, end }: any = req.query;

    start = parseISO(start);
    end = parseISO(end);

    const userRepository = getRepository(UserEntity);

    const findArgs = {
      where: {
        created_at: Between(startOfDay(start).toISOString(), endOfDay(end).toISOString()),
      },
    };

    const catchingByDate = await userRepository.find(findArgs);

    return res.json(catchingByDate);
  }
}

export default new User();
