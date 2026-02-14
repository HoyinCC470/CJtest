import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: {
    key: string;
    text: string;
    bgColor: string;
    textColor: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: '春节最爱玩的活动？',
    options: [
      { key: 'A', text: '做手工/搭建一个东西', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '解谜/拼图/找规律', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '讲故事/表演/当主持', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '画画/贴贴纸/做漂亮卡片', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 2,
    question: '学一个新东西，他最容易开始的方式是？',
    options: [
      { key: 'A', text: '直接动手做一次', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '先弄懂原理再动', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '先跟别人聊/问清楚', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '先看到好看的示例', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 3,
    question: '让他坚持的动力更像？',
    options: [
      { key: 'A', text: '作品能"完成/展示"', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '我终于搞懂了', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '被认可/被听见', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '"好看/有感觉/有审美"', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 4,
    question: '遇到困难时，他更常见的反应？',
    options: [
      { key: 'A', text: '换个做法继续试', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '追问"为什么会这样"', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '找人讨论/求助', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '先停一下再重新整理呈现', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 5,
    question: '如果让他做一个春节任务，他更愿意选？',
    options: [
      { key: 'A', text: '做一个小作品/小物件', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '做一个小研究/小问题', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '做一个小演讲/祝福视频', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '做一张精美祝福卡/海报', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 6,
    question: '他最喜欢的"成就感"是？',
    options: [
      { key: 'A', text: '我做出来了！', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '我明白了！', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '我说清楚了！', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '我做得很美！', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 7,
    question: '学语言/学表达，他最不喜欢的是？',
    options: [
      { key: 'A', text: '光听不做', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '不解释原因只让记', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '不给我说的机会', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '只有字没有画面', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 8,
    question: '他更喜欢哪种学习节奏？',
    options: [
      { key: 'A', text: '短任务、立刻产出', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '慢一点、但逻辑清楚', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '有互动、有对话', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '有模板、有美感', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 9,
    question: '你夸他时，哪句最管用？',
    options: [
      { key: 'A', text: '"你做得很厉害！"', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '"你想得很透！"', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '"你讲得很清楚！"', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '"你做得真好看！"', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
  {
    id: 10,
    question: '春节收尾，他最想留下些什么？',
    options: [
      { key: 'A', text: '一个作品/成品', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
      { key: 'B', text: '一个发现/总结', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { key: 'C', text: '一段祝福/表达', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
      { key: 'D', text: '一套美美的纪念图', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
    ],
  },
];

export default function TestQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (optionKey: string) => {
    const newAnswers = [...answers, optionKey];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // 完成所有题目，保存答案并跳转到结果页
      localStorage.setItem('testAnswers', JSON.stringify(newAnswers));
      setTimeout(() => {
        // 计算结果类型
        const scores = { A: 0, B: 0, C: 0, D: 0 };
        newAnswers.forEach(answer => {
          scores[answer as keyof typeof scores]++;
        });

        // 平分时使用 Q3 或 Q6 作为 tie-breaker
        const tieBreaker = newAnswers[2]; // Q3
        const tieBreaker2 = newAnswers[5]; // Q6

        // 如果有平分情况，使用tie-breaker决定
        if (scores.A === scores.B && scores.A === scores.C && scores.A === scores.D) {
          // 如果四者平分，根据tie-breaker决定
          if (tieBreaker === 'A' || tieBreaker2 === 'A') {
            scores.A += 1;
          } else if (tieBreaker === 'B' || tieBreaker2 === 'B') {
            scores.B += 1;
          } else if (tieBreaker === 'C' || tieBreaker2 === 'C') {
            scores.C += 1;
          } else {
            scores.D += 1;
          }
        } else if (scores.A === scores.B && scores.A === scores.C && scores.A > scores.D) {
          // A, B, C 三者平分
          if (tieBreaker === 'A' || tieBreaker2 === 'A') {
            scores.A += 1;
          } else if (tieBreaker === 'B' || tieBreaker2 === 'B') {
            scores.B += 1;
          } else {
            scores.C += 1;
          }
        } else if (scores.A === scores.B && scores.A === scores.D && scores.A > scores.C) {
          // A, B, D 三者平分
          if (tieBreaker === 'A' || tieBreaker2 === 'A') {
            scores.A += 1;
          } else if (tieBreaker === 'B' || tieBreaker2 === 'B') {
            scores.B += 1;
          } else {
            scores.D += 1;
          }
        } else if (scores.A === scores.C && scores.A === scores.D && scores.A > scores.B) {
          // A, C, D 三者平分
          if (tieBreaker === 'A' || tieBreaker2 === 'A') {
            scores.A += 1;
          } else if (tieBreaker === 'C' || tieBreaker2 === 'C') {
            scores.C += 1;
          } else {
            scores.D += 1;
          }
        } else if (scores.B === scores.C && scores.B === scores.D && scores.B > scores.A) {
          // B, C, D 三者平分
          if (tieBreaker === 'B' || tieBreaker2 === 'B') {
            scores.B += 1;
          } else if (tieBreaker === 'C' || tieBreaker2 === 'C') {
            scores.C += 1;
          } else {
            scores.D += 1;
          }
        } else if (scores.A === scores.B && scores.A > scores.C && scores.A > scores.D) {
          // A, B 两者平分
          if (tieBreaker === 'A' || tieBreaker2 === 'A') {
            scores.A += 1;
          } else {
            scores.B += 1;
          }
        } else if (scores.A === scores.C && scores.A > scores.B && scores.A > scores.D) {
          // A, C 两者平分
          if (tieBreaker === 'A' || tieBreaker2 === 'A') {
            scores.A += 1;
          } else {
            scores.C += 1;
          }
        } else if (scores.A === scores.D && scores.A > scores.B && scores.A > scores.C) {
          // A, D 两者平分
          if (tieBreaker === 'A' || tieBreaker2 === 'A') {
            scores.A += 1;
          } else {
            scores.D += 1;
          }
        } else if (scores.B === scores.C && scores.B > scores.A && scores.B > scores.D) {
          // B, C 两者平分
          if (tieBreaker === 'B' || tieBreaker2 === 'B') {
            scores.B += 1;
          } else {
            scores.C += 1;
          }
        } else if (scores.B === scores.D && scores.B > scores.A && scores.B > scores.C) {
          // B, D 两者平分
          if (tieBreaker === 'B' || tieBreaker2 === 'B') {
            scores.B += 1;
          } else {
            scores.D += 1;
          }
        } else if (scores.C === scores.D && scores.C > scores.A && scores.C > scores.B) {
          // C, D 两者平分
          if (tieBreaker === 'C' || tieBreaker2 === 'C') {
            scores.C += 1;
          } else {
            scores.D += 1;
          }
        }

        // 确定最高分类型
        let resultType = 'A';
        if (scores.B > scores[resultType as keyof typeof scores]) resultType = 'B';
        if (scores.C > scores[resultType as keyof typeof scores]) resultType = 'C';
        if (scores.D > scores[resultType as keyof typeof scores]) resultType = 'D';

        // 保存结果类型到localStorage
        localStorage.setItem('testResultType', resultType);
        
        // 根据类型跳转到对应结果页
        if (resultType === 'A') {
          navigate('/test/mit-result');
        } else if (resultType === 'B') {
          navigate('/test/oxford-result');
        } else if (resultType === 'C') {
          navigate('/test/harvard-yale-result');
        } else if (resultType === 'D') {
          navigate('/test/rhode-island-result');
        } else {
          navigate('/test/result');
        }
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-warm">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <span className="text-xl font-extrabold text-dark">Wordfolio</span>
          <span className="text-xl font-extrabold text-cinnabar">·新春实验室</span>
        </div>
      </header>

      {/* Enhanced Progress */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between text-base text-gray-600 mb-3 font-semibold">
          <span>第 {currentQuestion + 1} 题</span>
          <span>共 10 题</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cinnabar to-orange-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <main className="px-6 py-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {/* Question */}
          <h2 className="text-xl font-bold text-dark leading-relaxed mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSelect(option.key)}
                className={`w-full p-4 rounded-2xl ${option.bgColor.replace('50', '100')} text-left transition-transform active:scale-[0.98]`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center font-bold ${option.textColor}`}>
                    {option.key}
                  </span>
                  <span className={`font-semibold ${option.textColor}`}>
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Question Counter */}
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm font-medium">
          第 {currentQuestion + 1} / 10 题
        </p>
      </div>
    </div>
  );
}
