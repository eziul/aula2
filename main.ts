import * as restify from 'restify'
import { UsuarioRepository } from './usuarios/usuarios'

const server = restify.createServer()

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get("/hello", (req, resp, next) => {
    resp.send(200, "Hello World")
})



var usuarioRep = new UsuarioRepository()


server.post("/usuario", usuarioRep.criarUsuario)
server.get("/usuarios", usuarioRep.todosUsuarios)

server.listen(3000, ()=> {
    console.log("Server is on-line")
})