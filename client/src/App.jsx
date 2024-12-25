import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import PageLayout from "./components/layout/PageLayout";

const App = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </MainLayout>
    </>
  );
};
export default App;
