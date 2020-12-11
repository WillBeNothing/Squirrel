/* eslint-disable func-names */
import { Request } from 'express';

export default function (req: Request) {
  const Rawid = req.headers.cookie.toString().split(';')[0].split('=')[1];
  const id = Number(Rawid);

  return id;
}
