/* eslint-disable react/prop-types */
import { useEffect } from "react";
import PageLoading from "./PageLoading";
import AuthRoute from "../../middleware/AuthRoute";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";

const MainLayout = ({ children }) => {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main data-theme={theme}>
      <div>
        {!authUser && !isCheckingAuth ? (
          <PageLoading />
        ) : (
          <AuthRoute>{children}</AuthRoute>
        )}
      </div>
    </main>
  );
};

export default MainLayout;
