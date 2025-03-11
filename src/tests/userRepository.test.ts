import { UserRepository } from "../infrastructure/repositories/UserRepository"
import { CreateUserInputDTO } from "../core/useCases/User/DTOs/createUserInputDTO"
import { User } from "../core/domain/user"
import { pool } from "../infrastructure/database/PostgreSQLClient"

jest.mock("../infrastructure/database/PostgreSQLClient", () => ({
  pool: {
    query: jest.fn(),
  },
}))

describe("UserRepository", () => {
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UserRepository()
    jest.clearAllMocks()
  })

  it("should create a user and return a User object", async () => {
    const mockUser = {
      id: "123456",
      first_name: "Tiago",
      last_name: "Montes",
      email: "tiago@gmail.com",
      password: "hashed_password",
      created_at: new Date(),
    };

    (pool.query as jest.Mock).mockResolvedValue({ rows: [mockUser] })

    const userDto = new CreateUserInputDTO("Tiago", "Montes", "tiago@gmail.com", "123456")

    const result = await userRepository.createUser(userDto)

    expect(result).toBeInstanceOf(User)
    expect(result.id).toBe("123456")
    expect(result.firstName).toBe("Tiago")
    expect(result.lastName).toBe("Montes")
    expect(result.email).toBe("tiago@gmail.com")
    expect(result.password).toBe("hashed_password")
    expect(result.createdAt).toEqual(mockUser.created_at)

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO users"),
      [userDto.firstName, userDto.lastName, userDto.email, userDto.password]
    )
  })

  it("should retrieve a user by ID", async () => {
    const mockUser = {
      id: "123456",
      first_name: "Tiago",
      last_name: "Montes",
      email: "tiago@gmail.com",
      password: "hashed_password",
      created_at: new Date(),
    };

    (pool.query as jest.Mock).mockResolvedValue({ rows: [mockUser] })

    const result = await userRepository.findById("123456")

    expect(result).toBeInstanceOf(User)
    expect(result?.id).toBe("123456")
    expect(result?.firstName).toBe("Tiago")
    expect(result?.lastName).toBe("Montes")
    expect(result?.email).toBe("tiago@gmail.com")

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM users WHERE id ="),
      ["123456"]
    )
  })

  it("should return null if the user is not found", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] })

    const result = await userRepository.findById("non-existent")

    expect(result).toBeNull()
  })

  it("should throw an error if the database fails", async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error("Connection error"))

    await expect(
      userRepository.createUser(new CreateUserInputDTO("Tiago", "Montes", "tiago@gmail.com", "123456"))
    ).rejects.toThrow("Connection error")
  })
})