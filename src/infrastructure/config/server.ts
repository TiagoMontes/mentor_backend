import { createServer, IncomingMessage, ServerResponse } from "http"
import {CreateUserInputDTO} from "../../core/useCases/User/DTOs/createUserInputDTO"
import {createUserUseCase} from "../../core/useCases/User/createUserUseCase"
import {UserRepository} from "../repositories/UserRepository"


interface CreateUserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
}

const getRequestBody = async (req: IncomingMessage): Promise<CreateUserInterface> => {
  return new Promise((resolve, reject) => {
    let body = ""
    req.on("data", (chunk) => (body += chunk.toString()))
    req.on("end", () => {
      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })
    req.on("error", reject)
  })
}

const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "POST" && req.url === "/user/") {
    try {
      const { firstName, lastName, email, password } = await getRequestBody(req)
      const userDto = new CreateUserInputDTO(firstName, lastName, email, password)
      const newUser = createUserUseCase(userDto)

      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify(newUser))
    } catch (error) {
      console.error(error)
      res.writeHead(400, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ error: "Dados inválidos" }))
    }
  }

  if (req.method === "GET" && req.url?.startsWith("/user/") && req.url != null) {
    try {
      const id = req.url.split("/user/")[1]

      if(!id) {
        throw new Error("User ID is required.")
      }

      const userRepository = new UserRepository()
      const user = await userRepository.findById(id)

      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify(user.toJSON()))
    } catch (error) {
      console.error(error)
      res.writeHead(400, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ error: "Dados inválidos" }))
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Rota não encontrada" }))
}

const server = createServer(handleRequest)
const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
