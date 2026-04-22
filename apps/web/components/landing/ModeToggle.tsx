import { useCallback, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"
import { Button } from "@workspace/ui/components/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    // Determine target theme based on current effective theme
    const root = window.document.documentElement
    const isDark = root.classList.contains("dark")
    setTheme(isDark ? "light" : "dark")
  }, [setTheme])

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
  }, [theme, toggleTheme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="bg-brand-surface border-ui-border hover:bg-brand-surface/80 relative h-10 w-10 rounded-full border transition-all duration-300"
      title="Toggle theme (D)"
    >
      <Sun className="text-ui-text h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="text-ui-text-muted absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
