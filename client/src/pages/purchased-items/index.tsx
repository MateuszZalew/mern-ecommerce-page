import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Navigate } from "react-router-dom";
import "./styles.css";

const PurchasedItemsPage = () => {
  const { purchasedItems, getCartItemCount, addToCart } =
    useContext<IShopContext>(ShopContext);
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="purchased-items-page">
      <h1>Previously Purchased Items</h1>
      <div className="purchased-items">
        {purchasedItems.map((item) => {
          const { _id, productName, imageURL, price } = item;
          const count = getCartItemCount(_id);
          return (
            <div className="item" key={_id}>
              <h3>{productName}</h3>
              <img src={imageURL} alt={productName} />
              <p>$ {price}</p>
              <button onClick={() => addToCart(_id)}>
                Purchase Again {count > 0 && <>({count})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchasedItemsPage;
