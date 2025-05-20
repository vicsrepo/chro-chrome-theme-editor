import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdvancedTab = () => {
  const { theme, updateTheme } = useTheme();
  const { t } = useLanguage();
  
  const handleThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTheme({ themeName: e.target.value });
  };
  
  return (
    <div>
      <div className="mb-6">
        <Label htmlFor="theme-name" className="text-white font-medium mb-2 block">
          {t("themeName")}
        </Label>
        <Input
          id="theme-name"
          value={theme.themeName}
          onChange={handleThemeNameChange}
          className="bg-neutral-darkest border-neutral-medium text-white"
          placeholder="Chro Chrome Theme"
        />
      </div>
      
      {/* Theme preview details */}
      <div className="bg-neutral-darkest rounded-lg p-4 mb-6">
        <h3 className="text-white font-medium mb-3">Theme Preview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-neutral-light text-sm">Frame Color</span>
            <code className="text-xs font-mono bg-black bg-opacity-30 rounded px-2 py-1 mt-1">
              {theme.colors.frame}
            </code>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-light text-sm">Tab Color</span>
            <code className="text-xs font-mono bg-black bg-opacity-30 rounded px-2 py-1 mt-1">
              {theme.colors.tab}
            </code>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-light text-sm">Toolbar Color</span>
            <code className="text-xs font-mono bg-black bg-opacity-30 rounded px-2 py-1 mt-1">
              {theme.colors.toolbar}
            </code>
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-light text-sm">Text Color</span>
            <code className="text-xs font-mono bg-black bg-opacity-30 rounded px-2 py-1 mt-1">
              {theme.colors.text}
            </code>
          </div>
        </div>
        
        {theme.background?.image && (
          <div className="mt-4">
            <span className="text-neutral-light text-sm">Background</span>
            <div className="mt-1 flex items-center">
              <div 
                className="w-8 h-8 rounded-full mr-2 bg-cover bg-center"
                style={{ backgroundImage: `url(${theme.background.image})` }}
              ></div>
              <span className="text-xs text-neutral-medium">
                {theme.background.position || "center"} 
                {theme.background.blurRadius ? `, blur ${theme.background.blurRadius}px` : ""}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedTab;
