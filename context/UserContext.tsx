"use client"

import { User } from "@/types"
import { createContext, useState, ReactNode, useContext } from "react"


type UserContextType = {
  user: User[] | null
  setUser: React.Dispatch<React.SetStateAction<User[] | null>>
}
export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User[] | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}