import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route';
import { chatSocket } from './controllers/chat.controller';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: false
  })
);

app.use('/api', authRouter);

const expressServer = app.listen(PORT, () => {
  console.log(`서버가 포트번호 ${PORT}에서 정상 작동중입니다.`);
});

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000']
  }
});

chatSocket(io);
