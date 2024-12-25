import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthRoute = ({ children }) => {
  const { userAuth } = useAuthStore();
  const location = useLocation();

  if (userAuth && location.pathname.includes("/signin"))
    return <Navigate to="/" />;

  if (!isAuthenticate && authPath.includes(currentPath))
    return <Navigate to="/sign-in" />;

  if (
    isAuthenticate &&
    user?.userRole !== "admin" &&
    prohibitPath.includes(currentPath)
  )
    return <Navigate to="*" />;

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
