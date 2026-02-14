import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Users, ArrowRight } from 'lucide-react';

interface TestCard {
  id: number;
  tag: string;
  tagType: 'hot' | 'new' | 'limited';
  title: string;
  description: string;
  stats: string;
  cta: string;
  image: string;
}

const testCards: TestCard[] = [
  {
    id: 1,
    tag: '热销 NO.1',
    tagType: 'hot',
    title: '2026年孩子的天赋关键词测试',
    description: '解锁孩子隐藏潜能，发现独特天赋密码。科学设计的测评，帮助家长更好地理解孩子的优势。',
    stats: '2,847 个家庭正在测',
    cta: '立即测试',
    image: '/test-talent.jpg',
  },
  {
    id: 2,
    tag: '新春必测',
    tagType: 'new',
    title: '2026年家庭幸运色测试',
    description: '找到属于你家的2026幸运色彩，为全年加持好运',
    stats: '1,523 人已测',
    cta: '开始测试',
    image: '/test-color.jpg',
  },
  {
    id: 3,
    tag: '限时活动',
    tagType: 'limited',
    title: '2026新年运势关键词测试',
    description: '揭晓孩子的新年运势密码，开启顺遂一年',
    stats: '3,156 人正在测',
    cta: '立即揭晓',
    image: '/test-fortune.jpg',
  },
  {
    id: 4,
    tag: '限时福利',
    tagType: 'hot',
    title: '获取专属激活码',
    description: '解锁全部测试，享受完整体验',
    stats: '限时免费领取',
    cta: '立即获取',
    image: '/test-activate.jpg',
  },
];

const TagComponent = ({ tag, type }: { tag: string; type: string }) => {
  const className = {
    hot: 'tag-hot',
    new: 'tag-new',
    limited: 'tag-limited',
  }[type] || 'tag';
  
  return <span className={className}>{tag}</span>;
};

export default function Tests() {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) setVisibleCards((prev) => new Set([...prev, index]));
        });
      },
      { threshold: 0.1, rootMargin: '30px' }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tests" className="section-padding bg-gradient-to-b from-warm to-ivory">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4 sm:mb-6">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cinnabar" />
            <span className="text-xs sm:text-sm font-medium text-gray-600">本月热销</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mb-3 sm:mb-4 tracking-tight">精选测试</h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed px-4 sm:px-0">
            数千家庭正在探索的新春趣味测试，为孩子的成长之路点亮明灯
          </p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {testCards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`transition-all duration-700 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card with glow effect on hover */}
              <div className="relative h-full group">
                {/* Glow background - appears on hover */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-cinnabar/30 via-gold/30 to-cinnabar/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Card content */}
                <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-gray-100 group-hover:border-gold/50 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-gold/10">
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Image */}
                    <div className="relative w-full sm:w-36 md:w-40 lg:w-44 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <TagComponent tag={card.tag} type={card.tagType} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                      <div>
                        {/* Title with color transition on hover */}
                        <h3 className="text-base sm:text-lg font-bold mb-2 leading-tight line-clamp-2 text-dark group-hover:text-cinnabar transition-colors duration-300">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {card.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-100 group-hover:border-gold/20 transition-colors duration-300">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[100px] sm:max-w-none">{card.stats}</span>
                        </div>
                        <button 
                          onClick={() => navigate('/test')}
                          className="flex items-center gap-1 text-sm font-medium text-cinnabar group-hover:text-cinnabar transition-colors group/btn flex-shrink-0"
                        >
                          {card.cta}
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <p className="text-xs sm:text-sm text-gray-400 mb-4">更多测试正在开发中...</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full border border-gray-100 shadow-sm">
            <span className="text-base sm:text-lg">🎁</span>
            <span className="text-xs sm:text-sm text-gray-600">使用激活码解锁全部测试内容</span>
          </div>
        </div>
      </div>
    </section>
  );
}
