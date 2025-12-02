"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type NavContextType = {
  title: string;
  setTitle: (title: string) => void;
  right: ReactNode;
  setRight: (node: ReactNode) => void;
  showBack: boolean;
  setShowBack: (show: boolean) => void;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const NavigationContext = createContext<NavContextType>({
  title: "",
  setTitle: () => { },
  right: null,
  setRight: () => { },
  showBack: true,
  setShowBack: () => { },
  isVisible: true,
  setIsVisible: () => { },
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");
  const [right, setRight] = useState<ReactNode>(null);
  const [showBack, setShowBack] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <NavigationContext.Provider value={{
      title, setTitle,
      right, setRight,
      showBack, setShowBack,
      isVisible, setIsVisible
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
