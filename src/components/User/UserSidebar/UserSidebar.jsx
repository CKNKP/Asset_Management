import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";


const Sidebar = () => {
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
      </nav>
    </div>
  );
};

export default Sidebar;