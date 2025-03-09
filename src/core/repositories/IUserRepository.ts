import {User} from "../domain/user"

export interface IUserRepository {
  findById(id: string): Promise<User>
}