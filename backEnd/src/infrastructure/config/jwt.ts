import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secretKey';

export const generateToken = (id: string, username: string): string => {
  return jwt.sign({ id, username }, SECRET_KEY, { expiresIn: '2h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return null;
  }
};
