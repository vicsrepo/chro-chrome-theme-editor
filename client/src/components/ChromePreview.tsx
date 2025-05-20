import React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  X, 
  Plus, 
  Bookmark, 
  EyeOff, 
  Settings, 
  MoreVertical,
  Home,
  Palette
} from "lucide-react";

interface ChromePreviewProps {
  colors: {
    frame: string;
    tab: string;
    toolbar: string;
    text: string;
  };
  backgroundImage: string | null;
  bgSettings: {
    position: string;
    blur: number;
  };
  t: (key: string) => string;
}

const ChromePreview: React.FC<ChromePreviewProps> = ({ 
  colors, 
  backgroundImage,
  bgSettings,
  t
}) => {
  // Create background style
  const getBackgroundStyle = () => {
    if (!backgroundImage) return { backgroundColor: "#1F3A41" };
    
    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: bgSettings.position,
      backgroundSize: bgSettings.position === "stretch" ? "cover" : "auto",
      backgroundRepeat: bgSettings.position === "tile" ? "repeat" : "no-repeat",
      filter: bgSettings.blur > 0 ? `blur(${bgSettings.blur}px)` : "none",
    };
  };

  return (
    <div id="chrome-preview" className="overflow-hidden rounded shadow-lg">
      {/* Chrome Window Frame */}
      <div 
        id="frame" 
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: colors.frame }}
      >
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-black bg-opacity-30 rounded h-6 max-w-md mx-auto flex items-center justify-center">
            <span className="text-xs text-white opacity-70">chrome://chro-chrome/</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <span className="h-4 w-4">—</span>
          <span className="h-4 w-4">□</span>
          <X className="h-4 w-4" />
        </div>
      </div>
      
      {/* Tabs Bar */}
      <div 
        id="tabs-bar" 
        className="flex items-end px-2 pt-2"
        style={{ backgroundColor: colors.frame }}
      >
        {/* Inactive Tab */}
        <div className="chrome-tab-curve mr-1 px-4 py-1 flex items-center opacity-80"
             style={{ backgroundColor: colors.frame, filter: "brightness(0.8)" }}>
          <Home className="h-4 w-4 mr-2 text-white" />
          <span className="text-xs" style={{ color: colors.text }}>
            {t("preview.newTab")}
          </span>
        </div>
        
        {/* Active Tab */}
        <div 
          id="active-tab" 
          className="chrome-tab-curve px-4 py-2 flex items-center"
          style={{ backgroundColor: colors.tab }}
        >
          <Palette className="h-4 w-4 mr-2 text-white" />
          <span className="text-xs" style={{ color: colors.text }}>
            {t("preview.chromeThemeEditor")}
          </span>
          <X className="h-4 w-4 ml-2" />
        </div>
        
        {/* New Tab Button */}
        <div className="ml-1 p-2">
          <Plus className="h-4 w-4 text-white" />
        </div>
      </div>
      
      {/* Toolbar */}
      <div 
        id="toolbar" 
        className="px-4 py-3 flex items-center"
        style={{ backgroundColor: colors.toolbar }}
      >
        <div className="flex items-center space-x-4">
          <ChevronLeft className="h-5 w-5 text-white" />
          <ChevronRight className="h-5 w-5 text-white opacity-50" />
          <RefreshCw className="h-5 w-5 text-white" />
        </div>
        
        <div className="flex-1 mx-4">
          <div className="bg-white bg-opacity-10 rounded-full px-4 py-1 flex items-center">
            <EyeOff className="h-4 w-4 text-white mr-2" />
            <span className="text-sm opacity-80" style={{ color: colors.text }}>chrome://chro-chrome</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Bookmark className="h-5 w-5 text-white" />
          <Settings className="h-5 w-5 text-white" />
          <MoreVertical className="h-5 w-5 text-white" />
        </div>
      </div>
      
      {/* Content Area (New Tab) */}
      <div 
        id="content-area" 
        className="h-64 flex items-center justify-center"
        style={getBackgroundStyle()}
      >
        <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg">
          <div className="text-[#1DF5D7] text-5xl mb-4">🎨</div>
          <h3 className="text-xl text-white font-medium mb-2">Chro Chrome Theme Editor</h3>
          <p className="text-[#E5E7EB] text-sm max-w-md">{t("preview.tagline")}</p>
        </div>
      </div>
    </div>
  );
};

export default ChromePreview;
