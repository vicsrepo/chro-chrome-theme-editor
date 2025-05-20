interface InfoSectionProps {
  language: "en" | "cz";
}

export default function InfoSection({ language }: InfoSectionProps) {
  const translations = {
    howToInstall: {
      en: "How to install Chrome theme",
      cz: "Jak nainstalovat Chrome motiv"
    },
    step1Title: {
      en: "Create your theme",
      cz: "Vytvořte si motiv"
    },
    step1Description: {
      en: "Customize colors and background according to your preferences using our simple editor.",
      cz: "Přizpůsobte barvy a pozadí podle vašich představ pomocí našeho jednoduchého editoru."
    },
    step2Title: {
      en: "Download ZIP file",
      cz: "Stáhněte ZIP soubor"
    },
    step2Description: {
      en: "Click the \"Export Theme\" button to download your theme as a ZIP file.",
      cz: "Klikněte na tlačítko \"Export Theme\" pro stažení vašeho motivu ve formátu ZIP."
    },
    step3Title: {
      en: "Install in Chrome",
      cz: "Nainstalujte v Chrome"
    },
    step3Description: {
      en: "Open chrome://extensions, enable developer mode and drag the file into the window.",
      cz: "Otevřete chrome://extensions, zapněte režim pro vývojáře a přetáhněte soubor do okna."
    }
  };

  return (
    <div className="mt-12 bg-muted rounded-lg shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        {translations.howToInstall[language]}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background rounded-lg p-4">
          <div className="text-secondary text-3xl mb-2">1</div>
          <h3 className="font-medium mb-2">{translations.step1Title[language]}</h3>
          <p className="text-sm text-gray-300">{translations.step1Description[language]}</p>
        </div>
        <div className="bg-background rounded-lg p-4">
          <div className="text-secondary text-3xl mb-2">2</div>
          <h3 className="font-medium mb-2">{translations.step2Title[language]}</h3>
          <p className="text-sm text-gray-300">{translations.step2Description[language]}</p>
        </div>
        <div className="bg-background rounded-lg p-4">
          <div className="text-secondary text-3xl mb-2">3</div>
          <h3 className="font-medium mb-2">{translations.step3Title[language]}</h3>
          <p className="text-sm text-gray-300">{translations.step3Description[language]}</p>
        </div>
      </div>
    </div>
  );
}
