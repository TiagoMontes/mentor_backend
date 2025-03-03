import { createUser } from "../useCases/User/createUserUseCase"

interface UserProps {
  email: string
  password: string
}

test("Should create a user with email and password", () => {
  const user = createUser({email: "tiago@email.com", password: "123456"})

  expect(user).toHaveProperty("id")
  expect(user.email).toBe("tiago@email.com")
  expect(user.password).toBe("123456")
})
