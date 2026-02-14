import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-sm py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto container-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cinnabar to-gold bg-clip-text text-transparent">
              Wordfolio
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 hidden xs:inline">2026 新春实验室</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {['首页', '测试', '关于'].map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(['hero', 'tests', 'about'][i])}
                className="text-sm text-gray-600 hover:text-cinnabar transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('tests')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-cinnabar rounded-full hover:bg-cinnabar/90 transition-colors shadow-sm"
            >
              开始测试
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {['首页', '测试', '关于'].map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['hero', 'tests', 'about'][i])}
                  className="text-left text-gray-700 hover:text-cinnabar hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg text-sm"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('tests')}
                className="mt-3 px-5 py-3 text-sm font-medium text-white bg-cinnabar rounded-full hover:bg-cinnabar/90 transition-colors"
              >
                开始测试
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
