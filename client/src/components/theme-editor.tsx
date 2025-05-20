import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ColorPicker from "@/components/ui/color-picker";
import ImageUpload from "@/components/image-upload";
import { useThemeSettings } from "@/hooks/use-theme-settings";
import { generateThemeZip } from "@/lib/theme-generator";
import { SUGGESTED_COLORS } from "@/lib/constants";

export default function ThemeEditor() {
  const { toast } = useToast();
  const { themeSettings, setThemeSettings, resetThemeSettings, randomizeThemeSettings } = useThemeSettings();
  const [activeTab, setActiveTab] = useState("colors");
  
  // Handler for exporting the theme
  const handleExportTheme = async () => {
    try {
      await generateThemeZip(themeSettings);
      toast({
        title: "Motiv byl úspěšně exportován",
        description: "Váš motiv byl stažen jako ZIP soubor",
      });
    } catch (error) {
      toast({
        title: "Export selhal",
        description: "Při exportu motivu došlo k chybě",
        variant: "destructive",
      });
    }
  };

  // Handler for removing background image
  const handleRemoveImage = () => {
    setThemeSettings({
      ...themeSettings,
      backgroundImage: null
    });
  };

  return (
    <>
      <div className="bg-[#0F5072] rounded-lg shadow-xl p-6 border border-[#1DF5D7]/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-xl font-semibold text-white">Editor motivu</h2>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="border-[#1DF5D7]/20 bg-[#1F3A41] hover:bg-[#226F75] text-white transition-colors duration-200"
              onClick={resetThemeSettings}
            >
              <i className="fas fa-undo-alt mr-2"></i>
              <span>Reset</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-[#1DF5D7]/20 bg-[#109C70] hover:bg-[#109C70]/80 text-white transition-colors duration-200"
              onClick={randomizeThemeSettings}
            >
              <i className="fas fa-random mr-2"></i>
              <span>Náhodně</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="border-b border-[#395054] mb-6 bg-transparent w-full justify-start space-x-6">
            <TabsTrigger 
              value="colors" 
              className={`px-3 py-2 border-b-2 ${activeTab === 'colors' ? 'border-[#1DF5D7] text-[#1DF5D7]' : 'border-transparent text-white/70 hover:text-white'}`}
            >
              Barvy
            </TabsTrigger>
            <TabsTrigger 
              value="background" 
              className={`px-3 py-2 border-b-2 ${activeTab === 'background' ? 'border-[#1DF5D7] text-[#1DF5D7]' : 'border-transparent text-white/70 hover:text-white'}`}
            >
              Pozadí
            </TabsTrigger>
            <TabsTrigger 
              value="advanced" 
              className={`px-3 py-2 border-b-2 ${activeTab === 'advanced' ? 'border-[#1DF5D7] text-[#1DF5D7]' : 'border-transparent text-white/70 hover:text-white'}`}
            >
              Pokročilé
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            {/* Frame Color */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label className="text-white font-medium">Barva rámu</Label>
              <div className="md:col-span-2 flex items-center space-x-4">
                <ColorPicker 
                  color={themeSettings.frameColor} 
                  onChange={(color) => setThemeSettings({...themeSettings, frameColor: color})}
                />
                <div className="flex-1">
                  <Input 
                    type="text" 
                    value={themeSettings.frameColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, frameColor: e.target.value})}
                    className="bg-[#1F3A41] text-white border-[#395054]"
                  />
                </div>
              </div>
            </div>
            
            {/* Tab Color */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label className="text-white font-medium">Barva záložky</Label>
              <div className="md:col-span-2 flex items-center space-x-4">
                <ColorPicker 
                  color={themeSettings.tabColor} 
                  onChange={(color) => setThemeSettings({...themeSettings, tabColor: color})}
                />
                <div className="flex-1">
                  <Input 
                    type="text" 
                    value={themeSettings.tabColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, tabColor: e.target.value})}
                    className="bg-[#1F3A41] text-white border-[#395054]"
                  />
                </div>
              </div>
            </div>
            
            {/* Toolbar Color */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <Label className="text-white font-medium">Barva panelu nástrojů</Label>
              <div className="md:col-span-2 flex items-center space-x-4">
                <ColorPicker 
                  color={themeSettings.toolbarColor} 
                  onChange={(color) => setThemeSettings({...themeSettings, toolbarColor: color})}
                />
                <div className="flex-1">
                  <Input 
                    type="text" 
                    value={themeSettings.toolbarColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, toolbarColor: e.target.value})}
                    className="bg-[#1F3A41] text-white border-[#395054]"
                  />
                </div>
              </div>
            </div>
            
            {/* Color Suggestions */}
            <div className="mt-8">
              <Label className="text-white font-medium block mb-3">Doporučené barvy</Label>
              <div className="flex flex-wrap gap-3">
                {SUGGESTED_COLORS.map((color, index) => (
                  <button 
                    key={index}
                    className={`w-10 h-10 rounded-full border-2 ${
                      color === themeSettings.frameColor || 
                      color === themeSettings.tabColor || 
                      color === themeSettings.toolbarColor 
                        ? 'border-[#1DF5D7]' 
                        : 'border-white/30'
                    } hover:scale-110 transition-transform duration-200`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      // Apply to appropriate color based on context
                      if (activeTab === 'colors') {
                        setThemeSettings({
                          ...themeSettings,
                          frameColor: color
                        });
                      }
                    }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="background" className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <Label className="text-white font-medium">Obrázek pozadí</Label>
              {themeSettings.backgroundImage && (
                <Button 
                  variant="link" 
                  className="text-[#1DF5D7] text-sm hover:underline p-0 h-auto"
                  onClick={handleRemoveImage}
                >
                  Odstranit obrázek
                </Button>
              )}
            </div>
            
            <ImageUpload 
              onImageSelect={(imageUrl) => setThemeSettings({...themeSettings, backgroundImage: imageUrl})}
              currentImage={themeSettings.backgroundImage}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div>
              <Label className="text-white font-medium">Název motivu</Label>
              <Input
                type="text"
                className="mt-2 bg-[#1F3A41] text-white border-[#395054]"
                placeholder="Můj vlastní motiv"
                value={themeSettings.themeName}
                onChange={(e) => setThemeSettings({...themeSettings, themeName: e.target.value})}
              />
              <p className="text-white/70 text-xs mt-1">Tento název se zobrazí v nastavení motivů vašeho prohlížeče</p>
            </div>
            
            <div>
              <Label className="text-white font-medium">Verze motivu</Label>
              <Input
                type="text"
                className="mt-2 bg-[#1F3A41] text-white border-[#395054]"
                placeholder="1.0"
                value={themeSettings.themeVersion}
                onChange={(e) => setThemeSettings({...themeSettings, themeVersion: e.target.value})}
                disabled
              />
              <p className="text-white/70 text-xs mt-1">Číslo verze vašeho motivu</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Export Section */}
      <div className="mt-8 bg-gradient-to-r from-[#226F75] to-[#109C70] rounded-lg shadow-xl p-6 border border-[#1DF5D7]/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">Připraveni aplikovat váš motiv?</h3>
            <p className="text-white/80 text-sm">Exportujte svůj vlastní motiv Chrome a nainstalujte si ho do prohlížeče.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              className="bg-[#1DF5D7] hover:bg-[#1DF5D7]/80 text-[#1F3A41] font-medium px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 flex items-center"
              onClick={handleExportTheme}
            >
              <i className="fas fa-download mr-2"></i>
              Exportovat motiv
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
