import useGetProducts from "../../hooks/useGetProducts";
import Product from "./product";
import "./styles.css";

const ShopPage = () => {
  const { products } = useGetProducts();
  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
