import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css"; // Подключаем стили

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем текущего пользователя
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/auth/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .post(
          "http://127.0.0.1:8000/auth/token/logout/",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          setUser(null);
        })
        .catch((err) => console.error("Ошибка выхода из системы:", err));
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">
          <Link to="/" className="logo-link">
            Workout Planner
          </Link>
        </h1>
        <ul className="nav-links">
          {!user ? (
            <>
              <li>
                <Link to="/auth/token/login" className="nav-link">
                  Вход
                </Link>
              </li>
              <li>
                <Link to="/auth/users" className="nav-link">
                  Регистрация
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
               <Link to="/dashboard" className="nav-link">
                  Панель управления
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="nav-link">
                  Создать тренировку
                </Link>
              </li>
              <li>
                <Link to="/manage-workouts" className="nav-link">
                  Управление тренировками
                </Link>
              </li>
              <li>
                 <Link to="/auth/users/me" className="nav-link">
                  Профиль
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Выход
                </button>
              </li>
            </>
          )}
        </ul>
        {user && (
          <div className="user-info">
            <Link to="/auth/users/me" className="user-profile-link">
              <span className="user-username">{user.username}</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
