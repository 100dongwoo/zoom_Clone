const messageList = document.querySelector("ul")
const messageForm = document.querySelector("form")
const socket = new WebSocket(`ws://${window.location.host}`)

// 연결 시작할떄
socket.addEventListener("open", () => {
    console.log("connected to server");
})

// 백엔드에서 프론트로 message 전송할떄
socket.addEventListener("message", (message) => {
    console.log("New message : ", message?.data)
})

// 연결 clsoe
socket.addEventListener("close", () => {
    console.log("Disconnect from server ")
})
function handleSubmit(event){
    event.preventDefault()
    const input=messageForm.querySelector("input")
    // console.log(input.value)
    socket.send(input.value)
}
messageForm.addEventListener("submit",handleSubmit)

// setTimeout(() => {
//     socket.send("hello from the browser!");
// }, 4000);
