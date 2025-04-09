import { verifyToken } from './config/jwt';

export const context = async ({ req }: { req: any }) => {
  const token = req.headers.authorization || '';
  const user = token ? await verifyToken(token.replace('Bearer ', '')) : null;
  return { user };
};

export type MyContext = Awaited<ReturnType<typeof context>>;