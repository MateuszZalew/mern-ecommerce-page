import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

interface Props {
  product: IProduct;
}

const CartItem = (props: Props) => {
  const { _id, productName, price, imageURL } = props.product;
  const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div className="cart-item">
      <img src={imageURL} alt={productName} />
      <div className="description">
        <h3>{productName}</h3>
        <p>Price: ${price}</p>

        <div className="count-handler">
          <button onClick={() => removeFromCart(_id)} className="minus">
            -
          </button>
          <input
            type="number"
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
          />
          <button onClick={() => addToCart(_id)} className="plus">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
