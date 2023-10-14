import { sidebarLinks } from "@/constants/links";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="sticky left-0 top-0 bg- h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-md w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex cursor-pointer items-center justify-start gap-4 bg-transparent p-4",
              true
                ? "bg-primary cursor-pointer rounded-lg text-white"
                : "text-black"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
