import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

const App = () => {
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </MainLayout>
      </>
    );
};
export default App;
