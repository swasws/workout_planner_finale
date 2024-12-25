import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>О проекте</h3>
          <p>
            Workout Planner помогает вам планировать тренировки, следить за
            прогрессом и достигать своих целей. Сделайте вашу фитнес-рутину
            удобной и эффективной!
          </p>
        </div>
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>Email: support@workoutplanner.com</p>
          <p>Телефон: +996 555 123 456</p>
        </div>
        <div className="footer-section">
          <h3>Следите за нами</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Workout Planner. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
