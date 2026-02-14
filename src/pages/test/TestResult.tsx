import { useEffect, useState } from 'react';
import { Share2, RotateCcw } from 'lucide-react';

interface ResultData {
  keyword: string;
  englishName: string;
  chineseName: string;
  matchPercent: number;
  tags: { text: string; color: string }[];
  description: string;
  traits: { name: string; color: string }[];
}

// 模拟结果数据
const resultData: ResultData = {
  keyword: 'Creative',
  englishName: 'CREATIVE STAR',
  chineseName: '创造力之星',
  matchPercent: 87,
  tags: [
    { text: '# 想象力', color: 'bg-rose-100 text-rose-600' },
    { text: '# 艺术感', color: 'bg-amber-100 text-amber-600' },
    { text: '# 独特性', color: 'bg-purple-100 text-purple-600' },
  ],
  description:
    '你拥有一颗充满奇思妙想的小脑袋，总能从平凡中发现不凡。不喜欢被规则束缚，更愿意用自己的方式去理解和表达这个世界。你的创造力就像春天的嫩芽，有着无限生长的可能。在艺术、设计或任何需要创新的领域，你都有着与生俱来的敏感度。继续保持这份对世界的好奇，让想象力带你飞向更远的地方。',
  traits: [
    { name: '创造型', color: 'bg-rose-500' },
    { name: '探索者', color: 'bg-amber-500' },
    { name: '独特力', color: 'bg-purple-500' },
  ],
};

export default function TestResult() {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    // 数字动画
    const duration = 1500;
    const steps = 60;
    const increment = resultData.matchPercent / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= resultData.matchPercent) {
        setAnimatedPercent(resultData.matchPercent);
        clearInterval(timer);
      } else {
        setAnimatedPercent(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-warm pb-8">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-dark">Wordfolio</span>
          <span className="text-xl font-bold text-cinnabar">·新春实验室</span>
        </div>
      </header>

      {/* Result Card */}
      <main className="px-4 sm:px-6">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm max-w-2xl mx-auto">
          {/* Gradient Header */}
          <div className="bg-gradient-to-br from-cinnabar to-orange-500 p-6 text-white relative">
            {/* Top Badge */}
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                2026 天赋关键词
              </span>
            </div>

            {/* Match Circle and Chinese-English Name Row - Centered and Closer Together */}
            <div className="flex items-center justify-center gap-6">
              {/* Chinese Name with English Translation - Positioned to the left */}
              <div className="text-left">
                <div className="text-3xl font-bold">{resultData.chineseName}</div>
                <div className="text-xl text-white/90 mt-2">{resultData.englishName}</div>
              </div>

              {/* Match Circle - Positioned to the right */}
              <div className="relative w-28 h-28">
                {/* Background Circle */}
                <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                {/* Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${(animatedPercent / 100) * 289} 289`}
                    className="transition-all duration-1000"
                  />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-white/80">契合度</span>
                  <span className="text-3xl font-bold">{animatedPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result Content */}
          <div className="p-6 -mt-4 relative">
            {/* English Name */}
            <p className="text-center text-gray-600 text-lg mb-2 font-medium">
              天赋力关键词是
            </p>

            {/* Keyword */}
            <h1 className="text-center text-4xl font-black text-dark mb-4" style={{ fontFamily: "'Noto Sans SC', 'Arial Black', sans-serif", fontWeight: 900 }}>
              {resultData.keyword}
            </h1>


            {/* Tags */}
            <div className="flex justify-center gap-3 mb-6">
              {resultData.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${tag.color}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="bg-gray-100 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-4 py-2 bg-cinnabar text-white rounded-lg text-sm font-semibold">
                  天赋侧写
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm font-normal">
                "{resultData.description}"
              </p>
            </div>

            {/* Traits */}
            <div className="mb-6">
              <h3 className="text-center text-sm text-gray-400 mb-4">
                人格成分构成
              </h3>
              <div className="flex justify-center gap-3">
                {resultData.traits.map((trait, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-dark">
                      {trait.name}
                    </span>
                    <div className={`w-8 h-1 rounded-full ${trait.color}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-gray-100 text-dark rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <RotateCcw className="w-4 h-4" />
                再测一次
              </button>
              <button className="flex-1 py-3 bg-gradient-to-r from-cinnabar to-orange-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cinnabar/25 transition-all">
                <Share2 className="w-4 h-4" />
                分享结果
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-xs">
          Wordfolio LAB · 2026 新春实验室
        </div>
      </main>
    </div>
  );
}
