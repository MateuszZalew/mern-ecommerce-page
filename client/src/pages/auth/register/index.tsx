import { useState, SyntheticEvent, ChangeEvent } from "react";
import { UserErrors } from "../../../models/errors";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles.css";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://mern-ecommerce-page.onrender.com/user/register",
        {
          username,
          password,
        }
      );
      toast.success("Registration successful. You can now login.");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        toast.error("Username already exists");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="register-username">Username </label>
            <input
              type="text"
              id="register-username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Password </label>
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Register</button>
          <p className="redirect-text login">
            Have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
