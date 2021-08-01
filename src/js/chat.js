"use strict"
const socket = io();

const nickname = document.querySelector("#nickname") // dom 형태로 전송
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")

sendButton.addEventListener("click", ()=> {
    const param = { // 서버에 오브젝트 형태로 전송
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
})

socket.on("chatting", (data) => { // 서버에서 보낸 내용을 확인
    console.log(data)
})

console.log(socket)