import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Импорт иконок
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Управление видимостью пароля
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/auth/users/", { username, email, password })
      .then(() => navigate("/auth/token/login"))
      .catch(() => setError("Не удалось зарегистрироваться"));
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Добро Пожаловать! Регистрация</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя пользователя:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-input"
            />
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="register-input"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="register-button">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
