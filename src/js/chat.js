"use strict"
const socket = io();

const nickname = document.querySelector("#nickname"); // dom 형태로 전송
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13) {
        send()
    }
})

function send() {
    const param = { // 서버에 오브젝트 형태로 전송
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
    chatInput.value = ""; // 채팅 초기화
}

sendButton.addEventListener("click", send)

socket.on("chatting", (data) => { // 서버에서 보낸 내용을 확인
    console.log(data)
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time); // LiModel 인스턴트화
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight) // 스크롤 생길 시 포커싱
})

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li"); // li 태그 생성
        li.classList.add(nickname.value === this.name ? "sent": "received") //nickname value가 서버에 넘겨받은 이름과 같으면 클래스를 sent, 아니라면 received
        const dom =`<span class="profile">
                    <span class="user">${this.name}</span>
                    <img class="image" src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg" alt="any">
                    </span>
                    <span class="message">${this.msg}</span>
                    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li)
    }
}

console.log(socket)