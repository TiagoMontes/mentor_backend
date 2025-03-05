import {createUserUseCase} from "../useCases/User/createUserUseCase"
import {CreateUserInputDTO} from "../useCases/User/DTOs/createUserInputDTO"

test("Should receive user data and return it without the password", () => {
  const userDto = new CreateUserInputDTO("Tiago", "Montes", "tiago@email.com", "123456")
  const user = createUserUseCase(userDto)

  expect(user).toHaveProperty("id")
  expect(user.email).toBe("tiago@email.com")
  expect(user.firstName).toBe("Tiago")
  expect(user.lastName).toBe("Montes")
  expect(user).not.toHaveProperty("password")
})

test("Should throw error if password has less than 6 characters", () => {
  expect(() => {
    new CreateUserInputDTO("test", "test", "test@email.com", "123")
  }).toThrowError("Password needs minimum 6 characters longddddd")
})
