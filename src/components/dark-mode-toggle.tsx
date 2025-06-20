"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function DarkModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative h-9 w-9 rounded-full border border-border bg-background hover:bg-accent transition-all duration-300"
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
} 