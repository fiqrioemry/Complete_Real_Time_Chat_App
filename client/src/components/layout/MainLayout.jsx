import { useAuthStore } from "../../store/useAuthStore";
import { useThemeStore } from "../../store/useThemeStore";

const MainLayout = ({ children }) => {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  return <main data-theme={theme}>{chilren}</main>;
};

export default MainLayout;
