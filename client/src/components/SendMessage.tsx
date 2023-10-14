import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activity, setActivity] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
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
      }
    };
  }, [socket]);

  const keyDownHandler = () => {
    if (socket && !isTyping) {
      socket.emit("activity", socket.id.substring(0, 5));
      setIsTyping(true);
    }
  };
  const keyUpHandler = () => {
    setIsTyping(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message !== "" && socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={keyDownHandler}
          onKeyUp={keyUpHandler}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <p>{activity}</p>
    </div>
  );
};

export default SendMessage;
