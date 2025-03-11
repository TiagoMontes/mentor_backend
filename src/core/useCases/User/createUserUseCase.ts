import {CreateUserInputDTO} from "./DTOs/createUserInputDTO"
import {UserFactory} from "../../factory/UserFactory"
import {IUserRepository} from "../../repositories/IUserRepository"

interface CreateUserOutputJSON {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const createUserUseCase = (userRepository: IUserRepository) => async(data: CreateUserInputDTO): Promise<CreateUserOutputJSON> => {
  // I'll add Dependency Injection Container later to solve this above.

  const user: CreateUserInputDTO = UserFactory.create(data)

  const createdUser = await userRepository.createUser(user)

  return createdUser.toJSON()
}
