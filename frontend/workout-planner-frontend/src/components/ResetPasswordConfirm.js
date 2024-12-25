import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function ResetPasswordConfirm() {
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword,
      })
      .then(() => {
        setMessage("Password successfully reset. Redirecting to login...");
        setTimeout(() => navigate("/auth/token/login"), 3000);
      })
      .catch(() => setMessage("Failed to reset password."));
  };

  return (
    <div>
      <h2>Reset Password Confirm</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordConfirm;
