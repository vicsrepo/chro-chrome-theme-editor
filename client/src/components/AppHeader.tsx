import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw, Shuffle } from "lucide-react";
import { generateRandomTheme } from "@/lib/themeGenerator";
import { useToast } from "@/hooks/use-toast";

interface AppHeaderProps {
  resetColors: () => void;
  language: "en" | "cs";
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  resetColors,
  language,
  toggleLanguage,
  t
}) => {
  const { toast } = useToast();

  const handleRandomTheme = useCallback(() => {
    const randomTheme = generateRandomTheme();
    // We'll need to implement this in the parent component
    // For now, just show a toast
    toast({
      title: t("toast.randomTheme"),
      description: t("toast.randomThemeDesc"),
    });
  }, [toast, t]);

  const handleExportTheme = useCallback(() => {
    // This would be implemented in the themeGenerator.ts
    // For now, just show a toast
    toast({
      title: t("toast.exportTheme"),
      description: t("toast.exportThemeDesc"),
    });
  }, [toast, t]);

  return (
    <header className="bg-[#1C5459] py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-[#1DF5D7] text-3xl font-bold">🖌️ Chro Chrome</span>
          <span className="ml-2 text-white font-medium">{t("header.themeEditor")}</span>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="secondary" 
            className="bg-[#395054] hover:bg-[#737D78] text-white"
            onClick={resetColors}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            {t("header.reset")}
          </Button>
          
          <Button 
            variant="secondary"
            className="bg-[#0F5072] hover:bg-[#2E88A1] text-white"
            onClick={handleRandomTheme}
          >
            <Shuffle className="h-4 w-4 mr-2" />
            {t("header.randomTheme")}
          </Button>
          
          <Button 
            variant="secondary"
            className="bg-[#109C70] hover:bg-[#1DF5D7] hover:text-[#1F3A41] text-white"
            onClick={handleExportTheme}
          >
            <Download className="h-4 w-4 mr-2" />
            {t("header.exportTheme")}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-[#395054] hover:bg-[#737D78] text-white"
            onClick={toggleLanguage}
          >
            {language === "en" ? "EN | CZ" : "CZ | EN"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
