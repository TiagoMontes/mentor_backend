import {User} from "../../domain/user"
import {CreateUserInputDTO} from "./DTOs/createUserInputDTO"
import {CreateUserOutputDTO} from "./DTOs/createUserOutputDTO"
import {UserFactory} from "../../factory/UserFactory"
import {UserRepository} from "../../../infrastructure/repositories/UserRepository"
import {IUserRepository} from "../../repositories/IUserRepository"

interface CreateUserOutputJSON {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const createUserUseCase = (userRepository: IUserRepository) => async(data: CreateUserInputDTO): Promise<CreateUserOutputJSON> => {
  // I'll add Dependency Injection Container later to solve this above.

  const user: User = UserFactory.create(data)

  const createdUser = await userRepository.createUser(user)

  return createdUser.toJSON()
}
