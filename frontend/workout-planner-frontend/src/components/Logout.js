import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://127.0.0.1:8000/auth/token/logout/", {}, {
          headers: { Authorization: `Token ${token}` },
        })
        .then(() => {
          localStorage.removeItem("token");
          navigate("/auth/token/login");
        })
        .catch(() => {
          console.error("Failed to logout");
          navigate("/auth/token/login");
        });
    } else {
      navigate("/auth/token/login");
    }
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
