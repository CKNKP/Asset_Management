import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('role'); // Check if user is authenticated

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;