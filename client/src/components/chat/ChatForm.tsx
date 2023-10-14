import { useState } from "react";
import { Socket } from "socket.io-client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { messageSchema } from "@/lib/validations/message";
import { Input } from "../ui/input";
import { Send } from "lucide-react";

type ChatFormProps = {
  socket: Socket | null;
};

const ChatForm = ({ socket }: ChatFormProps) => {
  const [isTyping, setIsTyping] = useState(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    defaultValues: {
      inputMessage: "",
    },
  });

  const keyDownHandler = () => {
    if (socket && !isTyping) {
      socket.emit("activity", socket.id.substring(0, 5));
      setIsTyping(true);
    }
  };
  const keyUpHandler = () => {
    setIsTyping(false);
  };

  const submitHandler = (values: z.infer<typeof messageSchema>) => {
    if (socket) {
      socket.emit("message", values.inputMessage);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="py-2 rounded-lg relative"
      >
        <FormField
          control={form.control}
          name="inputMessage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onKeyDown={keyDownHandler}
                  onKeyUp={keyUpHandler}
                  className="text-black font-semibold"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button type="submit" className="absolute top-4 right-4">
          <Send className="w-6 h-6 text-black" />
        </button>
      </form>
    </Form>
  );
};

export default ChatForm;
