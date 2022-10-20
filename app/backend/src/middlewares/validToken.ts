import { decode } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ITokenId } from '../interfaces';
import User from '../database/models/usersModel';

const message = 'Token must be a valid token' as string;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message });
  }

  try {
    const { id } = decode(authorization) as ITokenId;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ message });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message });
  }
};

export default verifyToken;
