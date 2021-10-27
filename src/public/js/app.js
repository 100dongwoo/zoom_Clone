const socket=new WebSocket(`ws://${window.location.host}`)

// 연결 시작할떄
socket.addEventListener("open",()=>{console.log("connected to server");})

// 백엔드에서 프론트로 message 전송할떄
socket.addEventListener("message",(message)=>{
    console.log("New message : ",message?.data,"from the server")
})

// 연결 clsoe
socket.addEventListener("close",()=>{
    console.log("Disconnect from server ")
})

// setTimeout(()=>{
//     socket.send("hello from the browser!")
// },2000)

setTimeout(() => {
    socket.send("hello from the browser!");
}, 4000);
