// websocket 사용
////////////////---------------------------------------------------------------------
// const messageList = document.querySelector("ul")
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket = new WebSocket(`ws://${window.location.host}`)
//
// function makeMessage(type, payload) {
//     const msg = {type, payload}
//     return JSON.stringify(msg)
// }
//
// // 연결 시작할떄
// socket.addEventListener("open", () => {
//     console.log("connected to server");
// })
//
// // 백엔드에서 프론트로 message 전송할떄
// socket.addEventListener("message", (message) => {
//     // const li = document.createElement("li")
//     // li.innerText = message?.data
//     // messageList.append(li)
//
//
//     // console.log("New message : ", message?.data)
// })
//
//
//
//
// // 연결 clsoe
// socket.addEventListener("close", () => {
//     console.log("Disconnect from server ")
// })
//
// function handleSubmit(event) {
//     event.preventDefault()
//     const input = messageForm.querySelector("input")
//     // console.log(input.value)
//     socket.send(makeMessage("new_message", input.value))
//
//     const li = document.createElement("li")
//     li.innerText = `You:${input.value} `;
//     messageList.append(li)
//
//     input.value = ""
// }
//
// function handleNickSubmit(event) {
//     event.preventDefault()
//     const input = nickForm.querySelector("input")
//     socket.send(makeMessage("nickname", input.value))
//     input.value = ""
// }
//
// messageForm.addEventListener("submit", handleSubmit)
// nickForm.addEventListener("submit", handleNickSubmit)
// setTimeout(() => {
//     socket.send("hello from the browser!");
// }, 4000);

////////////////---------------------------------------------------------------------


// //----------------- socket.io
// const socket = io()
// // io 함수가 자동으로 socket.io 실행하는 서버를 찾음
// const welcom = document.getElementById("welcome")
// const form = welcom.querySelector("form")
// const room = document.getElementById("room")
// room.hidden = true
//
// let roomName;
//
// function addMessage(message) {
//     const ul = room.querySelector("ul")
//     const li = document.createElement("li")
//     li.innerText = message;
//     ul.appendChild(li)
// }
//
// function handleMessageSubmit(event) {
//     event.preventDefault()
//     const input = room.querySelector("#msg input")
//     const value = input.value
//     socket.emit("new_message", input.value, roomName, () => {
//         addMessage(`You : ${value}`)
//     })
//     input.value = ""
// }
//
// function handleNicknameSubmit(event) {
//     event.preventDefault()
//     const input = room.querySelector("#name input")
//     const value = input.value
//     socket.emit("nickname", input.value)
// }
//
// function showRoom() {
//     welcom.hidden = true;
//     room.hidden = false;
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}`;
//     const msgForm = room.querySelector("#msg")
//     const nameForm = room.querySelector("#name")
//     nameForm.addEventListener("submit", handleNicknameSubmit)
//     msgForm.addEventListener("submit", handleMessageSubmit)
// }
//
// function handleRoomSubmit(event) {
//     event.preventDefault()
//     const input = form.querySelector("input")
//     socket.emit("enter_room", input.value, showRoom)
//     roomName = input.value
//     input.value = ""
// }
//
// socket.on("welcome", (user, newCount) => {
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}(${newCount})`;
//     addMessage(`${user} arrived`)
// })
//
// socket.on("bye", (left, newCount) => {
//     addMessage(`${left} left OMG`)
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}(${newCount})`;
// })
// socket.on("room_change", (rooms) => {
//     const roomList = welcom.querySelector("ul")
//     roomList.innerHTML = ""
//     if (rooms.length === 0) {
//         return
//     }
//     rooms.forEach(room => {
//         const li = document.createElement("li")
//         li.innerText = room
//         roomList.appendChild(li)
//     })
// })
// socket.on("new_message", addMessage)
// form.addEventListener("submit", handleRoomSubmit)

//------------------------------------------Web-RTC
const socket = io()
const myFace = document.getElementById("myFace")
const muteBtn = document.getElementById("mute")
const cameraBtn = document.getElementById("camera")
const camerasSelect = document.getElementById("cameras")
const welcome = document.getElementById("welcome")
const call = document.getElementById("call")

call.hidden = true

let myStream;
let muted = false
let cameraOff = false
let roomName;
let myPeerConnection
let myDataChannel;

async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter(device => device.kind === "videoinput");
        const currentCamera = myStream.getVideoTracks()[0]
        cameras.forEach(cameras => {
            const option = document.createElement("option")
            option.value = cameras.deviceId
            option.innerText = cameras.label
            if (currentCamera.label === cameras.label) {
                option.selected = true
            }
            camerasSelect.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }
}

async function getMedia(deviceId) {
    const initialConstrains = {
        audio: false, video: {facingMode: "user"}
    }
    const cameraConstraints = {
        audio: false,
        video: {deviceId: {exact: deviceId}}
    }
    try {
        myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstrains)
        myFace.srcObject = myStream

        if (!deviceId) { //딱한번만 실행하기 위해
            await getCameras()
        }
    } catch (e) {
        console.log(e)
    }
}

// getMedia()

function handleMuteClick() {
    myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    if (!muted) {
        muteBtn.innerText = "Unmute"
        muted = true
    } else {
        muteBtn.innerText = "Mute"
        muted = false
    }
}

function handleCameraClick() {
    myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    if (cameraOff) {
        cameraBtn.innerText = "Turn Camera Off"
        cameraOff = false
    } else {
        cameraBtn.innerText = "Turn Camera On"
        cameraOff = true
    }
}

async function handleCameraChange() {
    await getMedia(camerasSelect.value)
    if (myPeerConnection) {
        const videoTrack = myStream.getVideoTracks()[0]
        const videoSender = myPeerConnection.getSenders().find(sender => sender.track.kind === "video")
        videoSender.replaceTrack(videoTrack)
        //     sender 부분을 통한 카메라 변경 시 다른 브라우저에서 작동
    }
}

muteBtn.addEventListener("click", handleMuteClick)
cameraBtn.addEventListener("click", handleCameraClick)
camerasSelect.addEventListener("input", handleCameraChange)

welcomeForm = welcome.querySelector("form")

async function initCall() {
    welcome.hidden = true
    call.hidden = false
    await getMedia()
    makeConnection()
}

async function handleWelcomeSubmit(evenet) {
    evenet.preventDefault()
    const input = welcomeForm.querySelector("input")
    await initCall()
    socket.emit("join_room", input.value)
    roomName = input.value
    input.value = ""
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit)


// socket Code
socket.on("welcome", async () => {
    myDataChannel = myPeerConnection.createDataChannel("chat")
    myDataChannel.addEventListener("message", (event) => {
        console.log(event.data)
    })
    console.log("made data channel")

    const offer
        = await myPeerConnection.createOffer()
    myPeerConnection.setLocalDescription(offer)
    console.log("sent the offer")
    socket.emit("offer", offer, roomName)
})
///////////위 아래 소스가 다른 브라우저에서 실행되는것~~~~~
socket.on("offer", async (offer) => {
    myPeerConnection.addEventListener("datachannel", (event) => {
        myDataChannel = event.channel
        myDataChannel.addEventListener("message", (event) => {
            console.log(event.data)
        })
    })
    console.log("received the offer")
    myPeerConnection.setRemoteDescription(offer)
    const answer = await myPeerConnection.createAnswer()
    myPeerConnection.setLocalDescription(answer)
    socket.emit("answer", answer, roomName)
    console.log("sent the answer")

})


socket.on("answer", (answer) => {
    console.log("received the answer")
    myPeerConnection.setRemoteDescription(answer)
})

socket.on("ice", (ice) => {
    console.log("received candidate ")
    myPeerConnection.addIceCandidate(ice)
})

//  RTC Code
function makeConnection() {

    myPeerConnection = new RTCPeerConnection({
        iceServers: [{ //구글이 지원해주는 무료 STUN 서버
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
            ],
        }]
    })
    myPeerConnection.addEventListener("icecandidate", handleIce)
    myPeerConnection.addEventListener("addstream", handleAddStream)
    myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream))
}

function handleIce(data) {
    console.log("sent candidate ")
    socket.emit("ice", data.candidate, roomName)
    // console.log("got ice candidate")
}

function handleAddStream(data) {
    const peersFace = document.getElementById("peersFace")
    peersFace.srcObject = data.stream


    // console.log("got an stream from my peer")
    // console.log("peer stream",data.stream)
    // console.log("my stream", myStream)
}
