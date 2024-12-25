import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/token/refresh/", {
          refresh,
        });
        localStorage.setItem("access", response.data.access); // Обновляем access токен
        return response.data.access;
      } catch (error) {
        console.error("Не удалось обновить токен:", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let token = localStorage.getItem("access");
      if (!token) {
        console.error("Нет доступа: токен отсутствует");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Если токен истёк, обновляем его
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            try {
              const response = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              });
              setUser(response.data);
            } catch (error) {
              console.error("Ошибка получения данных после обновления токена:", error);
            }
          }
        } else {
          console.error("Не удалось получить данные пользователя:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="profile-container">Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Профиль пользователя</h2>
        {user.avatar && (
          <img
            src={user.avatar}
            alt="Аватар пользователя"
            className="profile-avatar"
          />
        )}
        <p>
          <strong>Имя пользователя:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}

export default Profile;
