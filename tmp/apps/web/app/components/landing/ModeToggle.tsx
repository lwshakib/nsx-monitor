import { useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"
import { Button } from "@workspace/ui/components/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    // Determine target theme based on current effective theme
    const root = window.document.documentElement
    const isDark = root.classList.contains("dark")
    setTheme(isDark ? "light" : "dark")
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle theme when 'D' is pressed (case insensitive, skip if in input)
      if (
        e.key.toLowerCase() === "d" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-brand-surface border border-aura-border hover:bg-brand-surface/80 transition-all duration-300"
      title="Toggle theme (D)"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-aura-text" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-aura-text-muted" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
