import { useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, ImageIcon } from "lucide-react";

const BackgroundTab = () => {
  const { theme, updateTheme } = useTheme();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateTheme({
          background: {
            ...theme.background,
            image: event.target?.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateTheme({
            background: {
              ...theme.background,
              image: event.target?.result as string,
            },
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  const handlePositionChange = (value: string) => {
    updateTheme({
      background: {
        ...theme.background,
        position: value as 'center' | 'stretch' | 'tile',
      },
    });
  };
  
  const handleBlurChange = (value: number[]) => {
    updateTheme({
      background: {
        ...theme.background,
        blurRadius: value[0],
      },
    });
  };
  
  return (
    <div>
      <h3 className="text-white font-medium mb-3">{t("backgroundImage")}</h3>
      
      {/* Image Upload/Drop Area */}
      <div
        className={`bg-neutral-darkest border-2 border-dashed ${
          dragActive ? "border-secondary" : "border-neutral-medium"
        } rounded-lg p-6 text-center cursor-pointer hover:bg-neutral-dark transition-colors mb-6`}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {theme.background?.image ? (
          <div className="relative">
            <img 
              src={theme.background.image} 
              alt="Background preview" 
              className="max-h-32 mx-auto rounded-md object-cover"
            />
            <p className="mt-2 text-xs text-neutral-medium">{t("dragDrop")}</p>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 mx-auto text-neutral-medium mb-2" />
            <p className="text-neutral-light mb-1">{t("dragDrop")}</p>
            <p className="text-xs text-neutral-medium">{t("orClick")}</p>
          </>
        )}
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      
      {/* Background Settings */}
      {theme.background?.image && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <Label className="text-white text-sm block mb-1">{t("positioning")}</Label>
            <Select 
              value={theme.background.position || "center"} 
              onValueChange={handlePositionChange}
            >
              <SelectTrigger className="bg-neutral-darkest border-neutral-medium">
                <SelectValue placeholder={t("center")} />
              </SelectTrigger>
              <SelectContent className="bg-neutral-dark border-neutral-medium">
                <SelectItem value="center">{t("center")}</SelectItem>
                <SelectItem value="stretch">{t("stretch")}</SelectItem>
                <SelectItem value="tile">{t("tile")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-white text-sm block mb-1">{t("blurEffect")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                defaultValue={[0]}
                max={20}
                step={1}
                value={[theme.background.blurRadius || 0]}
                onValueChange={handleBlurChange}
                className="flex-1"
              />
              <span className="text-white">{theme.background.blurRadius || 0}px</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundTab;
