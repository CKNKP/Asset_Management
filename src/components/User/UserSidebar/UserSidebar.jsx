import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";


const Sidebar = () => {

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
    if (window.history && window.history.pushState) {
      window.history.replaceState(null, null, "/");
      window.history.pushState(null, null, "/");
      window.onpopstate = () => window.history.go(1);
    }
  };
  return (
    <div className="min-h-screen bg-gray-800 text-white w-64 flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-4 mt-16">
        <Link
          to= "/user/request"
          className=" px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <AddBoxIcon />
          <span>Create Request</span>
        </Link>
        <div className="px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2 hover:cursor-pointer" onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;