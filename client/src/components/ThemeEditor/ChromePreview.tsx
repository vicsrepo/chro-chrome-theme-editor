import { Theme } from "@/lib/theme";

interface ChromePreviewProps {
  theme: Theme;
  language: "en" | "cz";
}

export default function ChromePreview({ theme, language }: ChromePreviewProps) {
  const translations = {
    livePreview: {
      en: "Live Preview",
      cz: "Live Preview"
    },
    chromeUrl: {
      en: "chrome://chro-chrome/",
      cz: "chrome://chro-chrome/"
    },
    newTab: {
      en: "New Tab",
      cz: "Nová karta"
    },
    chromeThemeEditor: {
      en: "ChromeTheme editor",
      cz: "ChromeTheme editor"
    },
    title: {
      en: "Chro Chrome Theme Editor",
      cz: "Chro Chrome Theme Editor"
    },
    subtitle: {
      en: "Create your own Chrome theme in minutes",
      cz: "Vytvořte si vlastní motiv pro Chrome během pár minut"
    }
  };

  // Create background style based on theme settings
  const getBackgroundStyle = () => {
    if (theme.backgroundType === 'image' && theme.backgroundImage) {
      let style: React.CSSProperties = {
        backgroundImage: `url(${theme.backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      };

      // Apply positioning
      if (theme.backgroundPosition === 'tile') {
        style.backgroundSize = 'auto';
        style.backgroundRepeat = 'repeat';
      } else if (theme.backgroundPosition === 'stretch') {
        style.backgroundSize = '100% 100%';
      }

      // Apply blur
      if (theme.backgroundBlur > 0) {
        style.filter = `blur(${theme.backgroundBlur}px)`;
      }

      return style;
    }
    
    return { backgroundColor: theme.backgroundType === 'color' ? theme.backgroundColor : '#1F3A41' };
  };

  return (
    <div className="bg-muted rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-xl font-semibold px-6 py-4 border-b border-background">
        {translations.livePreview[language]}
      </h2>
      
      <div className="p-6">
        <div className="overflow-hidden rounded shadow-lg">
          {/* Chrome Window Frame */}
          <div 
            style={{ backgroundColor: theme.frame }}
            className="flex items-center justify-between px-4 py-2"
          >
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-black bg-opacity-20 rounded h-6 max-w-md mx-auto flex items-center justify-center">
                <span className="text-xs" style={{ color: theme.text }}>
                  {translations.chromeUrl[language]}
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          {/* Tabs Bar */}
          <div 
            style={{ backgroundColor: theme.frame }}
            className="flex items-end px-2 pt-2"
          >
            {/* Inactive Tab */}
            <div 
              className="chrome-tab-curve mr-1 px-4 py-1 flex items-center opacity-80"
              style={{ backgroundColor: theme.frame, color: theme.text }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">{translations.newTab[language]}</span>
            </div>
            
            {/* Active Tab */}
            <div 
              className="chrome-tab-curve px-4 py-2 flex items-center"
              style={{ backgroundColor: theme.tab, color: theme.text }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span className="text-xs">{translations.chromeThemeEditor[language]}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            {/* New Tab Button */}
            <div className="ml-1 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          
          {/* Toolbar */}
          <div 
            className="px-4 py-3 flex items-center"
            style={{ backgroundColor: theme.toolbar }}
          >
            <div className="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            
            <div className="flex-1 mx-4">
              <div className="bg-white bg-opacity-10 rounded-full px-4 py-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <span className="text-sm opacity-80" style={{ color: theme.text }}>{translations.chromeUrl[language]}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
          </div>
          
          {/* Content Area (New Tab) */}
          <div 
            className="h-64 flex items-center justify-center" 
            style={getBackgroundStyle()}
          >
            <div className="text-center p-4 bg-black bg-opacity-20 rounded-lg backdrop-blur-sm">
              <div className="text-secondary text-5xl mb-4">🎨</div>
              <h3 className="text-xl text-white font-medium mb-2">{translations.title[language]}</h3>
              <p className="text-gray-200 text-sm max-w-md">{translations.subtitle[language]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
