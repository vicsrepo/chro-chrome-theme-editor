import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "./ColorPicker";
import BackgroundSettings from "./BackgroundSettings";
import { colorPalettes } from "@/lib/colorPalettes";

interface ControlPanelProps {
  colors: {
    frame: string;
    tab: string;
    toolbar: string;
    text: string;
  };
  updateColor: (type: keyof typeof colors, color: string) => void;
  syncTabFrame: boolean;
  setSyncTabFrame: (value: boolean) => void;
  activeTab: "colors" | "background" | "advanced";
  setActiveTab: (tab: "colors" | "background" | "advanced") => void;
  backgroundImage: string | null;
  handleImageUpload: (file: File) => void;
  bgSettings: {
    position: string;
    blur: number;
  };
  setBgSettings: React.Dispatch<React.SetStateAction<{
    position: string;
    blur: number;
  }>>;
  t: (key: string) => string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  colors,
  updateColor,
  syncTabFrame,
  setSyncTabFrame,
  activeTab,
  setActiveTab,
  backgroundImage,
  handleImageUpload,
  bgSettings,
  setBgSettings,
  t
}) => {
  const handleColorSuggestionClick = (color: string) => {
    // Apply to currently selected tab
    if (activeTab === "colors") {
      updateColor("frame", color);
    }
  };

  return (
    <div className="w-full lg:w-1/2 order-1 lg:order-2">
      <div className="bg-[#395054] rounded-lg shadow-xl overflow-hidden">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <TabsList className="flex border-b border-[#1F3A41] bg-transparent w-full rounded-none">
            <TabsTrigger 
              value="colors"
              className="px-6 py-4 font-medium focus:outline-none data-[state=active]:text-[#1DF5D7] data-[state=active]:border-b-2 data-[state=active]:border-[#1DF5D7] data-[state=inactive]:text-white data-[state=inactive]:opacity-70 rounded-none bg-transparent"
            >
              {t("controls.tabs.colors")}
            </TabsTrigger>
            <TabsTrigger 
              value="background"
              className="px-6 py-4 font-medium focus:outline-none data-[state=active]:text-[#1DF5D7] data-[state=active]:border-b-2 data-[state=active]:border-[#1DF5D7] data-[state=inactive]:text-white data-[state=inactive]:opacity-70 rounded-none bg-transparent"
            >
              {t("controls.tabs.background")}
            </TabsTrigger>
            <TabsTrigger 
              value="advanced"
              className="px-6 py-4 font-medium focus:outline-none data-[state=active]:text-[#1DF5D7] data-[state=active]:border-b-2 data-[state=active]:border-[#1DF5D7] data-[state=inactive]:text-white data-[state=inactive]:opacity-70 rounded-none bg-transparent"
            >
              {t("controls.tabs.advanced")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="p-6">
            {/* Frame Color */}
            <ColorPicker 
              label={t("controls.frameColor")}
              color={colors.frame}
              onChange={(color) => updateColor("frame", color)}
            />
            
            {/* Tab Color */}
            <ColorPicker 
              label={t("controls.tabColor")}
              color={colors.tab}
              onChange={(color) => updateColor("tab", color)}
              disabled={syncTabFrame}
            >
              <div className="mt-2 flex items-center">
                <input 
                  type="checkbox" 
                  id="sync-tab-frame" 
                  className="mr-2"
                  checked={syncTabFrame}
                  onChange={(e) => setSyncTabFrame(e.target.checked)}
                />
                <label htmlFor="sync-tab-frame" className="text-sm text-[#E5E7EB]">
                  {t("controls.syncWithFrame")}
                </label>
              </div>
            </ColorPicker>
            
            {/* Toolbar Color */}
            <ColorPicker 
              label={t("controls.toolbarColor")}
              color={colors.toolbar}
              onChange={(color) => updateColor("toolbar", color)}
            />
            
            {/* Text Color */}
            <ColorPicker 
              label={t("controls.textColor")}
              color={colors.text}
              onChange={(color) => updateColor("text", color)}
            />
            
            {/* Color Suggestions */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">{t("controls.suggestedColors")}</h3>
              <div className="grid grid-cols-5 gap-2">
                {colorPalettes.flatMap(palette => [
                  palette.frame,
                  palette.tab
                ]).concat(["#FFFFFF"]).map((color, index) => (
                  <button 
                    key={index}
                    className="w-full aspect-square rounded"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSuggestionClick(color)}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="background" className="p-6">
            <BackgroundSettings 
              backgroundImage={backgroundImage}
              handleImageUpload={handleImageUpload}
              bgSettings={bgSettings}
              setBgSettings={setBgSettings}
              t={t}
            />
          </TabsContent>

          <TabsContent value="advanced" className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-white font-medium block mb-2">{t("controls.advanced.themeName")}</label>
                <input 
                  type="text" 
                  className="w-full bg-[#1F3A41] border border-[#737D78] rounded px-3 py-2 text-white"
                  placeholder="My Chrome Theme"
                />
              </div>
              
              <div>
                <label className="text-white font-medium block mb-2">{t("controls.advanced.themeDescription")}</label>
                <textarea 
                  className="w-full bg-[#1F3A41] border border-[#737D78] rounded px-3 py-2 text-white h-24"
                  placeholder={t("controls.advanced.themeDescriptionPlaceholder")}
                />
              </div>
              
              <div>
                <label className="text-white font-medium block mb-2">{t("controls.advanced.themeAuthor")}</label>
                <input 
                  type="text" 
                  className="w-full bg-[#1F3A41] border border-[#737D78] rounded px-3 py-2 text-white"
                  placeholder={t("controls.advanced.themeAuthorPlaceholder")}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ControlPanel;
