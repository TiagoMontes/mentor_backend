import {createUserUseCase} from "../useCases/User/createUserUseCase";
import {CreateUserDTO} from "../useCases/User/DTOs/createUserInputDTO";

test("Should create a user with id and email", () => {
  const userDto = new CreateUserDTO("tiago@email.com", "123456")
  const user = createUserUseCase(userDto)

  expect(user).toHaveProperty("id")
  expect(user.email).toBe("tiago@email.com")
})
