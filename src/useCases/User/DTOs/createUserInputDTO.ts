export class CreateUserInputDTO {
  private readonly _firstName: string
  private readonly _lastName: string
  private readonly _email: string
  private readonly _password: string

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this._firstName = firstName
    this._lastName = lastName

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("Invalid email address")
    }
    this._email = email

    if (!password || password.length < 6) {
      throw new Error("Password needs minimum 6 characters long")
    }
    this._password = password
  }

  public get firstName(): string {
    return this._firstName
  }

  public get lastName(): string {
    return this._lastName
  }

  public get email(): string {
    return this._email
  }

  public get password(): string {
    return this._password
  }
}