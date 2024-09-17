import './index.css'
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Employee from './components/SuperAdmin/Employee/Employee';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import SuperHardware from './components/SuperAdmin/SuperHardware/SuperHardware';
import SuperSoftware from './components/SuperAdmin/SuperSoftware/SuperSoftware';
import SuperRequest from './components/SuperAdmin/SuperRequest/SuperRequest';
import Hardware from './components/Admin/Hardware/Hardware';  
import Software from './components/Admin/Software/Software';  
import UserRequest from './components/User/UserRequest/UserRequest';
import Login from './components/Login/Login';
import Request from './components/Admin/Request/Request';
import Role from './components/SuperAdmin/Role/Role';
import AssignRole from './components/SuperAdmin/AssignRole/AssignRole';
import SuperDashboard from './components/SuperAdmin/SuperDashboard/SuperDashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />

      

      <Route path="/admin">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hardware" element={<Hardware />} />
        <Route path="software" element={<Software />} />
        <Route path="request" element={<Request />} />
      </Route>

      <Route path="/superadmin">
        <Route path="employee" element={<Employee />} />
        <Route path="hardware" element={<SuperHardware />} />
        <Route path="software" element={<SuperSoftware />} />
        <Route path="request" element={<SuperRequest />} />
        <Route path="role" element={<Role />} />
        <Route path="assign-role" element={<AssignRole />} />
        <Route path="dashboard" element={<SuperDashboard />} />
      </Route>

      <Route path="/user">
        <Route path="request" element={<UserRequest />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);