import { verifyToken } from '../../infrastructure/config/jwt';

export const context = async ({ req }: { req: any }) => {
  const token = req.headers.authorization || '';
  const user = token ? verifyToken(token.replace('Bearer ', '')) : null;
  return { user };
};

export type MyContext = Awaited<ReturnType<typeof context>>;