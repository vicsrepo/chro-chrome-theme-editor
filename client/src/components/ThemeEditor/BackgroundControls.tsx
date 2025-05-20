import { useState, useRef } from "react";
import { Theme } from "@/lib/theme";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface BackgroundControlsProps {
  theme: Theme;
  onThemeChange: (updates: Partial<Theme>) => void;
  language: "en" | "cz";
}

export default function BackgroundControls({ 
  theme, 
  onThemeChange,
  language
}: BackgroundControlsProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const translations = {
    backgroundImage: {
      en: "Background Image",
      cz: "Background Image"
    },
    dragDropImage: {
      en: "Drag & drop image here",
      cz: "Drag & drop image here"
    },
    clickToBrowse: {
      en: "or click to browse (PNG, JPG)",
      cz: "or click to browse (PNG, JPG)"
    },
    positioning: {
      en: "Positioning",
      cz: "Positioning"
    },
    center: {
      en: "Center",
      cz: "Center"
    },
    stretch: {
      en: "Stretch",
      cz: "Stretch"
    },
    tile: {
      en: "Tile",
      cz: "Tile"
    },
    blurEffect: {
      en: "Blur Effect",
      cz: "Blur Effect"
    },
    backgroundColor: {
      en: "Background Color",
      cz: "Background Color"
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.match('image.*')) {
      alert('Please select an image file (PNG or JPG)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onThemeChange({ 
          backgroundType: 'image',
          backgroundImage: e.target.result as string 
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    handleFiles(e.dataTransfer.files);
  };

  const handlePositionChange = (value: string) => {
    onThemeChange({ backgroundPosition: value as 'center' | 'stretch' | 'tile' });
  };

  const handleBlurChange = (value: number[]) => {
    onThemeChange({ backgroundBlur: value[0] });
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onThemeChange({ 
      backgroundType: 'color',
      backgroundColor: e.target.value 
    });
  };

  return (
    <div>
      <h3 className="text-white font-medium mb-3">
        {translations.backgroundImage[language]}
      </h3>
      
      {/* Image Upload */}
      <div 
        className={`bg-background border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition-colors mb-4 ${dragActive ? 'border-secondary bg-muted' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 mx-auto text-muted-foreground mb-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
          />
        </svg>
        <p className="text-gray-300 mb-1">{translations.dragDropImage[language]}</p>
        <p className="text-xs text-muted-foreground">{translations.clickToBrowse[language]}</p>
        <Input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          id="bg-upload" 
          accept="image/png,image/jpeg"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Background Color Picker */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <Label className="text-white font-medium">
            {translations.backgroundColor[language]}
          </Label>
          <span className="text-xs font-mono bg-background px-2 py-1 rounded">
            {theme.backgroundColor}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="color-picker-wrapper flex-1">
            <input 
              type="color" 
              id="bg-color"
              value={theme.backgroundColor}
              onChange={handleBackgroundColorChange}
              className="rounded"
            />
          </div>
          <div 
            className="color-preview w-10 h-10 rounded"
            style={{ backgroundColor: theme.backgroundColor }}
          ></div>
        </div>
      </div>
      
      {/* Options */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-white text-sm block mb-1">
            {translations.positioning[language]}
          </Label>
          <Select 
            value={theme.backgroundPosition}
            onValueChange={handlePositionChange}
          >
            <SelectTrigger className="w-full bg-background border border-muted-foreground text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">{translations.center[language]}</SelectItem>
              <SelectItem value="stretch">{translations.stretch[language]}</SelectItem>
              <SelectItem value="tile">{translations.tile[language]}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-white text-sm block mb-1">
            {translations.blurEffect[language]}
          </Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[theme.backgroundBlur]}
              min={0}
              max={20}
              step={1}
              onValueChange={handleBlurChange}
              className="flex-1"
            />
            <span className="text-white">{theme.backgroundBlur}px</span>
          </div>
        </div>
      </div>
    </div>
  );
}
