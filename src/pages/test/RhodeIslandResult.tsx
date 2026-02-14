import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, RotateCcw } from 'lucide-react';

interface Trait {
  name: string;
  percentage: number;
  color: string;
  bgColor: string;
}

interface ResultData {
  keyword: string;
  englishName: string;
  chineseName: string;
  matchPercent: number;
  tags: { text: string; color: string }[];
  description: string;
  traits: Trait[];
}

// 随机生成 85-100 之间的整数
const randomPercent = () => Math.floor(Math.random() * 16) + 85;

// 生成罗德岛造梦师的结果数据
const generateRhodeIslandResultData = (): ResultData => ({
  keyword: 'VISIONARY',
  englishName: 'The RISD Dreamweaver',
  chineseName: '罗德岛 · 造梦师',
  matchPercent: randomPercent(),
  tags: [
    { text: '#视觉思维', color: 'bg-purple-100 text-purple-800' },
    { text: '#叙事治愈', color: 'bg-pink-100 text-pink-700' },
    { text: '#人文滤镜', color: 'bg-sky-100 text-sky-700' },
  ],
  description:
    '在孩子的眼睛里，藏着别人看不见的星辰大海，TA 总能用最细腻的感知力捕捉到平凡生活中的诗意。TA 不屑于冰冷的公式，更愿意用画面和故事去赋予万物灵魂，这种"人类滤镜"是 AI 时代最稀缺的宝藏。在艺术创作、视觉设计或创意策划领域，TA 将拥有无可比拟的爆发力。请守护好 TA 内心那片瑰丽的梦境，让 TA 继续用奇思妙想去缝补世界的裂缝，治愈人心。',
  traits: [
    { name: '艺术直觉', percentage: randomPercent(), color: 'from-purple-500 to-purple-700', bgColor: 'bg-purple-100' },
    { name: '想象维度', percentage: randomPercent(), color: 'from-pink-500 to-pink-700', bgColor: 'bg-pink-100' },
    { name: '共情深度', percentage: randomPercent(), color: 'from-sky-500 to-sky-700', bgColor: 'bg-sky-100' },
  ],
});

const STORAGE_KEY = 'rhodeIslandResultData';

export default function RhodeIslandResult() {
  const navigate = useNavigate();
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setResultData(JSON.parse(savedData));
    } else {
      const newData = generateRhodeIslandResultData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setResultData(newData);
    }
  }, []);

  useEffect(() => {
    if (!resultData) return;
    
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
  }, [resultData]);

  useEffect(() => {
    if (!resultData) return;
    
    const timer = setTimeout(() => {
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach((bar, index) => {
        if (bar instanceof HTMLElement) {
          const targetWidth = bar.getAttribute('data-target-width') || `${resultData.traits[index]?.percentage || 0}%`;
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 100 + index * 200);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [resultData]);

  if (!resultData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-warm pb-8">
      <header className="px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-dark">Wordfolio</span>
          <span className="text-xl font-bold text-cinnabar">·新春实验室</span>
        </div>
      </header>

      <main className="px-4 sm:px-6">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-purple-700 via-pink-600 to-sky-500 p-6 text-white relative">
            <div className="flex justify-center mb-4">
              <span className="px-3 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                2026 天赋关键词
              </span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="text-left flex-1">
                <div className="text-3xl font-bold">{resultData.chineseName}</div>
                <div className="text-xl text-white/90 mt-2">{resultData.englishName}</div>
              </div>

              <div className="relative w-28 h-28 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/10 border border-white/30"></div>
                <div className="absolute inset-2 rounded-full border-4 border-white/20" />
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.95)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(animatedPercent / 100) * 276} 276`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-5 rounded-full bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center border border-white/30">
                  <span className="text-xs text-white/90 font-semibold">契合度</span>
                  <span className="text-xl font-black text-white">{animatedPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 -mt-4 relative">
            <p className="text-center text-gray-600 text-lg mb-2 font-medium">
              天赋力关键词是
            </p>

            <h1 className="text-center text-4xl font-black text-dark mb-4" style={{ fontFamily: "'Noto Sans SC', 'Arial Black', sans-serif", fontWeight: 900 }}>
              {resultData.keyword}
            </h1>

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

            <div className="bg-gray-100 rounded-2xl p-5 mb-6 border border-gray-300 shadow-sm relative">
              <span className="absolute -top-2.5 left-4 px-4 py-1 bg-purple-700 text-white rounded-lg text-sm font-semibold border border-gray-300">
                天赋侧写
              </span>
              <p className="text-gray-600 leading-relaxed text-sm font-normal pt-4">
                "{resultData.description}"
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-center text-sm text-dark mb-4">
                人格成分构成
              </h3>
              <div className="flex space-x-1">
                {resultData.traits.map((trait, index) => (
                  <div key={index} className="relative h-7 rounded-full overflow-hidden bg-gray-200 flex-1 border border-gray-300 shadow-sm">
                    <div
                      className="absolute inset-0 rounded-full progress-bar"
                      data-target-width={`${trait.percentage}%`}
                      style={{
                        background: trait.color === 'from-purple-500 to-purple-700'
                          ? 'linear-gradient(to right, #8b5cf6, #6d28d9)'
                          : trait.color === 'from-pink-500 to-pink-700'
                            ? 'linear-gradient(to right, #ec4899, #be185d)'
                            : 'linear-gradient(to right, #0ea5e9, #0369a1)',
                        width: 0,
                        transition: 'width 1.5s ease-out',
                        transitionDelay: `${index * 0.2}s`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-1">
                      <span
                        className="text-xs font-semibold text-white z-10 truncate drop-shadow-sm"
                        style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}
                      >
                        {trait.name}
                      </span>
                      <span
                        className="text-xs font-semibold text-white z-10 drop-shadow-sm"
                        style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}
                      >
                        {trait.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  navigate('/test');
                }}
                className="flex-1 py-3 bg-gray-100 text-dark rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors border border-gray-300 shadow-sm text-base"
              >
                <RotateCcw className="w-4 h-4" />
                再测一次
              </button>
              <button
                className="flex-1 py-3 bg-gradient-to-r from-purple-700 via-pink-600 to-sky-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-900/25 transition-all border border-gray-300 shadow-sm text-base"
              >
                <Share2 className="w-4 h-4" />
                分享结果
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-400 text-xs">
          Wordfolio LAB · 2026 新春实验室
        </div>
      </main>
    </div>
  );
}
