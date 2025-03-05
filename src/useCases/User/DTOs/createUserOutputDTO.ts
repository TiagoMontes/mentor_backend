import {User} from "../../../domain/user"

export class CreateUserOutputDTO {
  private readonly _id?: string
  private readonly _firstName: string
  private readonly _lastName: string
  private readonly _email: string

  constructor(data: User) {
    this._id = data.id
    this._firstName = data.firstName
    this._lastName = data.lastName
    this._email = data.email
  }

  public get id(): string | undefined {
    return this._id
  }

  public get firstName(): string {
    return this._firstName
  };

  public get lastName(): string {
    return this._lastName
  }

  public get email(): string {
    return this._email
  }

  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    }
  }
}