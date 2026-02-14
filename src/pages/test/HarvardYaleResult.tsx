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

// 生成哈佛耶鲁领袖的结果数据
const generateHarvardYaleResultData = (): ResultData => ({
  keyword: 'INFLUENTIAL',
  englishName: 'The Harvard/Yale Leader',
  chineseName: '哈佛/耶鲁 · 领袖',
  matchPercent: randomPercent(),
  tags: [
    { text: '#聚光灯体质', color: 'bg-green-100 text-green-800' },
    { text: '#表达大师', color: 'bg-amber-100 text-amber-700' },
    { text: '#共情驱动', color: 'bg-red-100 text-red-800' },
  ],
  description:
    '您的孩子似乎自带一种温暖而强大的磁场，开口的瞬间就能成为人群中的焦点。TA 不仅擅长清晰地表达观点，更拥有看穿人心的共情力，总能用语言凝聚起向上的力量。这种纯正的领袖气质，让 TA 在团队协作与社会交往中游刃有余。2026 年，请勇敢地让孩子握住属于 TA 的"麦克风"。这个世界需要 TA 的声音，更需要 TA 带领大家去往更远、更有光亮的地方。',
  traits: [
    { name: '演讲感召', percentage: randomPercent(), color: 'from-green-600 to-green-800', bgColor: 'bg-green-100' },
    { name: '情感智力', percentage: randomPercent(), color: 'from-red-600 to-red-800', bgColor: 'bg-red-100' },
    { name: '决策果断', percentage: randomPercent(), color: 'from-amber-500 to-amber-700', bgColor: 'bg-amber-100' },
  ],
});

const STORAGE_KEY = 'harvardYaleResultData';

export default function HarvardYaleResult() {
  const navigate = useNavigate();
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setResultData(JSON.parse(savedData));
    } else {
      const newData = generateHarvardYaleResultData();
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
          <div className="bg-gradient-to-br from-green-800 via-green-700 to-red-900 p-6 text-white relative">
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
              <span className="absolute -top-2.5 left-4 px-4 py-1 bg-green-800 text-white rounded-lg text-sm font-semibold border border-gray-300">
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
                        background: trait.color === 'from-green-600 to-green-800'
                          ? 'linear-gradient(to right, #16a34a, #166534)'
                          : trait.color === 'from-red-600 to-red-800'
                            ? 'linear-gradient(to right, #dc2626, #991b1b)'
                            : 'linear-gradient(to right, #f59e0b, #b45309)',
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
                className="flex-1 py-3 bg-gradient-to-r from-green-800 to-red-900 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-900/25 transition-all border border-gray-300 shadow-sm text-base"
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
