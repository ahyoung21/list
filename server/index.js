// 1. 서버 생성
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const moment = require('moment-timezone');
const cors = require('cors');
const socketUpload = require('socketio-file-upload');
const path = require('path');
moment.tz.setDefault('Asia/Seoul');

// users.js
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5080;

// 2. 라우터 설정
const router = require('./router');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// 3. 소켓 연결 및 이벤트
io.on('connection', (socket) => {
  console.log('소켓 연결 완료');

  // 클라이언트에서 join이벤트를 보냈을 경우에 대해서 처리 `on`
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error); // username taken
    // 해당 유저 방에 접속처리
    socket.join(user.room);

    let uploader = new socketUpload();
    uploader.dir = path.join(__dirname);
    uploader.listen(socket);

    uploader.on('saved', function (event) {
      console.log('성공', event.file);
    });

    // uploader.on('progress', function (event) {
    //   console.log(event.file.bytesLoaded / event.file.size);
    //   socket.emit('upload.progress', {
    //     percentage: (event.file.bytesLoaded / event.file.size) * 100,
    //   });
    // });

    uploader.on('error', function (event) {
      console.log('Error from uploader', event);
    });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
      time: moment(new Date()).format('h:mm A'),
      day: moment(new Date()).format('YYYY-MM-DD'),
    });

    callback();
  });
  // 유저가 생성한 이벤트에 대한 처리 `on`
  socket.on('sendMessage', (message) => {
    console.log('socket', socket);

    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      user: user.name,
      text: message,
      time: moment(new Date()).format('h:mm A'),
      day: moment(new Date()).format('YYYY-MM-DD'),
    });

    // callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log('유저가 떠났습니다..');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
