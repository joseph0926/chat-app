import { Server } from 'socket.io';

export const chatSocket = (io: Server) => {
  io.of('/api/chat').on('connection', (socket) => {
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}가 연결되었습니다.`);

    socket.on('message', (data) => {
      io.of('/api/chat').emit('message', `${socket.id.substring(0, 5)}: ${data}`);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}가 나갔습니다.`);
    });

    socket.on('activity', (name) => {
      socket.broadcast.emit('activity', name);
    });
  });
};
