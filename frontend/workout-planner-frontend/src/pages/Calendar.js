import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Стандартные стили для календаря
import "./Calendar.css"; // Дополнительные стили
import { useNavigate } from "react-router-dom";

function TrainingCalendar() {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    setDate(newDate);

    // Преобразуем дату в локальный формат YYYY-MM-DD
    const formattedDate = newDate.toLocaleDateString("en-CA"); // Формат YYYY-MM-DD

    // Навигация на страницу планирования
    navigate(`/plan/${formattedDate}`);
  };

  return (
    <div className="calendar-container">
      <h2>Календарь</h2>
      <p>Выберите дату, чтобы запланировать тренировку:</p>
      <Calendar
        value={date}
        onChange={handleDateChange}
        minDate={new Date()} // Запрет выбора прошлых дат
        className="dark-theme-calendar"
      />
    </div>
  );
}

export default TrainingCalendar;
