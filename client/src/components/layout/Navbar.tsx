import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full gap-5 p-6 shadow-md">
      <Link to="/">
        <p className="font-bold text-2xl text-white">
          Someting <span className="text-purple-200">Chat</span>
        </p>
      </Link>
      SearchBar
      <div className="flex justify-between items-center">
        ThemeToggleButton LoginButton
      </div>
    </nav>
  );
};

export default Navbar;
