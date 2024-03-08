import { createContext, useState } from "react";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
};
export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState<{ string: number } | object>({});

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

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};