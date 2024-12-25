/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AuthRoute from "../../middleware/AuthRoute";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";

const MainLayout = ({ children }) => {
  const { theme } = useThemeStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main data-theme={theme}>
      <div>
        <Toaster />
        <AuthRoute>{children}</AuthRoute>
      </div>
    </main>
  );
};

export default MainLayout;
