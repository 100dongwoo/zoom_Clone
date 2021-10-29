import express from "express"
import http from "http"
import SocketIO from "socket.io"
import WebSocket, {WebSocketServer} from 'ws';

const app = express()

app.set('view engine', "pug")
app.set('views', __dirname + '/views');
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"))
app.get("/*", (req, res) => res.redirect("/"))

// app.listen(3000,handleListen)

const httpServer = http.createServer(app)
const wsServer = SocketIO(httpServer)


// function handleConnection(socket){
//     console.log(socket)
// }

////////////////////////////////////////////////////////////////////////////////
// WebSocket 사용한 채팅
// 서버 생성
// const wss = new WebSocket.Server({httpServer})
// 이렇게 하면 http 서버와 웹 소켓 서버를 두개 작동 가능
// http 서버 위에 websocket 서버를 만듬
// const sockets = []
// // fake database
// wss.on("connection", (socket) => {
//     sockets.push(socket)
//     // console.log(socket)
//     socket["nickname"] = "Anon"
//     console.log("Connected to Browser")
//     socket.on("close", () => {
//         console.log("Disconnect from Browser")
//     })
//     // socket.send("hello!!!!!!!!!!")
//     socket.on("message", msg => {
//         const message = JSON.parse(msg);
//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach(aSocket => aSocket.send(`${socket.nickname}:${message.payload}`))
//             case "nickname":
//                 socket["nickname"] = message.payload
//         }
//
//         // socket.send(message.toString('utf8'))
//         // console.log(message.toString('utf8'));
//     });
// })

////////////////////////////////////////////////////////////////////////////////
// SocketIo Code
wsServer.on("connection", socket => {
    socket.on("enter_room", (roomName, done) => {
        // console.log(roomName)
        socket.join(roomName)
        done()
        socket.to(roomName).emit("welcome")
    })
})


const handleListen = () => console.log("connect on http://localhost:3000")
httpServer.listen(3000, handleListen)
