import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type MessageProps = {
  messages: string[];
  activity: string;
};

const Message = ({ messages, activity }: MessageProps) => {
  return (
    <div className="text-black">
      <ul className="flex flex-col gap-2">
        {messages.length === 0 ? (
          <div>메시지가 없습니다,,,</div>
        ) : (
          messages.map((message, idx) => (
            <div key={idx}>
              <Badge variant="secondary" className="py-1.5 px-2 rounded-sm">
                {message}
              </Badge>
            </div>
          ))
        )}
      </ul>
      <p className="text-sm text-gray-400 mt-4">{activity}</p>
    </div>
  );
};

export default Message;
