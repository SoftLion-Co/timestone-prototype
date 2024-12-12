"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { CartProductProps } from "@/config/types";

interface CartContextType {
  products: CartProductProps[];
  addToCart: (product: CartProductProps, amount: number) => void;
  addQuantity: (productId: string) => void;
  removeQuantity: (productId: string) => void;
  removeFromCart: (id: string) => void;
  totalAmount: number;
  isOpen: boolean;
  changeOpenState: (newType: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProductProps[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("cartProducts");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }, [products]);

  const addToCart = (product: CartProductProps, amount: number) => {
    const existingProduct = products.find((item) => item.id === product.id);

    let newArr = [];

    if (existingProduct) {
      if (existingProduct.quantity < existingProduct.maxQuantity) {
        existingProduct.quantity += amount;
      }

      newArr = [...products];
    } else {
      newArr = [...products, { ...product }];
    }

    setProducts(newArr);
  };

  const addQuantity = (productId: string) => {
    const newProd = products.find((item) => item.id === productId);

    if (newProd && newProd.quantity < newProd.maxQuantity) {
      newProd.quantity += 1;
    }

    let newArr = [...products];

    setProducts(newArr);
  };

  const removeQuantity = (productId: string) => {
    const newProd = products.find((item) => item.id === productId);

    if (newProd && newProd.quantity > 1) {
      newProd.quantity -= 1;
    }

    let newArr = [...products];

    setProducts(newArr);
  };

  const changeOpenState = (newType: boolean) => {
    setIsOpen(newType);
  };

  const removeFromCart = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );
  };

  const totalAmount = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        addQuantity,
        removeQuantity,
        removeFromCart,
        totalAmount,
        isOpen,
        changeOpenState,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
