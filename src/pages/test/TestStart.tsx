import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function TestStart() {
  const navigate = useNavigate();
  const [globeEmoji, setGlobeEmoji] = useState('🌍');
  const [currentNotification, setCurrentNotification] = useState<{id: number; text: string} | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const globeEmojis = ['🌎', '🌍', '🌏'];
    let i = 0;

    const interval = setInterval(() => {
      setGlobeEmoji(globeEmojis[i++ % globeEmojis.length]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Generate random notifications
  useEffect(() => {
    const names = ['李明', '张小华', '王思雨', '刘子涵', '陈浩然', '赵雅婷', '孙嘉豪', '周梦琪', '吴佳怡', '郑宇航', '林诗涵', '何俊熙', '黄梓涵', '杨欣怡', '徐浩宇', '谢佳颖', '马天佑', '高雨萱', '曹俊豪', '邓诗雨', '彭宇轩', '曾佳怡', '吕浩然', '苏欣怡', '卢俊杰', '蒋佳慧', '蔡浩宇', '丁诗涵', '魏俊熙', '叶欣悦'];
    const keywords = ['Creative', 'Analytical', 'Leader', 'Artist', 'Explorer', 'Strategist', 'Innovator', 'Visionary', 'Thinker', 'Builder', 'Dreamer', 'Pioneer', 'Creator', 'Scholar', 'Master', 'Genius', 'Expert', 'Champion', 'Winner', 'Star', 'Planner', 'Organizer', 'Problem-solver', 'Communicator', 'Collaborator', 'Mentor', 'Performer', 'Specialist', 'Professional', 'Ambassador'];

    let timeoutIds = [];

    const showNextNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

      // Display only the first character of the name followed by two asterisks
      const surname = randomName.charAt(0);
      const displayName = surname + '**';

      const newNotification = {
        id: Date.now(),
        text: `${displayName}同学的家长刚刚解锁了孩子的天赋关键词 ${randomKeyword}`
      };

      // Fade out current notification
      setShowNotification(false);

      // After fade out, wait 0.5 second then set new notification and fade in
      const pauseTimer = setTimeout(() => {
        setCurrentNotification(newNotification);
        setShowNotification(true);
      }, 800); // 0.5 second pause + 0.3s fade out time

      timeoutIds.push(pauseTimer);
    };

    // Show first notification immediately
    showNextNotification();

    // Show next notification every 5.5 seconds (0.3s fade out + 0.5s pause + 0.7s fade in + 4s display)
    const notificationInterval = setInterval(showNextNotification, 5500);
    timeoutIds.push(notificationInterval);

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
      clearInterval(notificationInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-warm">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-extrabold text-dark">Wordfolio</span>
          <span className="text-2xl font-extrabold text-cinnabar">·新春实验室</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-dark leading-tight mb-2" style={{ fontFamily: "'Noto Sans SC', 'Arial Black', sans-serif", fontWeight: 800 }}>
            解锁孩子的
            <br />
            <span className="text-cinnabar font-extrabold" style={{ fontWeight: 800 }}>2026学术天赋力</span>
            <span className="text-gold font-extrabold" style={{ fontWeight: 800 }}>MBTI</span>
          </h1>

          {/* Animated Globe Icon */}
          <div className="flex justify-center my-8">
            <span className="text-7xl">
              {globeEmoji}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed font-semibold mb-4">
            从波士顿的极客实验室到牛津的学术殿堂，每个孩子都潜藏着改变未来的独特基因。
          </p>
          <p className="text-gray-600 text-base leading-relaxed font-semibold mb-6">
            我们将通过 <span className="text-cinnabar font-bold">12 道精选生活情境题</span>，带您深度洞察孩子的性格底色，精准锚定 他/她 在 2026 时代的全球菁英身份。
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-cinnabar/10 text-cinnabar rounded-full text-sm font-semibold">
              # 全球名校画像模型
            </span>
            <span className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold">
              #多维潜能深度解析
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
              #2026专属成长指南
            </span>
          </div>

          {/* Start Button */}
          <button
            onClick={() => navigate('/test/quiz')}
            className="w-full py-4 bg-dark text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-dark/90 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            开始测试
          </button>
        </div>
      </main>

      {/* Footer Stats */}
      <div className="text-center py-6 relative">
        <p className="text-gray-400 text-sm">
          已有 <span className="text-cinnabar font-semibold">128,930</span> 位家长解锁孩子的学术天赋
        </p>

        {/* Notification Popup - positioned below the stats */}
        {currentNotification && (
          <div
            className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 z-50 max-w-3xl"
          >
            <div
              className={`bg-white rounded-lg shadow-lg px-5 py-3 border border-gray-200 ${
                showNotification ? 'animate-fade-in' : 'animate-fade-out'
              }`}
            >
              <p className="text-sm sm:text-base text-gray-700 font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                {(() => {
                  const text = currentNotification.text;
                  const keywordMatch = text.match(/天赋关键词\s+(.+)/);

                  if (keywordMatch) {
                    const keyword = keywordMatch[1];
                    const beforeKeyword = text.split('天赋关键词')[0] + '天赋关键词';

                    return (
                      <>
                        {beforeKeyword}{' '}
                        <span className="text-cinnabar font-semibold">{keyword}</span>
                      </>
                    );
                  }

                  return text;
                })()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
