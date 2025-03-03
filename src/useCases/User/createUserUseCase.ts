import {User} from "../../domain/user";
import {CreateUserDTO} from "./DTOs/createUserInputDTO";
import {CreateUserOutputDTO} from "./DTOs/createUserOutputDTO";

export const createUserUseCase = (data: CreateUserDTO): CreateUserOutputDTO => {
  // This will be saved in DB
  const user: User = {
    id: Math.random().toString(36).substring(7),
    email: data.email,
    password: data.password,
  }

  return new CreateUserOutputDTO(user.id, user.email)
}
