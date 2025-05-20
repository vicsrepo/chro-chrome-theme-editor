import React, { createContext, useContext, useState, useCallback } from "react";
import { DEFAULT_COLORS, COLOR_PALETTES } from "@/lib/constants";
import { exportTheme as exportThemeToZip } from "@/lib/theme-generator";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "./LanguageContext";

export interface ThemeColors {
  frame: string;
  tab: string;
  toolbar: string;
  text: string;
}

export interface ThemeBackground {
  image?: string;
  position?: 'center' | 'stretch' | 'tile';
  blurRadius?: number;
}

export interface Theme {
  colors: ThemeColors;
  background?: ThemeBackground;
  themeName: string;
}

interface ThemeContextType {
  theme: Theme;
  updateTheme: (partialTheme: Partial<Theme>) => void;
  resetTheme: () => void;
  randomizeTheme: () => void;
  exportTheme: () => void;
}

const defaultTheme: Theme = {
  colors: { ...DEFAULT_COLORS },
  themeName: "Chro Chrome Theme",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const updateTheme = useCallback((partialTheme: Partial<Theme>) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...partialTheme,
      colors: {
        ...prevTheme.colors,
        ...(partialTheme.colors || {}),
      },
      background: {
        ...prevTheme.background,
        ...(partialTheme.background || {}),
      },
    }));
  }, []);
  
  const resetTheme = useCallback(() => {
    setTheme(defaultTheme);
    toast({
      title: "Theme Reset",
      description: "All colors have been reset to default values.",
    });
  }, [toast]);
  
  const randomizeTheme = useCallback(() => {
    const randomPalette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: { ...randomPalette },
    }));
    toast({
      title: "Random Theme",
      description: "A random color palette has been applied.",
    });
  }, [toast]);
  
  const exportTheme = useCallback(async () => {
    try {
      await exportThemeToZip(theme);
      toast({
        title: "Theme Exported",
        description: "Your theme has been exported and downloaded as a ZIP file.",
      });
    } catch (error) {
      console.error("Failed to export theme:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your theme. Please try again.",
        variant: "destructive",
      });
    }
  }, [theme, toast]);
  
  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, randomizeTheme, exportTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
