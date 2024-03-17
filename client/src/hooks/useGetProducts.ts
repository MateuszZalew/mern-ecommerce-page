import { useState, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../models/interfaces";

const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios(
        "https://mern-ecommerce-page.onrender.com/product"
      );
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      alert("ERROR: Something went wrong.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};

export default useGetProducts;
