import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PlanWorkouts.css";

function PlanWorkouts() {
  const { date } = useParams(); // Получаем выбранную дату из маршрута
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [planDetails, setPlanDetails] = useState({
    sets: "",
    reps: "",
    duration: "",
    additional_weight: "",
    time: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/workouts/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setWorkouts(response.data))
        .catch((error) =>
          console.error("Не удалось загрузить тренировки:", error)
        );
    }
  }, []);

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (token && selectedWorkout) {
      const requestData = {
        date,
        workout: selectedWorkout,
        ...planDetails,
      };

      axios
        .post("http://127.0.0.1:8000/api/workout-schedules/", requestData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => alert("Тренировка успешно запланирована!"))
        .catch((error) =>
          console.error(
            "Не удалось запланировать тренировку:",
            error.response?.data || error
          )
        );
    }
  };

  return (
    <div className="plan-workouts-container">
      <h2 className="plan-title">Планирование тренировки на {date}</h2>
      <form onSubmit={handlePlanSubmit} className="plan-form">
        <div className="form-group">
          <label>Выберите тренировку:</label>
          <select
            value={selectedWorkout || ""}
            onChange={(e) => setSelectedWorkout(e.target.value)}
            required
            className="form-select"
          >
            <option value="" disabled>
              Выберите тренировку
            </option>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Подходы:</label>
          <input
            type="number"
            value={planDetails.sets}
            onChange={(e) =>
              setPlanDetails({ ...planDetails, sets: e.target.value })
            }
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Повторы:</label>
          <input
            type="number"
            value={planDetails.reps}
            onChange={(e) =>
              setPlanDetails({ ...planDetails, reps: e.target.value })
            }
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Продолжительность (минуты):</label>
          <input
            type="number"
            value={planDetails.duration}
            onChange={(e) =>
              setPlanDetails({ ...planDetails, duration: e.target.value })
            }
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Дополнительный вес (кг):</label>
          <input
            type="number"
            value={planDetails.additional_weight}
            onChange={(e) =>
              setPlanDetails({
                ...planDetails,
                additional_weight: e.target.value,
              })
            }
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Время (часы:минуты):</label>
          <input
            type="time"
            value={planDetails.time}
            onChange={(e) =>
              setPlanDetails({ ...planDetails, time: e.target.value })
            }
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-submit">
          Запланировать
        </button>
      </form>
    </div>
  );
}

export default PlanWorkouts;
