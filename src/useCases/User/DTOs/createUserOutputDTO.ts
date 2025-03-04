export class CreateUserOutputDTO {
  private readonly _id: string;
  private readonly _email: string;

  constructor(id: string, email: string) {
    this._id = id;
    this._email = email;
  }

  public get id(): string {
    return this._id
  }

  public get email(): string {
    return this._email;
  }
}