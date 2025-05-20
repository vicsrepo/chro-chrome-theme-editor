export default function AppFooter() {
  return (
    <footer className="mt-16 bg-[#1F3A41] py-8 px-4 border-t border-[#395054]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="text-[#1DF5D7] text-xl">
                <i className="fa-brands fa-chrome"></i>
              </div>
              <h2 className="text-lg font-heading font-semibold">
                <span className="text-[#1DF5D7]">Chro</span><span className="text-white">Chrome</span> Theme Editor
              </h2>
            </div>
            <p className="text-[#737D78] text-sm mt-2">Vytvořte si vlastní motiv pro Chrome během pár minut</p>
          </div>
          
          <div className="flex space-x-10">
            <div>
              <h3 className="text-white font-medium mb-2">Zdroje</h3>
              <ul className="text-[#737D78] text-sm space-y-1.5">
                <li><button className="hover:text-[#1DF5D7] transition-colors duration-200">Dokumentace</button></li>
                <li><button className="hover:text-[#1DF5D7] transition-colors duration-200">Často kladené otázky</button></li>
                <li><button className="hover:text-[#1DF5D7] transition-colors duration-200">Galerie motivů</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-2">Sledujte nás</h3>
              <div className="flex space-x-4 text-[#737D78]">
                <button className="hover:text-[#1DF5D7] transition-colors duration-200"><i className="fab fa-twitter"></i></button>
                <button className="hover:text-[#1DF5D7] transition-colors duration-200"><i className="fab fa-github"></i></button>
                <button className="hover:text-[#1DF5D7] transition-colors duration-200"><i className="fab fa-discord"></i></button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-[#395054] text-center text-[#737D78] text-xs">
          <p>ChroCrome Theme Editor © {new Date().getFullYear()}. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}
