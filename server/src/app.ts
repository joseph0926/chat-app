import { Server } from 'socket.io';
import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();
const expressServer = app.listen(PORT, () => {
  console.log(`서버가 포트번호 ${PORT}에서 정상 작동중입니다.`);
});

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000']
  }
});

io.on('connection', (socket) => {
  socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}가 연결되었습니다.`);

  socket.on('message', (data) => {
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}가 나갔습니다.`);
  });

  socket.on('activity', (name) => {
    socket.broadcast.emit('activity', name);
  });
});
