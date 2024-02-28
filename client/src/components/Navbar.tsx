import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>Mateusz Zalewski</h1>
      </div>

      <div className="navbar-links">
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </div>
  );
};
