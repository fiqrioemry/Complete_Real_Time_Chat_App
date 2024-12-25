import { Fragment } from "react";
import { authPath, nonAuthPath } from "../config";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  const currentPath = useLocation().pathname;

  if (authUser && nonAuthPath.includes(currentPath)) return <Navigate to="/" />;

  if (!authUser && authPath.includes(currentPath))
    return <Navigate to="/signin" />;

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
