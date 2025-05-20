import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-6 px-4 bg-neutral-darkest border-t border-neutral-dark mt-auto">
      <div className="container mx-auto text-center text-neutral-medium text-sm">
        <p>{t("footerText")}</p>
      </div>
    </footer>
  );
};

export default Footer;
