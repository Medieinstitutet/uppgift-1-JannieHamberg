import { PropsWithChildren, createContext, useContext, useEffect, useState} from "react"
import React from "react"

interface Category {
    _id: string;
    name: string;
    description: string;
    
  }
  
  export interface Product {
    _id: string;
    name: string;
    description: string;
    image: string; 
    amountInStock: number;
    price: number;
    category: Category; 
   
  }
  
  interface CartItem {
    product: Product;
    quantity: number;
  }
  
  interface ICartContext {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    calculateTotal: () => string;
    clearCart: () => void;
  }
  
  const initialValue: ICartContext = {
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    calculateTotal: () => '0',
    clearCart: () => {}
  };
  
  const CartContext = createContext<ICartContext>(initialValue);
  
  export const useCart = () => useContext(CartContext);
  
  const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
      const lsData = localStorage.getItem('cart');
      return lsData ? JSON.parse(lsData) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
  
    const addToCart = (product: Product) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.product._id === product._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { product, quantity: 1 }];
        }
      });
    };
  
    const removeFromCart = (productId: string) => {
      setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
    };
  
    const updateQuantity = (productId: string, quantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.product._id === productId) {
            return { ...item, quantity: Math.max(0, quantity) };
          }
          return item;
        })
      );
    };
  
    const calculateTotal = (): string => {
      return cart
        .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
        .toFixed(2); 
    };
  
    const clearCart = () => {
      setCart([]);
      localStorage.removeItem('cart');
    };
  
    return (
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          updateQuantity,
          calculateTotal,
          clearCart
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  export default CartProvider;

