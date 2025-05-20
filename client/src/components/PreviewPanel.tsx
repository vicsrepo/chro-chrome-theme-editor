import React from "react";
import ChromePreview from "./ChromePreview";

interface PreviewPanelProps {
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

const PreviewPanel: React.FC<PreviewPanelProps> = ({ 
  colors, 
  backgroundImage,
  bgSettings,
  t
}) => {
  return (
    <div className="w-full lg:w-1/2 order-2 lg:order-1">
      <div className="bg-[#395054] rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-xl font-semibold px-6 py-4 border-b border-[#1F3A41]">
          {t("preview.livePreview")}
        </h2>
        
        <div className="p-6">
          <ChromePreview 
            colors={colors} 
            backgroundImage={backgroundImage}
            bgSettings={bgSettings}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
