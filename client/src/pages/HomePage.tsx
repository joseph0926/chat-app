import { useEffect, useState, useRef } from "react";
import Message from "@/components/chat/Message";
import { Socket, io } from "socket.io-client";
import ChatForm from "@/components/chat/ChatForm";

const HomePage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [activity, setActivity] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000/api/chat");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("activity", (name) => {
        setActivity(`${name}님이 작성중입니다,,,`);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setActivity("");
        }, 1000);
      });

      socket.on("message", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
        socket.off("activity");
      }
    };
  }, [socket]);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="p-4 -mt-10 bg-white/90 h-[90%] rounded-2xl">
        <Message messages={messages} activity={activity} />
      </div>
      <ChatForm socket={socket} />
    </div>
  );
};

export default HomePage;
