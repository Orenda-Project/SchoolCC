import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { analytics } from "@/lib/analytics";

export function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    analytics.ui.themeToggled(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      data-testid="button-theme-toggle"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </Button>
  );
}
