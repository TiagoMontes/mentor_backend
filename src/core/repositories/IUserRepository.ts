import {User} from "../domain/user"
import {CreateUserInputDTO} from "../useCases/User/DTOs/createUserInputDTO"

export interface IUserRepository {
  createUser(user: CreateUserInputDTO): Promise<User>
  findById(id: string): Promise<User | null>
}