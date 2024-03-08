import { useContext } from "react";
import useGetProducts from "../../hooks/useGetProducts";
import { IShopContext, ShopContext } from "../../context/shop-context";
import CartItem from "./cart-item";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>

      <div className="cart">
        {products.map((product) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product={product} key={product._id} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={checkout}>Checkout</button>
        </div>
      ) : (
        <h1>Your shopping Cart is Empty</h1>
      )}
    </div>
  );
};

export default CheckoutPage;
