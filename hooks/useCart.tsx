'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { CartProductProps } from '@/config/types';

interface CartContextType {
  products: CartProductProps[];
  addToCart: (product: CartProductProps) => void;
  removeFromCart: (id: string) => void;
  totalAmount: number;
  isOpen: boolean;
  changeOpenState: (newType: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProductProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = (product: CartProductProps) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return [...prevProducts];
      } else {
        return [...prevProducts, { ...product }];
      }
    });
  };

  const changeOpenState = (newType: boolean) => {
    setIsOpen(newType);
  };

  const removeFromCart = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );
  };

  const totalAmount = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
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
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
