import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Добро пожаловать в Workout Planner!</h1>
        <p>
          Планируйте свои тренировки, следите за прогрессом и достигайте
          поставленных целей.
        </p>
      </header>
      <div className="welcome-content">
        <section>
          <h2>Что вы можете сделать:</h2>
          <ul>
            <li>Создавать расписание тренировок на каждый день.</li>
            <li>Выбирать из списка предустановленных тренировок.</li>
            <li>Управлять своими запланированными тренировками.</li>
            <li>Редактировать и удалять существующие тренировки.</li>
          </ul>
        </section>
        <section>
          <h2>Начните прямо сейчас:</h2>
          <div className="welcome-buttons">
            <Link to="/auth/token/login" className="welcome-button login-button">
              Войти
            </Link>
            <Link
              to="/auth/users"
              className="welcome-button register-button"
            >
              Регистрация
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Welcome;
