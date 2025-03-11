import {User} from "../domain/user"
import {CreateUserInputDTO} from "../useCases/User/DTOs/createUserInputDTO"

export class UserFactory {
  static create(data: CreateUserInputDTO): CreateUserInputDTO {
    return new CreateUserInputDTO(
      data.firstName,
      data.lastName,
      data.email,
      data.password)
  }
}