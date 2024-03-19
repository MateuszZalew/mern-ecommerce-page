import { useState, SyntheticEvent, ChangeEvent, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { IShopContext, ShopContext } from "../../../context/shop-context";
import { UserErrors } from "../../../models/errors";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";
import axios from "axios";
import "../styles.css";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://mern-ecommerce-page.onrender.com/user/login",
        {
          username,
          password,
        }
      );
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      toast.success("You are now logged in");
      navigate("/");
    } catch (error) {
      let errorMessage = "";
      switch (error.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "No user found";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong password";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      toast.error(`${errorMessage}`);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="login-username">Username </label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password </label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="redirect-text register">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
