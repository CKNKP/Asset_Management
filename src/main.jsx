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
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Request from './components/Admin/Request/Request';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/request" element={<Request />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/hardware" element={<Hardware />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);