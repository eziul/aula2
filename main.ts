import * as restify from 'restify'

const server = restify.createServer()


server.get("/hello", (req, resp, next) => {
    resp.send(200, "Hello World")
})

server.listen(3000, ()=> {
    console.log("Server is on-line")
})