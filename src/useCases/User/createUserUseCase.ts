import {User} from "../../domain/user";

interface UserInputDto {
  email: string
  password: string
}

export const createUserUseCase = ({ email, password }: UserInputDto): User => {
  return {
    id: Math.random().toString(36).substring(7),
    email,
    password
  }
}
