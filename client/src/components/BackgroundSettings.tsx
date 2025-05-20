import React, { useCallback } from "react";
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface BackgroundSettingsProps {
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

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ 
  backgroundImage, 
  handleImageUpload,
  bgSettings,
  setBgSettings,
  t
}) => {
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, [handleImageUpload]);
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  }, [handleImageUpload]);

  return (
    <div>
      <h3 className="text-white font-medium mb-3">{t("controls.backgroundImage")}</h3>
      
      <div 
        className="bg-[#1F3A41] border-2 border-dashed border-[#737D78] rounded-lg p-6 text-center cursor-pointer hover:bg-[#395054] transition-colors"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => document.getElementById('bg-upload')?.click()}
      >
        {backgroundImage ? (
          <div className="flex flex-col items-center">
            <img 
              src={backgroundImage} 
              alt="Background preview" 
              className="max-h-32 max-w-full mb-2 rounded"
            />
            <p className="text-[#E5E7EB] text-sm">{t("controls.background.clickToChange")}</p>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 mx-auto text-[#737D78] mb-2" />
            <p className="text-[#E5E7EB] mb-1">{t("controls.background.dropImage")}</p>
            <p className="text-xs text-[#737D78]">{t("controls.background.orClick")}</p>
          </>
        )}
        
        <input 
          type="file" 
          className="hidden" 
          id="bg-upload" 
          accept="image/png,image/jpeg"
          onChange={onFileChange}
        />
      </div>
      
      {backgroundImage && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm block mb-1">{t("controls.background.positioning")}</label>
            <Select 
              value={bgSettings.position}
              onValueChange={(value) => setBgSettings(prev => ({ ...prev, position: value }))}
            >
              <SelectTrigger className="w-full bg-[#1F3A41] border-[#737D78] text-white">
                <SelectValue placeholder={t("controls.background.selectPosition")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center">{t("controls.background.positions.center")}</SelectItem>
                <SelectItem value="stretch">{t("controls.background.positions.stretch")}</SelectItem>
                <SelectItem value="tile">{t("controls.background.positions.tile")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-white text-sm block mb-1">{t("controls.background.blurEffect")}</label>
            <div className="flex items-center">
              <div className="flex-1 mr-4">
                <Slider
                  min={0}
                  max={20}
                  step={1}
                  value={[bgSettings.blur]}
                  onValueChange={(value) => setBgSettings(prev => ({ ...prev, blur: value[0] }))}
                />
              </div>
              <span className="text-white">{bgSettings.blur}px</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSettings;
