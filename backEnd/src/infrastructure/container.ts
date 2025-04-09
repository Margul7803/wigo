import { AuthService } from '../domain/services/auth.service';
import { UserService } from '../domain/services/user.service';
import { PrismaUserRepository } from './database/repositories/user.repository';

export const createAuthService = () => {
  const userRepository = new PrismaUserRepository();
  return new AuthService(userRepository);
};

export const createUserService = () => {
    const userRepository = new PrismaUserRepository();
    return new UserService(userRepository);
  };