import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageWorkouts.css";

function ManageWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editDetails, setEditDetails] = useState({
    workout: "",
    date: "",
    time: "",
    sets: "",
    reps: "",
    duration: "",
    additional_weight: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/workout-schedules/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setWorkouts(response.data))
        .catch((error) =>
          console.error("Не удалось загрузить тренировки:", error)
        );
    }
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("access");
    if (token) {
      axios
        .delete(`http://127.0.0.1:8000/api/workout-schedules/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() =>
          setWorkouts(workouts.filter((workout) => workout.id !== id))
        )
        .catch((error) =>
          console.error("Не удалось удалить тренировку:", error)
        );
    }
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout.id);
    setEditDetails({
      workout: workout.workout, // ID тренировки
      date: workout.date,
      time: workout.time,
      sets: workout.sets,
      reps: workout.reps,
      duration: workout.duration,
      additional_weight: workout.additional_weight || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (token && editingWorkout) {
      axios
        .put(
          `http://127.0.0.1:8000/api/workout-schedules/${editingWorkout}/`,
          editDetails,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setWorkouts(
            workouts.map((workout) =>
              workout.id === editingWorkout ? response.data : workout
            )
          );
          setEditingWorkout(null);
        })
        .catch((error) =>
          console.error(
            "Не удалось обновить тренировку:",
            error.response?.data || error
          )
        );
    }
  };

  return (
    <div className="manage-workouts-container">
      <h2 className="manage-workouts-title">Управление тренировками</h2>
      <div className="manage-workouts-list">
        {workouts.map((workout) => (
          <div key={workout.id} className="workout-card-mg">
            {editingWorkout === workout.id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor={`sets-${workout.id}`}>Подходы:</label>
                  <input
                    type="number"
                    id={`sets-${workout.id}`}
                    name="sets"
                    value={editDetails.sets}
                    onChange={handleEditChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`reps-${workout.id}`}>Повторы:</label>
                  <input
                    type="number"
                    id={`reps-${workout.id}`}
                    name="reps"
                    value={editDetails.reps}
                    onChange={handleEditChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`duration-${workout.id}`}>Длительность:</label>
                  <input
                    type="number"
                    id={`duration-${workout.id}`}
                    name="duration"
                    value={editDetails.duration}
                    onChange={handleEditChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`additional-weight-${workout.id}`}>
                    Доп. вес:
                  </label>
                  <input
                    type="number"
                    id={`additional-weight-${workout.id}`}
                    name="additional_weight"
                    value={editDetails.additional_weight}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`date-${workout.id}`}>Дата:</label>
                  <input
                    type="date"
                    id={`date-${workout.id}`}
                    name="date"
                    value={editDetails.date}
                    onChange={handleEditChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`time-${workout.id}`}>Время:</label>
                  <input
                    type="time"
                    id={`time-${workout.id}`}
                    name="time"
                    value={editDetails.time}
                    onChange={handleEditChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="save-button">
                    Сохранить
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setEditingWorkout(null)}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h4 className="workout-title">{workout.workout_name}</h4>
                <p className="workout-description">{workout.description}</p>
                <ul className="workout-details">
                  <li>Дата: {workout.date}</li>
                  <li>Время: {workout.time}</li>
                  <li>Подходы: {workout.sets}</li>
                  <li>Повторы: {workout.reps}</li>
                  <li>Длительность: {workout.duration} минут</li>
                  <li>Доп. вес: {workout.additional_weight || "Нет"} кг</li>
                </ul>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(workout)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(workout.id)}
                  >
                    Удалить
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageWorkouts;
