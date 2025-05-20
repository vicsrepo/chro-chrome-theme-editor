import { useContext } from 'react';
import { ThemeContext } from '@/lib/theme-context';

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeSettings must be used within a ThemeSettingsProvider');
  }
  
  return context;
};
