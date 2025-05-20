import { Theme } from "@/lib/theme";
import { suggestionColors } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ColorControlsProps {
  theme: Theme;
  onThemeChange: (updates: Partial<Theme>) => void;
  syncTabWithFrame: boolean;
  onSyncChange: (sync: boolean) => void;
  language: "en" | "cz";
}

export default function ColorControls({ 
  theme, 
  onThemeChange, 
  syncTabWithFrame, 
  onSyncChange,
  language
}: ColorControlsProps) {
  const translations = {
    frameColor: {
      en: "Frame Color",
      cz: "Frame Color"
    },
    tabColor: {
      en: "Tab Color",
      cz: "Tab Color"
    },
    toolbarColor: {
      en: "Toolbar Color",
      cz: "Toolbar Color"
    },
    textColor: {
      en: "Text Color",
      cz: "Text Color"
    },
    syncTabFrame: {
      en: "Synchronize with frame color",
      cz: "Synchronize with frame color"
    },
    suggestedColors: {
      en: "Suggested Colors",
      cz: "Suggested Colors"
    }
  };

  const handleColorChange = (
    key: 'frame' | 'tab' | 'toolbar' | 'text',
    color: string
  ) => {
    onThemeChange({ [key]: color });
  };

  return (
    <div>
      {/* Frame Color */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-white font-medium">
            {translations.frameColor[language]}
          </Label>
          <span className="text-xs font-mono bg-background px-2 py-1 rounded">
            {theme.frame}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="color-picker-wrapper flex-1">
            <input 
              type="color" 
              value={theme.frame}
              onChange={(e) => handleColorChange('frame', e.target.value)}
              className="rounded"
            />
          </div>
          <div 
            className="color-preview w-10 h-10 rounded"
            style={{ backgroundColor: theme.frame }}
          ></div>
        </div>
      </div>

      {/* Tab Color */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-white font-medium">
            {translations.tabColor[language]}
          </Label>
          <span className="text-xs font-mono bg-background px-2 py-1 rounded">
            {theme.tab}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="color-picker-wrapper flex-1">
            <input 
              type="color" 
              value={theme.tab}
              onChange={(e) => handleColorChange('tab', e.target.value)}
              className="rounded"
              disabled={syncTabWithFrame}
            />
          </div>
          <div 
            className="color-preview w-10 h-10 rounded"
            style={{ backgroundColor: theme.tab }}
          ></div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Checkbox 
            id="sync-tab-frame" 
            checked={syncTabWithFrame}
            onCheckedChange={(checked) => {
              onSyncChange(checked === true);
              if (checked) {
                handleColorChange('tab', theme.frame);
              }
            }}
          />
          <Label 
            htmlFor="sync-tab-frame" 
            className="text-sm text-gray-300 cursor-pointer"
          >
            {translations.syncTabFrame[language]}
          </Label>
        </div>
      </div>

      {/* Toolbar Color */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-white font-medium">
            {translations.toolbarColor[language]}
          </Label>
          <span className="text-xs font-mono bg-background px-2 py-1 rounded">
            {theme.toolbar}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="color-picker-wrapper flex-1">
            <input 
              type="color" 
              value={theme.toolbar}
              onChange={(e) => handleColorChange('toolbar', e.target.value)}
              className="rounded"
            />
          </div>
          <div 
            className="color-preview w-10 h-10 rounded"
            style={{ backgroundColor: theme.toolbar }}
          ></div>
        </div>
      </div>

      {/* Text Color */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-white font-medium">
            {translations.textColor[language]}
          </Label>
          <span className="text-xs font-mono bg-background px-2 py-1 rounded">
            {theme.text}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="color-picker-wrapper flex-1">
            <input 
              type="color" 
              value={theme.text}
              onChange={(e) => handleColorChange('text', e.target.value)}
              className="rounded"
            />
          </div>
          <div 
            className="color-preview w-10 h-10 rounded"
            style={{ backgroundColor: theme.text }}
          ></div>
        </div>
      </div>

      {/* Color Suggestions */}
      <div className="mb-6">
        <h3 className="text-white font-medium mb-3">
          {translations.suggestedColors[language]}
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {suggestionColors.map((color, index) => (
            <button
              key={index}
              className="w-full aspect-square rounded hover:ring-2 hover:ring-secondary transition-all"
              style={{ backgroundColor: color }}
              onClick={() => {
                // Apply to the most recently focused input, or default to frame
                const activeElement = document.activeElement;
                if (activeElement && activeElement.id) {
                  const inputId = activeElement.id;
                  if (inputId === 'frame-color') {
                    handleColorChange('frame', color);
                  } else if (inputId === 'tab-color') {
                    handleColorChange('tab', color);
                  } else if (inputId === 'toolbar-color') {
                    handleColorChange('toolbar', color);
                  } else if (inputId === 'text-color') {
                    handleColorChange('text', color);
                  } else {
                    handleColorChange('frame', color);
                  }
                } else {
                  handleColorChange('frame', color);
                }
              }}
              aria-label={`Apply color ${color}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
