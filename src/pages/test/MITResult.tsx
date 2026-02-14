import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

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

// 生成麻省理工创造家的结果数据
const generateMITResultData = (): ResultData => ({
  keyword: 'INVENTIVE',
  englishName: 'The MIT Maker',
  chineseName: '麻省理工 · 创造家',
  matchPercent: randomPercent(),
  tags: [
    { text: '#实干派', color: 'bg-slate-200 text-slate-700' },
    { text: '#极客精神', color: 'bg-gray-300 text-gray-700' },
    { text: '#手脑协同', color: 'bg-red-200 text-red-700' },
  ],
  description:
    '您的孩子天生拥有一双能够"变魔法"的双手，脑海中的奇思妙想从不只停留于纸面。TA 拒绝纸上谈兵，更喜欢在拆解与重组中发现世界的运行逻辑，这种"手脑合一"的爆发力，正是改变未来的底层动力。在工程、机器人或任何需要实干的领域，TA 都有着极高的天赋与直觉。2026 年，请继续鼓励 TA 大胆拆解。别担心 TA 弄坏玩具，TA 正在亲手打造一个属于自己的新世界。',
  traits: [
    { name: '工程逻辑', percentage: randomPercent(), color: 'from-slate-400 to-slate-600', bgColor: 'bg-slate-100' },
    { name: '动手实践', percentage: randomPercent(), color: 'from-gray-400 to-gray-600', bgColor: 'bg-gray-100' },
    { name: '迭代思维', percentage: randomPercent(), color: 'from-red-400 to-red-600', bgColor: 'bg-red-100' },
  ],
});

const STORAGE_KEY = 'mitResultData';

export default function MITResult() {
  const navigate = useNavigate();
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    // 检查 localStorage 是否已有结果数据
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      // 使用已保存的数据
      setResultData(JSON.parse(savedData));
    } else {
      // 生成新数据并保存
      const newData = generateMITResultData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setResultData(newData);
    }
  }, []);

  useEffect(() => {
    if (!resultData) return;
    
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
  }, [resultData]);

  // 动态设置进度条宽度
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
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold text-dark">Wordfolio</span>
          <span className="text-xl font-bold text-cinnabar">·新春实验室</span>
        </div>
      </header>

      {/* Result Card */}
      <main className="px-4 sm:px-6">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md max-w-2xl mx-auto">
          {/* Gradient Header */}
          <div className="bg-gradient-to-br from-cinnabar to-orange-500 p-6 text-white relative">
            {/* Top Badge */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                2026 天赋关键词
              </span>
            </div>

            {/* Match Circle and Chinese-English Name Row */}
            <div className="flex items-center justify-center gap-6">
              {/* Chinese Name with English Translation */}
              <div className="text-left flex-1">
                <div className="text-3xl font-bold">{resultData.chineseName}</div>
                <div className="text-xl text-white/90 mt-2">{resultData.englishName}</div>
              </div>

              {/* Enhanced Match Circle */}
              <div className="relative w-28 h-28 flex-shrink-0">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/10 border border-white/30"></div>

                {/* Background Circle */}
                <div className="absolute inset-2 rounded-full border-4 border-white/20" />

                {/* Progress Circle */}
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

                {/* Inner content circle */}
                <div className="absolute inset-5 rounded-full bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center border border-white/30">
                  <span className="text-xs text-white/90 font-semibold">契合度</span>
                  <span className="text-xl font-black text-white">{animatedPercent}%</span>
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
            <div className="bg-gray-100 rounded-2xl p-5 mb-6 border border-gray-300 shadow-sm relative">
              <span className="absolute -top-2.5 left-4 px-4 py-1 bg-cinnabar text-white rounded-lg text-sm font-semibold border border-gray-300">
                天赋侧写
              </span>
              <p className="text-gray-600 leading-relaxed text-sm font-normal pt-4">
                "{resultData.description}"
              </p>
            </div>

            {/* Traits */}
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
                        background: trait.color === 'from-slate-400 to-slate-600'
                          ? 'linear-gradient(to right, #94a3b8, #475569)'
                          : trait.color === 'from-gray-400 to-gray-600'
                            ? 'linear-gradient(to right, #9ca3af, #4b5563)'
                            : 'linear-gradient(to right, #f87171, #dc2626)',
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // 清除结果数据，下次重新生成
                  localStorage.removeItem(STORAGE_KEY);
                  navigate('/test');
                }}
                className="flex-1 py-3 bg-gray-100 text-dark rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors border border-gray-300 shadow-sm text-base"
              >
                <RotateCcw className="w-4 h-4" />
                再测一次
              </button>
              <button
                onClick={async () => {
                  const element = document.querySelector('.bg-white.rounded-3xl.overflow-hidden');
                  if (element) {
                    try {
                      const canvas = await html2canvas(element as HTMLElement, {
                        backgroundColor: '#fff',
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        width: element.clientWidth,
                        height: element.clientHeight
                      });

                      const image = canvas.toDataURL('image/png');
                      const link = document.createElement('a');
                      link.href = image;
                      link.download = 'test-result.png';
                      link.click();
                    } catch (error) {
                      console.error('Screenshot failed:', error);
                    }
                  }
                }}
                className="flex-1 py-3 bg-gradient-to-r from-cinnabar to-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cinnabar/25 transition-all border border-gray-300 shadow-sm text-base"
              >
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
