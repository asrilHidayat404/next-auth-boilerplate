"use client"
import { useTheme } from '@/hooks/useTheme'
import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { SidebarMenuAction, SidebarMenuButton } from './ui/sidebar'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <SidebarMenuButton
      onClick={toggleTheme}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </SidebarMenuButton>
  )
}

export default ThemeButton
