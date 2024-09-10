import './index.css'
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Employee from './components/SuperAdmin/Employee/Employee';
import SuperHardware from './components/SuperAdmin/SuperHardware/SuperHardware';
import SuperSoftware from './components/SuperAdmin/SuperSoftware/SuperSoftware';
import SuperRequest from './components/SuperAdmin/SuperRequest/SuperRequest';
import Hardware from './components/Admin/Hardware/Hardware';  
import Software from './components/Admin/Software/Software';  
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Request from './components/Admin/Request/Request';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/admin/request" element={<Request />} />
      <Route path="/superadmin/employee" element={<Employee />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/admin/hardware" element={<Hardware />} />
      <Route path="/admin/software" element={<Software />} />
      <Route path="/superadmin/hardware" element={<SuperHardware />} />
      <Route path="/superadmin/software" element={<SuperSoftware />} />
      <Route path="/superadmin/request" element={<SuperRequest />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);