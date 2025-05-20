import { Theme } from "@/lib/theme";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdvancedControlsProps {
  theme: Theme;
  onThemeChange: (updates: Partial<Theme>) => void;
  language: "en" | "cz";
}

export default function AdvancedControls({ 
  theme, 
  onThemeChange,
  language
}: AdvancedControlsProps) {
  const translations = {
    themeName: {
      en: "Theme Name",
      cz: "Název motivu"
    },
    themeNamePlaceholder: {
      en: "My Awesome Theme",
      cz: "Můj skvělý motiv"
    },
    themeId: {
      en: "Theme ID",
      cz: "ID motivu"
    },
    customCss: {
      en: "Custom CSS",
      cz: "Vlastní CSS"
    },
    customCssPlaceholder: {
      en: "/* Advanced users can add custom CSS here */",
      cz: "/* Pokročilí uživatelé mohou přidat vlastní CSS */",
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Name */}
      <div>
        <Label htmlFor="theme-name" className="text-white font-medium block mb-2">
          {translations.themeName[language]}
        </Label>
        <Input 
          id="theme-name"
          value={theme.name || ''}
          onChange={(e) => onThemeChange({ name: e.target.value })}
          placeholder={translations.themeNamePlaceholder[language]}
          className="bg-background border-muted-foreground text-white"
        />
      </div>
      
      {/* Theme ID (read-only) */}
      <div>
        <Label htmlFor="theme-id" className="text-white font-medium block mb-2">
          {translations.themeId[language]}
        </Label>
        <Input 
          id="theme-id"
          value={theme.id || ''}
          readOnly
          className="bg-background border-muted-foreground text-white opacity-70"
        />
      </div>
      
      {/* Custom CSS */}
      <div>
        <Label htmlFor="custom-css" className="text-white font-medium block mb-2">
          {translations.customCss[language]}
        </Label>
        <Textarea 
          id="custom-css"
          value={theme.customCss || ''}
          onChange={(e) => onThemeChange({ customCss: e.target.value })}
          placeholder={translations.customCssPlaceholder[language]}
          className="font-mono bg-background border-muted-foreground text-white h-40"
        />
      </div>
    </div>
  );
}
