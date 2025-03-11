import {User} from "../../core/domain/user"
import {IUserRepository} from "../../core/repositories/IUserRepository"
import {CreateUserInputDTO} from "../../core/useCases/User/DTOs/createUserInputDTO"
import {pool} from "../database/PostgreSQLClient"

export class UserRepository implements IUserRepository {
  async createUser(data: CreateUserInputDTO): Promise<User> {
    const query = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, first_name, last_name, email, password, created_at;
    `

    const values = [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    ]

    const result = await pool.query(query, values)
    const row = result.rows[0]

    return new User(
      row.first_name,
      row.last_name,
      row.email,
      row.password,
      row.created_at,
      row.id,
    )
  }

  async findById(id: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return new User(
      row.first_name,
      row.last_name,
      row.email,
      row.password,
      row.created_at,
      row.id
    );
  }
}