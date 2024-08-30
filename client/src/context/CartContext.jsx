import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(undefined);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const calculateCartValue = useMemo(() => {
    if (cart.length === 0) return 0;
    return cart.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  }, [cart]);

  const updateCart = (id, quantity) => {
    const updatedCart = cart
      .map((item) => {
        if (item.productId === id) {
          const newQuantity = item.quantity + quantity;
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          }
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        calculateCartValue,
        updateCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

export { CartContextProvider, useCart };
