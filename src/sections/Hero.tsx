import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-b from-ivory to-warm"
    >
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Tag */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-base">🧧</span>
              <span className="text-sm font-medium text-gray-600">2026 乙巳蛇年限定</span>
            </div>

            {/* Title - Larger font on mobile */}
            <div className="space-y-3 sm:space-y-4">
              <h1
                className={`text-[2.5rem] sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-dark leading-[1.15] tracking-tight transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                发现孩子的
                <span className="block text-gradient mt-2">天赋密码</span>
              </h1>
              <p
                className={`text-lg sm:text-xl text-gray-500 max-w-md mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Wordfolio 新春实验室带来科学设计的趣味测试，为家庭开启充满惊喜的新年探索之旅
              </p>
            </div>

            {/* CTA Buttons - fixed width on mobile, not full width */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button 
                onClick={() => scrollTo('tests')} 
                className="w-[72%] sm:w-auto px-10 py-4 rounded-full font-semibold text-white text-lg bg-gradient-to-r from-cinnabar to-orange-500 shadow-lg shadow-cinnabar/25 hover:shadow-xl hover:shadow-cinnabar/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                开始测试
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollTo('about')} 
                className="w-[72%] sm:w-auto px-10 py-4 rounded-full font-semibold text-lg bg-white text-dark border-2 border-gold hover:bg-gold hover:text-dark hover:-translate-y-0.5 transition-all duration-300"
              >
                了解更多
              </button>
            </div>

            {/* Stats */}
            <div
              className={`flex items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-lg">✦</span>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-dark">8,526</p>
                  <p className="text-sm text-gray-400">个家庭已参与</p>
                </div>
              </div>
              <div className="h-12 sm:h-14 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cinnabar/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-cinnabar text-lg">★</span>
                </div>
                <div className="text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-dark">4.9</p>
                  <p className="text-sm text-gray-400">用户评分</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hidden on mobile, visible on lg */}
          <div
            className={`hidden lg:block transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
                <img
                  src="/hero-decoration.jpg"
                  alt="新春装饰"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinnabar/10 to-transparent" />
              </div>

              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-gray-100">
                🧧
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-cinnabar rounded-full flex items-center justify-center text-xl shadow-lg">
                🏮
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
