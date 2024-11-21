import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./components/auth/Loginpage";
import SignUpPage from "./components/auth/SignUpPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Feed from "./components/Feed";
import Sidebar from "./components/layout/Sidebar";
import Friends from "./components/Friends";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/feed");
    }
  }, []);

  return (
    <div>
      <AuthProvider>
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Sidebar />
        )}

        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
