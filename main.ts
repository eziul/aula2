import * as restify from 'restify'
import { UsuarioRepository } from './usuarios/usuarios'

const server = restify.createServer()

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get("/usuario", (req, resp, next) => {
    resp.send(200, "Laboratorio aplicação de API em Node.js")
})

var usuarioRep = new UsuarioRepository()


server.post("/usuario", usuarioRep.criarUsuario)
server.get("/usuarios", usuarioRep.todosUsuarios)

server.del("/usuario/:id", usuarioRep.deletarUsuario)

server.listen(3000, ()=> {
    console.log("Server is on-line")
})