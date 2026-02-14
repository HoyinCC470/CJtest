import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-dark text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-white/10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold to-orange-400 bg-clip-text text-transparent">
              Wordfolio
            </span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="text-xs sm:text-sm text-white/50 hidden sm:inline">2026 新春实验室</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 sm:gap-8">
            {[
              { label: '首页', id: 'hero' },
              { label: '测试', id: 'tests' },
              { label: '关于', id: 'about' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs sm:text-sm text-white/60 hover:text-gold transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xs sm:text-sm text-white/40 text-center sm:text-left">
            © 2026 Wordfolio. All rights reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            {['隐私政策', '使用条款', '联系我们'].map((item) => (
              <button
                key={item}
                className="text-xs sm:text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
