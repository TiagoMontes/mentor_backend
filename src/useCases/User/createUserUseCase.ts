import {User} from "../../domain/user";
import {CreateUserInputDTO} from "./DTOs/createUserInputDTO";
import {CreateUserOutputDTO} from "./DTOs/createUserOutputDTO";
import {UserFactory} from "../../factory/UserFactory";

interface CreateUserOutputJSON {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const createUserUseCase = (data: CreateUserInputDTO): CreateUserOutputJSON => {
  // This will be saved in DB
  const user: User = UserFactory.create(data)

  const outputDTO = new CreateUserOutputDTO(user)

  return outputDTO.toJSON();
}
