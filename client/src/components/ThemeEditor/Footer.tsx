interface FooterProps {
  language: "en" | "cz";
}

export default function Footer({ language }: FooterProps) {
  const translations = {
    footerText: {
      en: "Chro Chrome Theme Editor 2023 | Create your own Chrome theme in minutes",
      cz: "Chro Chrome Theme Editor 2023 | Vytvořte si vlastní motiv pro Chrome během pár minut"
    }
  };

  return (
    <footer className="py-6 px-4 bg-background border-t border-muted">
      <div className="container mx-auto text-center text-muted-foreground text-sm">
        <p>{translations.footerText[language]}</p>
      </div>
    </footer>
  );
}
