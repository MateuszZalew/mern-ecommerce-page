import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "./styles.css";
import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext(ShopContext);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <Link to="/">
          <h1>E-Commerce Shop</h1>
        </Link>
      </div>

      <div className="navbar-links">
        {isAuthenticated && (
          <>
            <Link to="/">
              <div className="link-container">Shop</div>
            </Link>
            <Link to="/purchased-items">
              <div className="link-container">Purchases</div>
            </Link>
            <Link to="/checkout">
              <div className="link-container">
                <span className="cart-link">Cart</span>
                <BsCart3 />
              </div>
            </Link>
            <Link to="/login" onClick={logout}>
              <div className="link-container">Logout</div>
            </Link>
            <div className="link-container currency-block">
              <p>Available currency</p>
              <span>{availableMoney.toFixed(2)}$</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
