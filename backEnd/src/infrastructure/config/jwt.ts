import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secretKey';

export type AuthenticatedUser = Pick<User, 'id' | 'username'>

export const generateToken = (id: string, username: string): string => {
  return jwt.sign({ id, username }, SECRET_KEY, { expiresIn: '2h' });
};

export const verifyToken = (token: string) => {
  try {
    const payload =  jwt.verify(token, SECRET_KEY as string) as AuthenticatedUser
    return payload
  } 
  catch (e) {
    console.log(e)
    return null;
  }
};
