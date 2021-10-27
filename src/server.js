import express from "express"
import http from "http"
import WebSocket, { WebSocketServer } from 'ws';
const app = express()

app.set('view engine', "pug")
app.set('views', __dirname + '/views');
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"))
app.get("/*", (req, res) => res.redirect("/"))

const handleListen = () => console.log("connect on http://localhost:3000")
// app.listen(3000,handleListen)

const server = http.createServer(app)
// 서버 생성
const wss = new WebSocket.Server({server})
// 이렇게 하면 http 서버와 웹 소켓 서버를 두개 작동 가능
// http 서버 위에 websocket 서버를 만듬


// function handleConnection(socket){
//     console.log(socket)
// }

const sockets=[]
// fake database

wss.on("connection",(socket)=>{
    sockets.push(socket)
    // console.log(socket)
    console.log("Connected to Browser")
    socket.on("close",()=>{console.log("Disconnect from Browser")})
    socket.send("hello!!!!!!!!!!")
    socket.on("message", message => {
        sockets.forEach(aSocket=>aSocket.send(message.toString('utf8')))
        // socket.send(message.toString('utf8'))
        // console.log(message.toString('utf8'));
    });
})

server.listen(3000,handleListen)
