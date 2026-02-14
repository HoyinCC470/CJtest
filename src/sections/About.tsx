import { useEffect, useRef, useState } from 'react';
import { Target, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  { icon: Target, text: '科学设计的测评体系' },
  { icon: Users, text: '适合全家参与' },
  { icon: Shield, text: '隐私安全保护' },
  { icon: Sparkles, text: '春节限定内容' },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1, rootMargin: '30px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-gradient-to-b from-ivory to-warm">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left - Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
              <img
                src="/about-image.jpg"
                alt="关于 Wordfolio"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinnabar/10 to-transparent" />
            </div>

            {/* Floating stat card - adjusted for mobile */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-5">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cinnabar to-orange-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl">
                  🧧
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-dark">8,526+</p>
                  <p className="text-xs text-gray-400">家庭已参与</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-5 sm:space-y-8">
            {/* Tag */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full shadow-sm border border-gray-100 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
              <span className="text-xs sm:text-sm font-medium text-gray-600">关于我们</span>
            </div>

            {/* Title */}
            <div
              className={`space-y-3 sm:space-y-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark leading-tight tracking-tight">
                为家庭创造
                <span className="text-gradient block sm:inline"> 有意义的连接</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
                Wordfolio 新春实验室是一个专注于家庭互动的趣味测试平台。我们相信，通过科学设计的测评，可以帮助家长更好地理解孩子的天赋与潜能。
              </p>
            </div>

            {/* Features Grid - 2 columns on all screens */}
            <div
              className={`grid grid-cols-2 gap-3 sm:gap-4 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold/10 rounded-lg flex items-center justify-center text-gold flex-shrink-0">
                    <feature.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-dark leading-tight">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`pt-2 sm:pt-4 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button className="btn-primary flex items-center justify-center sm:justify-start gap-2 group w-full sm:w-auto">
                了解更多
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
