import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/today-workouts/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setWorkouts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке сегодняшних тренировок:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="dashboard-container">Загрузка...</div>;
  }

  const chartData = {
    labels: workouts.map((w) => w.date),
    datasets: [
      {
        label: "Длительность тренировок (минуты)",
        data: workouts.map((w) => w.duration),
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        borderColor: "#28a745",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

return (
  <div className="dashboard-container">
    <h2 className="dashboard-title">Добро пожаловать на Панель управления ️</h2>
    <div className="dashboard-workouts">
      <div className="workout-card no-workouts-card">
        <h3 className="workout-name">Тренировки на сегодня</h3>
      </div>
      {workouts.length > 0 ? (
        <div className="workout-list">
          {workouts.map((workout) => (
            <div key={workout.id} className="workout-card">
              <h4 className="workout-name">{workout.workout_name}</h4>
              <p className="workout-description">
                {workout.description || "Описание отсутствует"}
              </p>
              <ul className="workout-details">
                <li>
                  <i className="workout-icon">📅</i>
                  <span>
                    <strong>Дата:</strong> {workout.date}
                  </span>
                </li>
                <li>
                  <i className="workout-icon">⏰</i>
                  <span>
                    <strong>Время:</strong> {workout.time}
                  </span>
                </li>
                <li>
                  <i className="workout-icon">🌀</i>
                  <span>
                    <strong>Подходы:</strong> {workout.sets}
                  </span>
                </li>
                <li>
                  <i className="workout-icon">🔁</i>
                  <span>
                    <strong>Повторы:</strong> {workout.reps}
                  </span>
                </li>
                <li>
                  <i className="workout-icon">⏳</i>
                  <span>
                    <strong>Длительность:</strong> {workout.duration} минут
                  </span>
                </li>
                <li>
                  <i className="workout-icon">🏋️</i>
                  <span>
                    <strong>Доп. вес:</strong> {workout.additional_weight || "Нет"} кг
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="workout-card no-workouts-card">
          <p className="workout-description">На сегодня тренировки не запланированы. </p>
        </div>
      )}
    </div>
    <div className="dashboard-summary">
      <div className="summary-card">
        <h3>Сегодняшние тренировки</h3>
        <p>{workouts.length}</p>
      </div>
      <div className="summary-card">
        <h3>Общая длительность</h3>
        <p>{workouts.reduce((total, w) => total + w.duration, 0)} минут</p>
      </div>
    </div>
    <div className="dashboard-chart">
      <h3>Статистика тренировок</h3>
      <Line key={Math.random()} data={chartData} />
    </div>
  </div>
);
}

export default Dashboard;
