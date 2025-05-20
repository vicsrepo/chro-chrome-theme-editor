import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Theme, generateManifest } from "@/lib/theme";
import { useToast } from "@/hooks/use-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface HeaderProps {
  language: "en" | "cz";
  onToggleLanguage: () => void;
  onReset: () => void;
  onRandomize: () => void;
  theme: Theme;
}

export default function Header({ 
  language, 
  onToggleLanguage, 
  onReset, 
  onRandomize,
  theme
}: HeaderProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const translations = {
    title: {
      en: "Chro Chrome",
      cz: "Chro Chrome"
    },
    subtitle: {
      en: "Theme Editor",
      cz: "Theme Editor"
    },
    reset: {
      en: "Reset",
      cz: "Reset"
    },
    randomTheme: {
      en: "Random Theme",
      cz: "Random Theme"
    },
    exportTheme: {
      en: "Export Theme",
      cz: "Export Theme"
    },
    languageToggle: {
      en: "EN | CZ",
      cz: "EN | CZ"
    },
    exportSuccess: {
      en: "Theme exported successfully!",
      cz: "Motiv byl úspěšně exportován!"
    },
    exportError: {
      en: "Error exporting theme",
      cz: "Chyba při exportu motivu"
    }
  };

  const exportTheme = async () => {
    try {
      setIsExporting(true);
      
      // Generate manifest.json
      const manifest = generateManifest(theme);
      
      // Create a new JSZip instance
      const zip = new JSZip();
      
      // Add manifest.json to the zip
      zip.file("manifest.json", JSON.stringify(manifest, null, 2));
      
      // If there's a background image, add it to the zip
      if (theme.backgroundType === 'image' && theme.backgroundImage) {
        // Convert data URL to blob
        const imageData = theme.backgroundImage.split(',')[1];
        if (imageData) {
          const imageBlob = await fetch(theme.backgroundImage).then(r => r.blob());
          zip.file("images/theme_ntp_background.png", imageBlob);
        }
      }
      
      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });
      
      // Save the zip file
      const filename = (theme.name || "chrome-theme") + ".zip";
      saveAs(content, filename);
      
      toast({
        title: translations.exportSuccess[language],
        description: filename,
      });
    } catch (error) {
      console.error("Error exporting theme:", error);
      toast({
        title: translations.exportError[language],
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="bg-primary-dark py-4 px-6 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-secondary text-3xl font-bold">🖌️ {translations.title[language]}</span>
          <span className="ml-2 text-white font-medium">{translations.subtitle[language]}</span>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          <Button 
            variant="outline" 
            className="bg-muted hover:bg-muted-foreground text-white"
            onClick={onReset}
          >
            {translations.reset[language]}
          </Button>
          
          <Button 
            className="bg-primary hover:bg-primary-100 text-white"
            onClick={onRandomize}
          >
            {translations.randomTheme[language]}
          </Button>
          
          <Button 
            className="bg-accent hover:bg-accent-foreground text-white flex items-center"
            onClick={exportTheme}
            disabled={isExporting}
          >
            <span>{translations.exportTheme[language]}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-muted hover:bg-muted-foreground text-white"
            onClick={onToggleLanguage}
          >
            {translations.languageToggle[language]}
          </Button>
        </div>
      </div>
    </header>
  );
}
