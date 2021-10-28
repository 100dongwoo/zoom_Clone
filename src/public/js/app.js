const messageList = document.querySelector("ul")
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`)


function makeMessage(type, payload) {
    const msg = {type, payload}
    return JSON.stringify(msg)
}

// 연결 시작할떄
socket.addEventListener("open", () => {
    console.log("connected to server");
})

// 백엔드에서 프론트로 message 전송할떄
socket.addEventListener("message", (message) => {

    const li = document.createElement("li")
    li.innerText = message?.data
    messageList.append(li)
    // console.log("New message : ", message?.data)
})

// 연결 clsoe
socket.addEventListener("close", () => {
    console.log("Disconnect from server ")
})

function handleSubmit(event) {
    event.preventDefault()
    const input = messageForm.querySelector("input")
    // console.log(input.value)
    socket.send(makeMessage("new_message",input.value))
    input.value = ""
}

function handleNickSubmit(event) {
    event.preventDefault()
    const input = nickForm.querySelector("input")
    socket.send(makeMessage("nickname",input.value))
    input.value = ""
}

messageForm.addEventListener("submit", handleSubmit)
nickForm.addEventListener("submit", handleNickSubmit)
// setTimeout(() => {
//     socket.send("hello from the browser!");
// }, 4000);
