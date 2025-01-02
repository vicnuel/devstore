"use client";
import React, { createContext } from "react";

type CardItem = {
  productId: number;
  quantity: number;
};

type CardContextType = {
  items: CardItem[];
  addCard: (productId: number) => void;
  removeCard: (productId: number) => void;
};

export const CardContext = createContext<CardContextType>({
  items: [],
  addCard: () => {},
  removeCard: () => {},
});

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CardItem[]>([]);

  const addCard = (productId: number) => {
    setItems((state) => {
      const item = state.find((item) => item.productId === productId);
      if (item) {
        return state.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { productId, quantity: 1 }];
    });
  };

  const removeCard = (productId: number) => {
    setItems(items.filter((item) => item.productId !== productId));
  };

  return (
    <CardContext.Provider value={{ items, addCard, removeCard }}>
      {children}
    </CardContext.Provider>
  );
}
