import { createServer, IncomingMessage, ServerResponse } from "http"
import { createUserUseCase } from "../useCases/User/createUserUseCase"
import {CreateUserDTO} from "../useCases/User/DTOs/createUserInputDTO";

const getRequestBody = async (req: IncomingMessage): Promise<any> => {
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
      const { email, password } = await getRequestBody(req)
      const userDto = new CreateUserDTO(email, password)
      const newUser = createUserUseCase(userDto)

      res.writeHead(201, { "Content-Type": "application/json" })
      return res.end(JSON.stringify(newUser))
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ error: "Dados inválidos" }))
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Rota não encontrada" }))
}

const server = createServer(handleRequest)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
