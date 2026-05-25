import React, { createContext, useContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coffee } from "../types";

type CoffeeContextType = {
  all: Coffee[];
  favorites: Coffee[];
  orders: Coffee[];

  setAll: (data: Coffee[]) => void;

  addFavorite: (coffee: Coffee) => void;
  removeFavorite: (id: number) => void;

  addOrder: (coffee: Coffee) => void;
  removeOrder: (id: number) => void;

  updateCoffee: (id: number, coffee: Coffee) => void;

  updateOrderQuantity: (id: number, quantity: number) => void;
};

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export function CoffeeProvider({ children }: { children: React.ReactNode }) {
  const [all, setAllState] = useState<Coffee[]>([]);
  const [favorites, setFavorites] = useState<Coffee[]>([]);
  const [orders, setOrders] = useState<Coffee[]>([]);

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    AsyncStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  async function loadStorage() {
    try {
      const favoritesData = await AsyncStorage.getItem("favorites");
      const ordersData = await AsyncStorage.getItem("orders");

      if (favoritesData) setFavorites(JSON.parse(favoritesData) || []);
      if (ordersData) setOrders(JSON.parse(ordersData) || []);
    } catch (e) {
      console.log("Storage error:", e);
    }
  }

  const setAll = (data: Coffee[]) => {
    const unique = data.filter(
      (item, index, arr) => arr.findIndex((i) => i.id === item.id) === index,
    );

    setAllState(unique);
  };

  const addFavorite = (coffee: Coffee) => {
    setFavorites((prev) =>
      prev.find((c) => c.id === coffee.id) ? prev : [...prev, coffee],
    );
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((c) => c.id !== id));
  };

  const addOrder = (coffee: Coffee) => {
    setOrders((prev) => {
      const exists = prev.find((c) => c.id === coffee.id);

      if (exists) {
        return prev.map((c) =>
          c.id === coffee.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c,
        );
      }

      return [...prev, { ...coffee, quantity: 1 }];
    });
  };

  const removeOrder = (id: number) => {
    setOrders((prev) => prev.filter((c) => c.id !== id));
  };

  const updateOrderQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setOrders((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    setOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const updateCoffee = (id: number, updatedCoffee: Coffee) => {
    setAllState((prev) => prev.map((c) => (c.id === id ? updatedCoffee : c)));
  };

  return (
    <CoffeeContext.Provider
      value={{
        all,
        favorites,
        orders,
        setAll,
        addFavorite,
        removeFavorite,
        addOrder,
        removeOrder,
        updateCoffee,
        updateOrderQuantity,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
}

export function useCoffee() {
  const context = useContext(CoffeeContext);

  if (!context) {
    throw new Error("useCoffee must be used inside CoffeeProvider");
  }

  return context;
}
