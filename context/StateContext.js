import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const incQty = () => {
    setQty((prev) =>prev + 1);
  }

  const decQty = () => {
    setQty((prev) =>{
      if(prev - 1 < 1) return 1;
      return prev - 1;
    });
  }

  const onAdd = (product, quantity) => {

    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, {...product}])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  const toggleCartItemQuantity = (id, value) => {
    // find the product and its index in the cartItems array
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
  
    // create a copy of the cartItems array and sort it based on _id
    const sortedCartItems = [...cartItems].sort((a, b) => a._id.localeCompare(b._id));
  
    // perform quantity update
    if (value === 'inc') {
      sortedCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
      setCartItems(sortedCartItems);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        sortedCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
        setCartItems(sortedCartItems);
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantities((prev) => prev - 1);
      }
    }
  };
  

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setQty
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);