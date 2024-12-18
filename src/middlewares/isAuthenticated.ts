import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Receber o login
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).end();
  }

  // separar token do prefixo
  const [, token] = authToken.split(" ");

  // verificar o token
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    req.user_id = sub;
    next();
  } catch (error) {
    res.status(401).end();
  }
}
