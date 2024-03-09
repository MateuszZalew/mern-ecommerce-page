import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "./styles.css";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export const Navbar = () => {
  const { availableMoney } = useContext(ShopContext);
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
        <div className="link-container">
          <span>$ {availableMoney.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
