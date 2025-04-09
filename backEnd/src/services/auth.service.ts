import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { generateToken } from '../config/jwt';
import { UserService } from './user.service';
import { AuthenticationError } from '../errors/auth.error';

const prisma = new PrismaClient();

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  registerUser = async (username: string, password: string, email: string) => {
    return await this.userService.createUser(username, password, email)
  };

  authenticateUser = async (username: string, password: string) => {
    const user = await this.userService.findUserByUsername(username);
    
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Password invalid');
    }

    const token = generateToken(user.id, user.username)

    return token;
  };
}