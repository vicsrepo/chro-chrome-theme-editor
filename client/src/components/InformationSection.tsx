import React from "react";

interface InformationSectionProps {
  t: (key: string) => string;
}

const InformationSection: React.FC<InformationSectionProps> = ({ t }) => {
  return (
    <div className="mt-12 bg-[#395054] rounded-lg shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">{t("info.howToInstall")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1F3A41] rounded-lg p-4">
          <div className="text-[#1DF5D7] text-3xl mb-2">1</div>
          <h3 className="font-medium mb-2">{t("info.step1Title")}</h3>
          <p className="text-sm text-[#E5E7EB]">{t("info.step1Desc")}</p>
        </div>
        <div className="bg-[#1F3A41] rounded-lg p-4">
          <div className="text-[#1DF5D7] text-3xl mb-2">2</div>
          <h3 className="font-medium mb-2">{t("info.step2Title")}</h3>
          <p className="text-sm text-[#E5E7EB]">{t("info.step2Desc")}</p>
        </div>
        <div className="bg-[#1F3A41] rounded-lg p-4">
          <div className="text-[#1DF5D7] text-3xl mb-2">3</div>
          <h3 className="font-medium mb-2">{t("info.step3Title")}</h3>
          <p className="text-sm text-[#E5E7EB]">{t("info.step3Desc")}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
