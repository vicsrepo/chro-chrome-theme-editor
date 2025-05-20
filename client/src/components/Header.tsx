import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileDown, RefreshCw, Shuffle } from "lucide-react";

const Header = () => {
  const { resetTheme, randomizeTheme, exportTheme } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <header className="bg-primary-dark py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-secondary text-3xl font-bold">🖌️ Chro Chrome</span>
          <span className="ml-2 text-white font-medium">{t("title")}</span>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            variant="secondary" 
            className="bg-neutral-dark hover:bg-neutral-medium text-white"
            onClick={resetTheme}
          >
            {t("reset")}
          </Button>
          
          <Button 
            variant="secondary"
            className="bg-primary hover:bg-primary-light text-white"
            onClick={randomizeTheme}
          >
            <Shuffle className="mr-2 h-4 w-4" />
            {t("randomTheme")}
          </Button>
          
          <Button 
            variant="secondary"
            className="bg-secondary-dark hover:bg-secondary text-white"
            onClick={exportTheme}
          >
            <FileDown className="mr-2 h-4 w-4" />
            {t("exportTheme")}
          </Button>
          
          <Button 
            variant="secondary"
            className="bg-neutral-dark hover:bg-neutral-medium text-white"
            onClick={toggleLanguage}
          >
            {language === "en" ? "EN | CZ" : "CZ | EN"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
