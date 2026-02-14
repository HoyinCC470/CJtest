import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Ticket } from 'lucide-react';

export default function TestPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleUnlock = () => {
    // 简单验证，实际应该调用 API
    if (password.trim()) {
      navigate('/test/mit-result');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-warm">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-dark">Wordfolio</span>
          <span className="text-lg font-bold text-cinnabar">.LAB</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          <span className="text-xl">☀️</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Lock Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-cinnabar/20 rounded-2xl flex items-center justify-center">
            <Lock className="w-10 h-10 text-cinnabar" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-dark mb-2">报告已生成</h1>
          <p className="text-gray-500">请输入新春口令解锁您的天赋报告</p>
        </div>

        {/* Password Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          {/* Input */}
          <div className="mb-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入新春口令"
              className="w-full py-4 px-6 bg-gray-100 rounded-xl text-center text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cinnabar/20"
            />
          </div>

          {/* Unlock Button */}
          <button
            onClick={handleUnlock}
            className="w-full py-4 bg-gradient-to-r from-cinnabar to-orange-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cinnabar/25 transition-all active:scale-[0.98]"
          >
            立即解锁结果
          </button>
        </div>

        {/* Get Password Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-center text-cinnabar font-medium mb-4">还没有口令？</p>
          <button className="w-full py-4 bg-gradient-to-r from-gold to-yellow-400 text-dark rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/25 transition-all active:scale-[0.98]">
            <Ticket className="w-5 h-5" />
            立即获取新春口令
          </button>
        </div>
      </main>
    </div>
  );
}
