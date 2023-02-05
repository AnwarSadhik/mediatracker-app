import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token') == null ? false : true;

    if (isAuthenticated ) {
      return children
    }

    return <Navigate to="/" />
  }

export default PrivateRoute;