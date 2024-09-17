import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ComputerIcon from "@mui/icons-material/Computer";
import BuildIcon from "@mui/icons-material/Build";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const SuperSidebar = () => {


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
          to = "/superadmin/dashboard"
          className=" px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </Link>
        <Link
          to = "/superadmin/employee"
          className=" px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <PersonAddIcon />
          <span>Add Employee</span>
        </Link>
        <Link
          to = "/superadmin/software"
          className=" px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <ComputerIcon />
          <span>Add Software</span>
        </Link>
        <Link
          to = "/superadmin/hardware"
          className=" px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <BuildIcon />
          <span>Add Hardware</span>
        </Link>
        <Link
          to= "/superadmin/request"
          className=" px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <AddBoxIcon />
          <span>Asset Allocation</span>
        </Link>
        {/* <Link
          to="/superadmin/role"
          className="px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <AddCircleOutlineIcon />
          <span>Add Role</span>
        </Link> */}
        <Link
          to="/superadmin/assign-role"
          className="px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2"
        >
          <AssignmentIndIcon />
          <span>Assign Role</span>
        </Link>
        <div className="px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 flex items-center space-x-2 hover:cursor-pointer" onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default SuperSidebar;