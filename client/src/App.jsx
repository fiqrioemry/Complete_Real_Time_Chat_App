import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AuthRoute from "./middleware/AuthRoute";
import { Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Practice from "./pages/Practice";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route path="/practice" element={<Practice />} />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthRoute>
              <PageLayout />
            </AuthRoute>
          }
        >
          <Route
            index
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route
            path="settings"
            element={
              <AuthRoute>
                <Settings />
              </AuthRoute>
            }
          />
          <Route
            path="profile"
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
export default App;
