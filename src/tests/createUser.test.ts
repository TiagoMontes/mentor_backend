import { createUserUseCase } from "../core/useCases/User/createUserUseCase"
import { CreateUserInputDTO } from "../core/useCases/User/DTOs/createUserInputDTO"
import { IUserRepository } from "../core/repositories/IUserRepository"
import {User} from "../core/domain/user"

// Mock do UserRepository
const userRepositoryMock: IUserRepository = {
  createUser: jest.fn(),
  findById: jest.fn(),
}

describe("CreateUserUseCase", () => {
  it("should create a user and return it without password", async () => {
    // Mockando um usuário
    const userMock = new User("Tiago", "Montes", "tiago@email.com", "hashed_password")

    // Configurando o mock do repositório
    userRepositoryMock.createUser = jest.fn().mockResolvedValue({
      id: "123",
      firstName: userMock.firstName,
      lastName: userMock.lastName,
      email: userMock.email,
      toJSON: () => ({
        id: "123",
        firstName: userMock.firstName,
        lastName: userMock.lastName,
        email: userMock.email,
      }),
    })

    const createUser = createUserUseCase(userRepositoryMock)

    const userDto = new CreateUserInputDTO("Tiago", "Montes", "tiago@email.com", "123456")

    const result = await createUser(userDto)

    expect(result).toHaveProperty("id")
    expect(result.email).toBe("tiago@email.com")
    expect(result.firstName).toBe("Tiago")
    expect(result.lastName).toBe("Montes")
    expect(result).not.toHaveProperty("password")

    expect(userRepositoryMock.createUser).toHaveBeenCalledWith(expect.objectContaining({
      firstName: "Tiago",
      lastName: "Montes",
      email: "tiago@email.com",
    }))
  })

  it("should throw an error if repository fails", async () => {
    userRepositoryMock.createUser = jest.fn().mockRejectedValue(new Error("Database error"))

    const createUser = createUserUseCase(userRepositoryMock)

    const userDto = new CreateUserInputDTO("Tiago", "Montes", "tiago@email.com", "123456")

    await expect(createUser(userDto)).rejects.toThrow("Database error")
  })
})
