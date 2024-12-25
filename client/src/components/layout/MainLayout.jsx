import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";
import Navbar from "../Navbar";

const MainLayout = ({ children }) => {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <main data-theme={theme}>
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default MainLayout;
