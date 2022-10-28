import * as sqlite from 'sqlite3'
import * as restify from 'restify'


export class Usuario {
    id: number
    nome: string
    login: string
    senha: string
}

export class UsuarioRepository {

    db: sqlite.Database


    constructor () {
        this.db = new sqlite.Database('./apidb.db')
        this.db.run("CREATE TABLE if NOT EXISTS usuario ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, login TEXT, senha TEXT)")
    }

    criarUsuario = (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        this.db.run('INSERT INTO usuario (nome, login, senha) VALUES (?, ?, ?);', req.body.nome, req.body.login, req.body.senha, (error) => {
            if (error) {
                resp.send(500)
            } else {
                resp.send(200, "O usuario" + req.body.none + "foi adicionado com sucesso")
            }
        })
    }

    alterarUsuario = (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        this.db.run('UPDATE usuario SET nome = ?, login = ?, senha = ? WHERE id = ?',
         req.body.nome, 
         req.body.login, 
         req.body.senha, 
         req.params.id,

         (error) => {
            if (error) {
                resp.send(500)
            } else {
                resp.send(200, + req.body.none + "Usuário foi alterado com sucesso!")
            }
        })
    }



    deletarUsuario = (req, resp) => {
        this.db.run("DELETE FROM usuario WHERE id =?", req.params.id, (error) => {
            if (error) {
                resp.send(500, error.message)
            }else {
                resp.send(200, "O usuario foi excluido!!!")
            }
        })
    }    
    
    todosUsuarios = (req: restify.Request, resp: restify.Response, next: restify.Next) => {
        var usuarios: Usuario[] = []
        this.db.all("select * from usuario", (error, rows) => {
           

            if (error) {
                resp.send(500)
            } else {
                rows.forEach(item => {
                    var u = new Usuario()
                    u.id = item.id
                    u.login = item.login
                    u.senha = item.senha
                    usuarios.push(u)
                })                    
                resp.send(usuarios)
                
            }

        })


    }
}