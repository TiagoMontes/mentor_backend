import {User} from "../domain/user";

export class UserRepository {

  async findById(id: string): Promise<User> {
    return new User("Tiago", "Montes", "tiago@gmail.com", "123456", new Date(), id)
  }
}