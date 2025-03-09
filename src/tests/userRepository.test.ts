import { UserRepository } from "../infrastructure/repositories/UserRepository"
import { User } from "../core/domain/user"

describe("UserRepository", () => {
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UserRepository()
  })

  it("should receive an ID and return a User with the same ID", async () => {
    const idSent = "123"
    const user = await userRepository.findById(idSent)

    expect(user.id).toBe(idSent)
    expect(user).toBeInstanceOf(User)
    expect(user.firstName).toBe("Tiago")
    expect(user.lastName).toBe("Montes")
    expect(user.email).toBe("tiago@gmail.com")
    expect(user.password).toBe("123456")
    expect(user.createdAt).toBeInstanceOf(Date)
  })

  it("should return an instance of User", async () => {
    const idSent = "123"
    const user = await userRepository.findById(idSent)

    expect(user).toBeInstanceOf(User)
  })
})
