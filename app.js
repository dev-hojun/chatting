const express = require("express") // express를 불러옴
const http = require("http") // 기본 모듈인 http를 불러옴
const app = express(); // express 를 실행할 내용을 app에 담음
const path = require("path") // path 모듈을 불러옴, url을 쉽게 만들 수 있음
const server = http.createServer(app) // express로 구현한 app을 http를 통해서 실행될 수 있도록 함 
const socketIO = require("socket.io") // socket.io를 변수에 담음
const moment = require("moment")

const io = socketIO(server); // 서버에 담음

app.use(express.static(path.join(__dirname, "src"))) // 서버가 실행되면 보여줄 폴더를 지정

const PORT = process.env.PORT || 5000; // 5000번 포트를 사용

io.on("connection", (socket) => { // connection이 이루어지면 연결에 대한 정보를 socket에 담음
    socket.on("chatting", (data) => {
        const {name, msg} = data;
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:ss A")
        }) // 서버에서 프론트로 보냄
    })
})

server.listen(PORT, () => console.log(`server is running ${PORT}`)) // 포트, 명령어 순으로 작성, 서버를 실행하면 console.log를 찍음