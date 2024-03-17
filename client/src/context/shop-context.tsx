import { createContext, useState, useEffect } from "react";
import useGetProducts from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import { useGetToken } from "../hooks/useGetToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};
export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ string: number } | object>({});
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );

  const { products } = useGetProducts();
  const { headers } = useGetToken();
  const navigate = useNavigate();

  const fetchAvailableMoney = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const res = await axios(
        `https://mern-ecommerce-page.onrender.com/user/available-money/${userID}`,
        { headers }
      );

      setAvailableMoney(res.data.availableMoney);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPurchasedItems = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const res = await axios(
        `https://mern-ecommerce-page.onrender.com/product/purchased-items/${userID}`,
        { headers }
      );

      setPurchasedItems(res.data.purchasedItems);
    } catch (err) {
      console.log(err);
    }
  };

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }

    return 0;
  };
  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prevState) => ({ ...prevState, [itemId]: 1 }));
    } else {
      setCartItems((prevState) => ({
        ...prevState,
        [itemId]: prevState[itemId] + 1,
      }));
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: prevState[itemId] - 1,
    }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;
    setCartItems((prevState) => ({ ...prevState, [itemId]: newAmount }));
  };

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo: IProduct = products.find(
          (product) => product._id === item
        );
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const checkout = async () => {
    const body = {
      customerID: localStorage.getItem("userID"),
      cartItems,
    };

    try {
      await axios.post(
        "https://mern-ecommerce-page.onrender.com/product/checkout",
        body,
        {
          headers,
        }
      );

      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      navigate("/");
    } catch (err) {
      console.log(err.response.data.type);
      alert(err.response.data.type);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
    }
  }, [isAuthenticated]);

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
