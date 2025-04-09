import { User } from '../entities/User';

export interface UserRepository {
  // findById(id: string): Promise<User | null>;
  create(username: string, password: string, email: string): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  // update(user: User): Promise<User>;
  // delete(id: string): Promise<boolean>;
}
