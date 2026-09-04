"use client";

import React from "react";
import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  variant?: "navbar" | "compact" | "mobile";
  className?: string;
}

export default function ThemeToggle({ variant = "navbar", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const targetTheme = isDark ? "light" : "dark";
  const actionLabel = isDark ? "LIGHT" : "DARK";

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg border border-border bg-surface text-xs font-mono">
        <span className="text-foreground-muted uppercase tracking-widest text-[10px]">
          Interface Theme
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded border border-border bg-surface-elevated text-accent hover:text-foreground transition-colors"
          aria-label={`Switch to ${targetTheme} theme`}
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-accent" />
          )}
          <span className="tracking-wider uppercase font-semibold text-[10px]">
            {actionLabel}
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`h-8 xl:h-8.5 inline-flex items-center space-x-1.5 px-2.5 xl:px-3 rounded-full border transition-all duration-300 select-none group ${
        isDark
          ? "border-white/15 hover:border-accent/60 bg-[#14171A]/90 hover:bg-[#1A1E24] text-[#CCC7BC] hover:text-white"
          : "border-border hover:border-accent/60 bg-surface-elevated/90 hover:bg-surface-muted text-foreground-secondary hover:text-foreground"
      } ${className}`}
      aria-label={`Switch to ${targetTheme} theme`}
      title={`Switch to ${targetTheme} theme`}
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 text-accent transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-accent transition-transform duration-300 group-hover:-rotate-12" />
      )}
      <span className="font-mono text-[9px] xl:text-[9.5px] uppercase tracking-[0.16em] font-medium">
        {actionLabel}
      </span>
    </button>
  );
}
