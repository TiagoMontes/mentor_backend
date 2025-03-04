import {UserRepository} from "../repository/UserRepository";
import {User} from "../domain/user";

test("Should receive id and return this same id User", async () => {
  const idSent = "123"

  const userRepository = new UserRepository()
  const user = await userRepository.findById(idSent)

  expect(user.id).toBe(idSent)
})

test("Should return a instance of User", async () => {
  const idSent = "123"

  const userRepository = new UserRepository()
  const user = await userRepository.findById(idSent)

  expect(user).toBeInstanceOf(User)
})
