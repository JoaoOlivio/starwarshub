"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import LocaleSwitcher from "../translate/LocaleSwitcher"
import Image from "next/image"
import Imagem from '@/assets/logo.png'

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center">
        <Image src={Imagem} alt="logo" className="h-12 w-auto transition duration-300 ease-in-out invert-on-light"/>
      </div>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  </header>
  )
}

