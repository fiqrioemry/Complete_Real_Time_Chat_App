/* eslint-disable react/prop-types */
import { useEffect } from "react";
import PageLoading from "./PageLoading";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";

const MainLayout = ({ children }) => {
  const { theme } = useThemeStore();
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main data-theme={theme}>
      <Toaster />
      <div>{isCheckingAuth ? <PageLoading /> : children}</div>
    </main>
  );
};

export default MainLayout;
