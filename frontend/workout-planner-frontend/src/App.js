import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Подключаем Footer

import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";

import Profile from "./components/Profile";

import ResetPassword from "./components/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";

import Dashboard from "./pages/Dashboard";
import PlanWorkouts from "./pages/PlanWorkouts";
import Calendar from "./pages/Calendar";
import ManageWorkouts from "./pages/Manage-workouts";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth/token/login" element={<Login />} />
            <Route path="/auth/users" element={<Register />} />

            <Route path="/auth/token/logout" element={<Logout />} />

            <Route path="/auth/users/me" element={<Profile />} />

            <Route path="/auth/users/reset_password" element={<ResetPassword />} />
            <Route path="/auth/users/reset_password_confirm" element={<ResetPasswordConfirm />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-workouts" element={<ManageWorkouts />} />
            <Route path="/plan/:date" element={<PlanWorkouts />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
        <Footer /> {/* Добавляем Footer */}
      </div>
    </Router>
  );
}

export default App;
