import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "./styles.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>E-Commerce Shop</h1>
      </div>

      <div className="navbar-links">
        <Link to="/">
          <div className="link-container">Shop</div>
        </Link>
        <Link to="/purchased-items">
          <div className="link-container">Purchases</div>
        </Link>
        <Link to="/checkout">
          <div className="link-container">
            <BsCart3 />
          </div>
        </Link>
      </div>
    </div>
  );
};
