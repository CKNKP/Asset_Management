import './index.css'
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Employee from './components/Admin/Employee/Employee';  
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
      <Route path="/admin/employee" element={<Employee />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/admin/hardware" element={<Hardware />} />
      <Route path="/admin/software" element={<Software />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);