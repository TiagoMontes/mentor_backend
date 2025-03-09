import {User} from "../../core/domain/user"
import {IUserRepository} from "../../core/repositories/IUserRepository"

export class UserRepository implements IUserRepository {
  // Depending on which DB we use, this page will need to be modified

  async findById(id: string): Promise<User> {
    return new User("Tiago", "Montes", "tiago@gmail.com", "123456", new Date(), id)
  }
}