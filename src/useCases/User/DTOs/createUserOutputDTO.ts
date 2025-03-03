export class CreateUserOutputDTO {
  private readonly _id: string;
  private readonly _email: string;

  constructor(id: string, email: string) {
    this._id = id;
    this._email = email;
  }

  get id(): string {
    return this._id
  }

  get email(): string {
    return this._email;
  }
}