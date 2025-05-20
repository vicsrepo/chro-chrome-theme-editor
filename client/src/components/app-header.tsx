import { useState } from 'react';
import { Link } from 'wouter';

interface AppHeaderProps {
  currentLanguage?: string;
}

export default function AppHeader({ currentLanguage = 'CZ' }: AppHeaderProps) {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  
  return (
    <header className="bg-[#1F3A41] px-4 py-4 sm:px-6 shadow-lg border-b border-[#395054]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="text-[#1DF5D7] text-3xl cursor-pointer">
              <i className="fa-brands fa-chrome"></i>
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold">
            <span className="text-[#1DF5D7]">Chro</span>
            <span className="text-white">Chrome</span> 
            <span className="hidden sm:inline text-white">Theme Editor</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-5">
          <button className="text-white hover:text-[#1DF5D7] transition-colors duration-200">
            <i className="fas fa-question-circle"></i>
            <span className="sr-only">Nápověda</span>
          </button>
          <div className="relative">
            <button 
              className="flex items-center space-x-2 text-white hover:text-[#1DF5D7] transition-colors duration-200"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              <i className="fas fa-globe"></i>
              <span className="hidden sm:inline text-sm">{currentLanguage}</span>
              <i className="fas fa-caret-down text-xs"></i>
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute top-full right-0 mt-1 py-2 px-4 w-28 bg-[#395054] rounded-md shadow-lg z-50 border border-[#1DF5D7]/20">
                <button className="block py-1.5 text-white hover:text-[#1DF5D7] w-full text-left" 
                  onClick={() => setIsLanguageMenuOpen(false)}>
                  English
                </button>
                <button className="block py-1.5 text-[#1DF5D7] w-full text-left font-medium" 
                  onClick={() => setIsLanguageMenuOpen(false)}>
                  Čeština
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
