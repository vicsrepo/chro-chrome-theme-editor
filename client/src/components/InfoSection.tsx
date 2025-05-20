import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const InfoSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-12">
      <Card className="bg-neutral-dark shadow-xl">
        <CardHeader>
          <CardTitle>{t("howToInstall")}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-darkest rounded-lg p-4">
              <div className="text-secondary text-3xl mb-2">1</div>
              <h3 className="font-medium mb-2">{t("step1Title")}</h3>
              <p className="text-sm text-neutral-light">{t("step1Desc")}</p>
            </div>
            
            <div className="bg-neutral-darkest rounded-lg p-4">
              <div className="text-secondary text-3xl mb-2">2</div>
              <h3 className="font-medium mb-2">{t("step2Title")}</h3>
              <p className="text-sm text-neutral-light">{t("step2Desc")}</p>
            </div>
            
            <div className="bg-neutral-darkest rounded-lg p-4">
              <div className="text-secondary text-3xl mb-2">3</div>
              <h3 className="font-medium mb-2">{t("step3Title")}</h3>
              <p className="text-sm text-neutral-light">{t("step3Desc")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoSection;
