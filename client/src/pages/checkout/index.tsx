import { useContext } from "react";
import useGetProducts from "../../hooks/useGetProducts";
import { IShopContext, ShopContext } from "../../context/shop-context";
import CartItem from "../../components/cart-item";
import "./styles.css";
import { useNavigate, Navigate } from "react-router-dom";

const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  const totalAmount = getTotalCartAmount();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="cart">
      <div>
        {totalAmount > 0 ? (
          <>
            <h1>Your Cart Items</h1>
            <h2 className="total-cost">
              Total cost: ${totalAmount.toFixed(2)}
            </h2>
          </>
        ) : (
          <></>
        )}
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
          <button
            className="redirect-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
          <button className="redirect-button" type="button" onClick={checkout}>
            Checkout
          </button>
        </div>
      ) : (
        <>
          <h2>Your shopping Cart is Empty</h2>
          <button
            className="redirect-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Go shopping
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
