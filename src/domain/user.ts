export class User {
  private readonly _id?: string | undefined
  private readonly _firstName: string
  private readonly _lastName: string
  private readonly _email: string
  private readonly _password: string
  private readonly _createdAt: Date

  constructor(firstName: string, lastName: string, email: string, password: string, createdAt?: Date, id?: string) {
    this._id = id || undefined
    this._firstName = firstName
    this._lastName = lastName
    this._email = email
    this._password = password
    this._createdAt = createdAt ?? new Date()
  }

  get id(): string | undefined {
    return this._id
  }

  get firstName(): string {
    return this._firstName
  }

  get lastName(): string {
    return this._lastName
  }

  get email(): string {
    return this._email
  }

  get password(): string {
    return this._password
  }

  get createdAt(): Date {
    return this._createdAt
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