import LeftSidebar from "@/components/layout/LeftSidebar";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default RootPage;
