import React, { createContext, useContext, useState, useCallback } from "react";
import { TRANSLATIONS } from "@/lib/constants";

type Language = "en" | "cs";

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  
  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === "en" ? "cs" : "en"));
  }, []);
  
  const t = useCallback(
    (key: string) => {
      return TRANSLATIONS[language][key as keyof typeof TRANSLATIONS["en"]] || key;
    },
    [language]
  );
  
  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
