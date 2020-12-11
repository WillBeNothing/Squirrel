/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
import {
  endOfDay, parseISO, startOfDay, startOfMonth, endOfMonth, format,
} from 'date-fns';
import { Request, Response } from 'express';
import { Between, Equal, getRepository } from 'typeorm';
// eslint-disable-next-line import/no-unresolved
import { ptBR } from 'date-fns/locale';
import SpendingEntity from '../models/Spending';

import id from '../../utils/userid';

class Spending {
  async store(req: Request, res: Response) {
    try {
      const {
        title, price, description,
      } = req.body;

      let formattedDescription;

      const user_id = id(req);

      const formattedDate = format(
        new Date(),
        "dd 'de' MMMM 'de' yyyy', às 'HH:mm'h'",
        { locale: ptBR },
      );

      if (!description) {
        formattedDescription = `Gasto criado em ${formattedDate}`;
      } else {
        // eslint-disable-next-line quotes
        formattedDescription = `${description} \n Gasto criado em ${formattedDate}`;
      }

      console.log(JSON.stringify(formattedDescription));

      const SpendingRepository = getRepository(SpendingEntity);

      const data = {
        title: title as string,
        price: price as number,
        // eslint-disable-next-line quotes
        description: formattedDescription,
        user: user_id,
        created_at: new Date(),
      };

      const newSpending = await SpendingRepository.create(data);
      await SpendingRepository.save(newSpending);

      return res.status(200).json(newSpending);
    } catch (err) {
      return console.log(err);
    }
  }

  async index(req: Request, res: Response) {
    try {
      const user_id = id(req);
      let { start, end }: any = req.query;

      start = parseISO(start);
      end = parseISO(end);

      const userRepository = getRepository(SpendingEntity);

      const findArgs = {
        where: {
          created_at: Between(startOfDay(start).toISOString(), endOfDay(end).toISOString()),
          user: Equal(user_id),
        },
      };

      const catchingByDate = await userRepository.find(findArgs);

      return res.json(catchingByDate);
    } catch (err) {
      return console.log(err);
    }
  }

  async byMonth(req: Request, res: Response) {
    try {
      const user_id = id(req);
      let { start, end }: any = req.query;

      start = parseISO(start);
      end = parseISO(end);

      const userRepository = getRepository(SpendingEntity);

      const findArgs = {
        where: {
          created_at: Between(startOfMonth(start).toISOString(), endOfMonth(end).toISOString()),
          user: Equal(user_id),
        },
      };

      const catchingByDate = await userRepository.find(findArgs);

      return res.json(catchingByDate);
    } catch (err) {
      return console.log(err);
    }
  }
}

export default new Spending();
