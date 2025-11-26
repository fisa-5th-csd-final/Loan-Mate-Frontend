"use client";

import { createContext, useContext, useState } from "react";

type NavContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const NavigationContext = createContext<NavContextType>({
  title: "",
  setTitle: () => {},
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");

  return (
    <NavigationContext.Provider value={{ title, setTitle }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
