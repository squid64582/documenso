"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type NavigationItem = "chatspace" | "teamspaces" | "employees" | "files" | "workflows" | "integrations"

interface NavigationContextType {
  activeItem: NavigationItem
  setActiveItem: (item: NavigationItem) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeItem, setActiveItem] = useState<NavigationItem>("chatspace")

  return (
    <NavigationContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
