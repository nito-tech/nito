"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(() => (theme === "light" ? "dark" : "light"));
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
