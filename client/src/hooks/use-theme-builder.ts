import { useState, useCallback } from "react";
import { DEFAULT_COLORS, COLOR_PALETTES } from "@/lib/constants";
import { ThemeColors } from "@/contexts/ThemeContext";

export interface ThemeBuilderOptions {
  initialColors?: Partial<ThemeColors>;
  initialThemeName?: string;
}

export interface UseThemeBuilderReturn {
  colors: ThemeColors;
  themeName: string;
  updateColor: (colorType: keyof ThemeColors, value: string) => void;
  updateThemeName: (name: string) => void;
  resetColors: () => void;
  randomizeColors: () => void;
}

export const useThemeBuilder = (options: ThemeBuilderOptions = {}): UseThemeBuilderReturn => {
  const [colors, setColors] = useState<ThemeColors>({
    ...DEFAULT_COLORS,
    ...(options.initialColors || {}),
  });
  
  const [themeName, setThemeName] = useState<string>(
    options.initialThemeName || "Chro Chrome Theme"
  );
  
  const updateColor = useCallback((colorType: keyof ThemeColors, value: string) => {
    setColors((prevColors) => ({
      ...prevColors,
      [colorType]: value,
    }));
  }, []);
  
  const updateThemeName = useCallback((name: string) => {
    setThemeName(name);
  }, []);
  
  const resetColors = useCallback(() => {
    setColors(DEFAULT_COLORS);
  }, []);
  
  const randomizeColors = useCallback(() => {
    const randomPalette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    setColors(randomPalette);
  }, []);
  
  return {
    colors,
    themeName,
    updateColor,
    updateThemeName,
    resetColors,
    randomizeColors,
  };
};
