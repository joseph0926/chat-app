import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  return (
    <div className="sticky left-0 top-0 bg- h-screen flex-col justify-between overflow-y-auto p-6 pt-36 shadow-2xl w-[266px]">
      <Button
        variant="outline"
        className="w-full py-2 rounded-full bg-transparent mb-8 text-[16px] border-purple-200 hover:bg-purple-200 hover:text-black transition"
      >
        + New Chat
      </Button>
      <div className="flex flex-1 flex-col gap-6">
        <div className="py-6 flex flex-col gap-4">
          <span className="font-semibold block">Today</span>
          <Link
            to="/"
            className="py-2 w-full text-center border rounded-full bg-transparent mb-8 text-[16px] border-purple-200 hover:bg-purple-200 hover:text-black transition"
          >
            dummy-chat-01
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
