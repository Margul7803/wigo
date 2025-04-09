import { PrismaUserRepository } from '../../infrastructure/database/repositories/user.repository';
import bcrypt from 'bcrypt';

export class UserService {
    private userRepository: PrismaUserRepository;   

    constructor(userRepository: PrismaUserRepository) {
      this.userRepository = userRepository;
    }
    
    findUserByUsername = async (username: string) => {
        return await this.userRepository.findByUsername(username);
    };

    createUser = async (username: string, password: string, email: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepository.create(username, hashedPassword, email);
    };
}
