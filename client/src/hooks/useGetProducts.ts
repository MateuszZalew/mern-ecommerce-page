import { useState, useEffect } from "react";
import { IProduct } from "../models/interfaces";
import { toast } from "react-toastify";
import axios from "axios";

const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios(
        "https://mern-ecommerce-page.onrender.com/product"
      );
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      toast.error("ERROR: Something went wrong.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};

export default useGetProducts;
