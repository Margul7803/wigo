import bcrypt from 'bcrypt';

import { PrismaUserRepository } from '../../infrastructure/database/repositories/user.repository';
import { AuthenticationError } from '../../interfaces/graphql/errors/auth.error';
import { generateToken } from '../../infrastructure/config/jwt';

export class AuthService {
  private userRepository: PrismaUserRepository;

  constructor(userRepository: PrismaUserRepository) {
    this.userRepository = userRepository;
  }
  
  async registerUser(username: string, password: string, email: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return await this.userRepository.create(username, hashedPassword, email)
  };

  async authenticateUser(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
      
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
