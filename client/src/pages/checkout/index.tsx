import { useContext } from "react";
import useGetProducts from "../../hooks/useGetProducts";
import { IShopContext, ShopContext } from "../../context/shop-context";
import CartItem from "./cart-item";
import "./styles.css";

const CheckoutPage = () => {
  const { getCartItemCount } = useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();

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
    </div>
  );
};

export default CheckoutPage;
