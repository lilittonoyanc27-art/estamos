import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  Gamepad2,
  BookOpen,
  Trophy,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// --- Types ---

interface Question {
  sentence: string;
  translation: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// --- Data ---

const QUESTIONS: Question[] = [
  { 
    sentence: "Yo ___ de Armenia.", 
    translation: "Ես Հայաստանից եմ (ծագում):", 
    options: ["soy", "estoy"], 
    correctAnswer: "soy", 
    explanation: "Ser-ը օգտագործվում է ծագումը նշելու համար:" 
  },
  { 
    sentence: "Ella ___ muy cansada hoy.", 
    translation: "Նա այսօր շատ հոգնած է (վիճակ):", 
    options: ["es", "está"], 
    correctAnswer: "está", 
    explanation: "Estar-ը օգտագործվում է ժամանակավոր վիճակների համար:" 
  },
  { 
    sentence: "Nosotros ___ estudiantes.", 
    translation: "Մենք ուսանողներ ենք (մասնագիտություն):", 
    options: ["somos", "estamos"], 
    correctAnswer: "somos", 
    explanation: "Ser-ը օգտագործվում է մասնագիտության համար:" 
  },
  { 
    sentence: "¿Dónde ___ el baño?", 
    translation: "Որտե՞ղ է զուգարանը (տեղադրություն):", 
    options: ["es", "está"], 
    correctAnswer: "está", 
    explanation: "Estar-ը օգտագործվում է գտնվելու վայրի համար:" 
  },
  { 
    sentence: "Madrid ___ la capital de España.", 
    translation: "Մադրիդը Իսպանիայի մայրաքաղաքն է (փաստ):", 
    options: ["es", "está"], 
    correctAnswer: "es", 
    explanation: "Ser-ը օգտագործվում է հիմնական բնութագրերի համար:" 
  },
  { 
    sentence: "El café ___ muy caliente.", 
    translation: "Սուրճը շատ տաք է (վիճակ):", 
    options: ["es", "está"], 
    correctAnswer: "está", 
    explanation: "Estar-ը օգտագործվում է ջերմաստիճանի կամ վիճակի համար:" 
  },
  { 
    sentence: "Mis padres ___ profesores.", 
    translation: "Իմ ծնողները ուսուցիչներ են (մասնագիտություն):", 
    options: ["son", "están"], 
    correctAnswer: "son", 
    explanation: "Ser-ը օգտագործվում է մասնագիտության համար:" 
  },
  { 
    sentence: "Hoy ___ lunes.", 
    translation: "Այսօր երկուշաբթի է (ժամանակ):", 
    options: ["es", "está"], 
    correctAnswer: "es", 
    explanation: "Ser-ը օգտագործվում է ամսաթվի և ժամանակի համար:" 
  },
  { 
    sentence: "Vosotros ___ muy inteligentes.", 
    translation: "Դուք շատ խելացի եք (բնավորություն):", 
    options: ["sois", "estáis"], 
    correctAnswer: "sois", 
    explanation: "Ser-ը օգտագործվում է բնավորության գծերի համար:" 
  },
  { 
    sentence: "¿Cómo ___ tú?", 
    translation: "Ինչպե՞ս ես դու (ինքնազգացողություն):", 
    options: ["eres", "estás"], 
    correctAnswer: "estás", 
    explanation: "Estar-ը օգտագործվում է ինքնազգացողության համար:" 
  },
  { 
    sentence: "La puerta ___ abierta.", 
    translation: "Դուռը բաց է (վիճակ):", 
    options: ["es", "está"], 
    correctAnswer: "está", 
    explanation: "Estar-ը օգտագործվում է արդյունքի կամ վիճակի համար:" 
  },
  { 
    sentence: "Tú ___ mi mejor amigo.", 
    translation: "Դու իմ լավագույն ընկերն ես (հարաբերություն):", 
    options: ["eres", "estás"], 
    correctAnswer: "eres", 
    explanation: "Ser-ը օգտագործվում է հարաբերությունների համար:" 
  }
];

export default function App() {
  const [gameState, setGameState] = useState<'menu' | 'theory' | 'game' | 'results'>('menu');
  
  // Game State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const startGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setFeedback(null);
    setSelectedOption(null);
    setGameState('game');
  };

  const handleAnswer = (ans: string) => {
    if (selectedOption) return;
    
    setSelectedOption(ans);
    const isCorrect = ans === QUESTIONS[currentIdx].correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentIdx + 1 < QUESTIONS.length) {
        setCurrentIdx(prev => prev + 1);
        setFeedback(null);
        setSelectedOption(null);
      } else {
        setGameState('results');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] flex flex-col font-sans text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <header className="p-6 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 rounded-2xl backdrop-blur-md border border-indigo-500/30">
              <Gamepad2 className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Արթուրի համար</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 overflow-hidden">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {gameState === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-[48px] p-12 border border-white/10 shadow-2xl text-center">
                  <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Ser vs Estar</h2>
                  <p className="text-indigo-200/60 font-medium mb-10">Սովորիր իսպաներենի ամենակարևոր բայերը</p>
                  
                  <div className="grid grid-cols-1 gap-5">
                    <button
                      onClick={() => setGameState('theory')}
                      className="group relative w-full py-6 bg-white/5 hover:bg-white/10 text-white rounded-3xl font-bold text-2xl border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Տեսություն (Theory)
                      <BookOpen className="w-7 h-7 text-indigo-400" />
                    </button>

                    <button
                      onClick={startGame}
                      className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black text-2xl shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all active:scale-95 flex items-center justify-center gap-4"
                    >
                      Սկսել Խաղը
                      <Gamepad2 className="w-7 h-7" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'theory' && (
              <motion.div
                key="theory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-[48px] p-10 border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black text-white">Տեսություն</h2>
                    <button onClick={() => setGameState('menu')} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors">
                      <RotateCcw className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    <section className="bg-indigo-500/10 p-6 rounded-3xl border border-indigo-500/20">
                      <h3 className="text-2xl font-black text-indigo-400 mb-4">SER (Լինել)</h3>
                      <p className="text-indigo-100/80 mb-4 font-medium leading-relaxed">
                        Օգտագործվում է մշտական կամ երկարատև հատկանիշների, փաստերի և էության համար։
                      </p>
                      <ul className="space-y-3 text-sm font-bold text-indigo-200/70">
                        <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> <span><b>Ծագում:</b> Ես Հայաստանից եմ (Soy de Armenia)</span></li>
                        <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> <span><b>Մասնագիտություն:</b> Նա ուսուցիչ է (Es profesor)</span></li>
                        <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> <span><b>Բնավորություն:</b> Դու խելացի ես (Eres inteligente)</span></li>
                        <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> <span><b>Ժամանակ:</b> Ժամը հինգն է (Son las cinco)</span></li>
                        <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> <span><b>Ֆիզիկական տվյալներ:</b> Նա բոյով է (Él es alto)</span></li>
                        <li className="flex items-start gap-2"><span className="text-indigo-400">•</span> <span><b>Ազգություն:</b> Մենք հայ ենք (Somos armenios)</span></li>
                      </ul>
                    </section>

                    <section className="bg-purple-500/10 p-6 rounded-3xl border border-purple-500/20">
                      <h3 className="text-2xl font-black text-purple-400 mb-4">ESTAR (Լինել/Գտնվել)</h3>
                      <p className="text-purple-100/80 mb-4 font-medium leading-relaxed">
                        Օգտագործվում է ժամանակավոր վիճակների, տրամադրության կամ գտնվելու վայրի համար։
                      </p>
                      <ul className="space-y-3 text-sm font-bold text-purple-200/70">
                        <li className="flex items-start gap-2"><span className="text-purple-400">•</span> <span><b>Գտնվելու վայր:</b> Ես տանն եմ (Estoy en casa)</span></li>
                        <li className="flex items-start gap-2"><span className="text-purple-400">•</span> <span><b>Տրամադրություն:</b> Նա ուրախ է (Está feliz)</span></li>
                        <li className="flex items-start gap-2"><span className="text-purple-400">•</span> <span><b>Առողջություն:</b> Մենք հիվանդ ենք (Estamos enfermos)</span></li>
                        <li className="flex items-start gap-2"><span className="text-purple-400">•</span> <span><b>Ժամանակավոր վիճակ:</b> Սուրճը տաք է (El café está caliente)</span></li>
                        <li className="flex items-start gap-2"><span className="text-purple-400">•</span> <span><b>Գործողություն:</b> Ես կարդում եմ (Estoy leyendo)</span></li>
                      </ul>
                    </section>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'game' && (
              <motion.div
                key="game"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-[48px] p-10 border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-10">
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Հարց {currentIdx + 1} / {QUESTIONS.length}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <Trophy className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black text-emerald-400">{score}</span>
                    </div>
                  </div>

                  <div className="text-center mb-12">
                    <h3 className="text-4xl font-black text-white mb-4 leading-tight">
                      {QUESTIONS[currentIdx].sentence}
                    </h3>
                    <p className="text-indigo-200/60 font-bold italic text-lg">
                      {QUESTIONS[currentIdx].translation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {QUESTIONS[currentIdx].options.map((option, i) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === QUESTIONS[currentIdx].correctAnswer;
                      
                      let btnClass = "bg-white/5 border-white/10 text-white hover:bg-white/10";
                      if (selectedOption) {
                        if (isCorrect) btnClass = "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]";
                        else if (isSelected) btnClass = "bg-red-500 border-red-400 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]";
                        else btnClass = "bg-white/5 border-white/10 text-white/20 opacity-50";
                      }

                      return (
                        <button
                          key={i}
                          disabled={!!selectedOption}
                          onClick={() => handleAnswer(option)}
                          className={`group relative py-6 px-8 rounded-3xl font-black text-2xl border transition-all duration-300 flex items-center justify-between ${btnClass}`}
                        >
                          {option}
                          {selectedOption && isCorrect && <CheckCircle2 className="w-8 h-8 text-white" />}
                          {selectedOption && isSelected && !isCorrect && <XCircle className="w-8 h-8 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-[48px] p-12 border border-white/10 shadow-2xl text-center">
                  <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-indigo-500/30">
                    <Trophy className="w-12 h-12 text-indigo-400" />
                  </div>
                  
                  <h2 className="text-5xl font-black text-white mb-2">Ավարտ</h2>
                  <p className="text-2xl font-bold text-indigo-200/60 mb-10">
                    Արդյունքը: <span className="text-indigo-400 text-4xl">{score}</span> / {QUESTIONS.length}
                  </p>

                  <div className="mb-10 rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl aspect-video relative group">
                    <img 
                      src={`https://picsum.photos/seed/${score >= 7 ? 'success' : 'learning'}/800/450`} 
                      alt="Result"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent flex items-end justify-center p-6">
                      <span className="text-xl font-black uppercase tracking-widest text-white">
                        {score >= 9 ? "Գերազանց!" : score >= 7 ? "Շատ լավ!" : "Շարունակիր սովորել"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setGameState('menu')}
                    className="w-full py-6 bg-white text-indigo-950 rounded-3xl font-black text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4"
                  >
                    Վերադառնալ Մենյու
                    <RotateCcw className="w-7 h-7" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
        Spanish Master • Arthur's Edition • 2026
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
