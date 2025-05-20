import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ColorPicker from "./ColorPicker";
import { SUGGESTED_COLORS } from "@/lib/constants";

const ColorTab = () => {
  const { theme, updateTheme } = useTheme();
  const { t } = useLanguage();
  
  const [syncWithFrame, setSyncWithFrame] = useState(false);
  
  // Update tab color when frame color changes if sync is enabled
  useEffect(() => {
    if (syncWithFrame) {
      updateTheme({ colors: { ...theme.colors, tab: theme.colors.frame } });
    }
  }, [syncWithFrame, theme.colors.frame, updateTheme]);
  
  const handleFrameColorChange = (color: string) => {
    const updatedColors = { ...theme.colors, frame: color };
    
    // If sync is enabled, also update tab color
    if (syncWithFrame) {
      updatedColors.tab = color;
    }
    
    updateTheme({ colors: updatedColors });
  };
  
  const handleColorChange = (colorType: 'frame' | 'tab' | 'toolbar' | 'text', color: string) => {
    if (colorType === 'frame') {
      handleFrameColorChange(color);
    } else {
      updateTheme({ colors: { ...theme.colors, [colorType]: color } });
    }
  };
  
  const handleSuggestedColorClick = (color: string) => {
    // Apply to frame by default (or active input)
    handleFrameColorChange(color);
  };
  
  return (
    <div>
      {/* Frame Color */}
      <ColorPicker
        label={t("frameColor")}
        color={theme.colors.frame}
        onChange={(color) => handleColorChange('frame', color)}
      />
      
      {/* Tab Color */}
      <ColorPicker
        label={t("tabColor")}
        color={theme.colors.tab}
        onChange={(color) => handleColorChange('tab', color)}
        disabled={syncWithFrame}
      />
      <div className="mt-2 flex items-center mb-6">
        <Switch
          id="sync-tab-frame"
          checked={syncWithFrame}
          onCheckedChange={setSyncWithFrame}
          className="mr-2"
        />
        <Label htmlFor="sync-tab-frame" className="text-sm text-neutral-light cursor-pointer">
          {t("syncWithFrame")}
        </Label>
      </div>
      
      {/* Toolbar Color */}
      <ColorPicker
        label={t("toolbarColor")}
        color={theme.colors.toolbar}
        onChange={(color) => handleColorChange('toolbar', color)}
      />
      
      {/* Text Color */}
      <ColorPicker
        label={t("textColor")}
        color={theme.colors.text}
        onChange={(color) => handleColorChange('text', color)}
      />
      
      {/* Color Suggestions */}
      <div className="mb-6">
        <h3 className="text-white font-medium mb-3">{t("suggestedColors")}</h3>
        <div className="grid grid-cols-5 gap-2">
          {SUGGESTED_COLORS.map((color) => (
            <button
              key={color}
              className="w-full aspect-square rounded cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => handleSuggestedColorClick(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorTab;
