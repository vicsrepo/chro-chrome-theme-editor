import { useThemeSettings } from "@/hooks/use-theme-settings";

export default function ThemePreview() {
  const { themeSettings } = useThemeSettings();
  
  const backgroundImageStyle = themeSettings.backgroundImage
    ? { backgroundImage: `url(${themeSettings.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: '#1E1E1E' };

  return (
    <div className="bg-[#226F75] p-5 rounded-lg shadow-xl border border-[#1DF5D7]/10">
      <h2 className="font-heading text-xl font-semibold mb-4 text-white">Náhled motivu</h2>
      
      <div className="preview-chrome-window rounded-t-md rounded-b-none overflow-hidden shadow-xl">
        {/* Top Tab Bar (Teal) - Exact match to screenshot */}
        <div 
          className="flex items-center pl-1 pr-1 py-0 h-8" 
          style={{ backgroundColor: themeSettings.frameColor }}
        >
          <button className="hover:bg-white/10 rounded text-white/80 h-7 w-7 flex items-center justify-center">
            <i className="fas fa-chevron-down text-xs"></i>
          </button>
          
          <div className="flex items-center h-full">
            <div className="flex items-center bg-[#184752]/80 h-7 rounded-t-md px-3 ml-1">
              <i className="fas fa-globe text-white/80 text-xs mr-1.5"></i>
              <span className="text-white text-xs font-normal">chrome://chro-chrome/</span>
              <div className="w-4"></div>
              <button className="text-white/80 hover:text-white ml-1">
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>
          
          <button className="text-white/80 hover:bg-white/10 rounded h-7 w-7 flex items-center justify-center ml-1">
            <i className="fas fa-plus text-xs"></i>
          </button>
          
          <div className="flex-grow"></div>
          
          <button className="text-white/80 hover:bg-white/10 h-7 w-7 flex items-center justify-center">
            <i className="fas fa-minus text-xs"></i>
          </button>
          <button className="text-white/80 hover:bg-white/10 h-7 w-7 flex items-center justify-center">
            <i className="far fa-square text-xs"></i>
          </button>
          <button className="text-white/80 hover:bg-white/10 hover:bg-red-500 h-7 w-7 flex items-center justify-center">
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
        
        {/* Navigation Bar (Teal) - Exact match to screenshot */}
        <div 
          className="flex items-center px-3 py-1 h-10" 
          style={{ backgroundColor: themeSettings.tabColor }}
        >
          <div className="flex items-center space-x-3">
            <button className="text-white/90 hover:bg-white/10 rounded-full h-8 w-8 flex items-center justify-center">
              <i className="fas fa-arrow-left text-sm"></i>
            </button>
            <button className="text-white/90 hover:bg-white/10 rounded-full h-8 w-8 flex items-center justify-center">
              <i className="fas fa-arrow-right text-sm"></i>
            </button>
            <button className="text-white/90 hover:bg-white/10 rounded-full h-8 w-8 flex items-center justify-center">
              <i className="fas fa-redo-alt text-sm"></i>
            </button>
          </div>
          
          <div className="flex flex-1 items-center bg-[#1A4752]/70 rounded-full px-3 py-1 mx-3 h-8">
            <div className="flex items-center">
              <i className="fa-brands fa-chrome text-white mr-2 text-sm"></i>
              <span className="text-white text-sm font-medium">Chrome</span>
              <span className="mx-2 text-white/50">|</span>
              <span className="text-white/90 text-sm">chrome://chro-chrome</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="text-white/90 hover:bg-white/10 rounded-full h-8 w-8 flex items-center justify-center">
              <i className="fas fa-star text-sm"></i>
            </button>
            <div className="flex items-center justify-center h-8 w-8 bg-purple-600 rounded-full text-white font-bold text-sm">
              P
            </div>
            <button className="text-white/90 hover:bg-white/10 rounded-full h-8 w-8 flex items-center justify-center">
              <i className="fas fa-ellipsis-v text-sm"></i>
            </button>
          </div>
        </div>
        
        {/* Bookmarks bar - Exact match to screenshot */}
        <div 
          className="flex items-center px-3 py-0 h-8 border-b border-[#1A4752]/50"
          style={{ backgroundColor: themeSettings.toolbarColor }}
        >
          <button className="flex items-center text-white/90 hover:bg-white/10 rounded px-2 py-1 text-xs">
            <i className="fas fa-star text-white/80 mr-1.5 text-xs"></i>
            <span>Záložky</span>
          </button>
          
          <button className="flex items-center text-white/90 hover:bg-white/10 rounded px-2 py-1 text-xs ml-3">
            <i className="fa-brands fa-chrome text-white/80 mr-1.5 text-xs"></i>
            <span>ChroChrome editor</span>
          </button>
        </div>
        
        {/* Content Area with Background */}
        <div 
          className="h-64 flex items-center justify-center" 
          style={backgroundImageStyle}
        >
          <div className="text-center p-4 bg-[#1F3A41]/50 rounded-lg backdrop-blur-sm border border-[#1DF5D7]/10">
            <p className="text-[#1DF5D7] font-semibold text-lg">Náhled vašeho motivu</p>
            <p className="text-white text-sm mt-1">Upravte barvy a pozadí podle vašeho stylu</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-white/70 text-sm">Změny budou aplikovány v reálném čase na náhled</p>
      </div>
    </div>
  );
}
