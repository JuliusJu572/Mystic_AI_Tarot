import React, { useState, useEffect } from 'react';
import { AppPhase, TarotCard } from './types';
import { TAROT_DECK } from './constants';
import { getTarotReading } from './services/geminiService';
import StarryBackground from './components/StarryBackground';
import Card from './components/Card';
import ReactMarkdown from 'react-markdown';
import { Sparkles, RefreshCw, Stars, Globe } from 'lucide-react';
import { translations, Language } from './translations';

// 简单的洗牌算法
const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck.map(card => ({ ...card, isReversed: Math.random() < 0.3 }));
};

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.WELCOME);
  const [question, setQuestion] = useState('');
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState('');
  const [isReadingLoading, setIsReadingLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese as per user locale preference usually
  const t = translations[language];

  // 初始化
  useEffect(() => {
    setDeck(shuffleDeck(TAROT_DECK));
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startSelection = () => {
    if (!question.trim()) return;
    setPhase(AppPhase.SHUFFLE);
    setTimeout(() => {
      setDeck(shuffleDeck(TAROT_DECK));
      setPhase(AppPhase.SELECTION);
    }, 2500);
  };

  const handleCardSelect = (index: number) => {
    if (selectedIndices.includes(index)) return;
    const newSelection = [...selectedIndices, index];
    setSelectedIndices(newSelection);

    if (newSelection.length === 3) {
      setPhase(AppPhase.REVEALING);
      processReading(newSelection);
    }
  };

  const processReading = async (indices: number[]) => {
      const selectedCards = indices.map(i => deck[i]);
      setTimeout(async () => {
        setIsReadingLoading(true);
        setPhase(AppPhase.INTERPRETATION);
        try {
          const text = await getTarotReading(question, selectedCards, language);
          setInterpretation(text);
        } catch (e) {
          setInterpretation(t.error);
        } finally {
          setIsReadingLoading(false);
        }
      }, 1500);
  };

  const resetApp = () => {
    setPhase(AppPhase.WELCOME);
    setQuestion('');
    setSelectedIndices([]);
    setInterpretation('');
    setDeck(shuffleDeck(TAROT_DECK));
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <StarryBackground>
      {/* 主容器: h-[100dvh] 锁定视口 */}
      <div className="relative w-full h-[100dvh] flex flex-col items-center overflow-hidden font-sans z-10">
        
        {/* --- Header --- */}
        <header className="w-full px-4 py-3 md:py-4 flex justify-between items-center bg-slate-900/40 backdrop-blur-md border-b border-white/5 z-50 shrink-0 h-16">
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={resetApp}>
                <Sparkles className="text-purple-400 w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                <h1 className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-200 to-amber-100 font-bold font-cinzel tracking-widest drop-shadow-md">
                  {t.title}
                </h1>
            </div>
            <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800/40 text-slate-400 hover:text-white hover:border-purple-400 transition-all text-xs font-bold tracking-wider"
            >
                <Globe size={14} />
                <span>{language === 'en' ? 'EN' : '中文'}</span>
            </button>
        </header>

        {/* --- Main Content --- */}
        <main className="flex-1 w-full max-w-7xl relative flex flex-col items-center justify-center p-4 min-h-0">
            
            {/* === PHASE: WELCOME === */}
            {phase === AppPhase.WELCOME && (
              <div className="text-center space-y-8 animate-float w-full max-w-lg px-4">
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-6xl font-cinzel text-slate-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    {t.subtitle}
                  </h2>
                  <p className="text-purple-200/60 text-xs md:text-sm tracking-[0.3em] uppercase">
                    {t.tagline}
                  </p>
                </div>

                <div className="relative w-full group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-30 transition-opacity duration-500"></div>
                  <input 
                    type="text" 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={t.placeholder}
                    className="relative w-full bg-slate-900/80 border border-slate-600/50 focus:border-purple-500/80 rounded-xl text-center text-lg md:text-xl py-4 px-6 outline-none transition-all placeholder:text-slate-500 text-purple-100 font-cinzel backdrop-blur-xl shadow-2xl"
                    onKeyDown={(e) => e.key === 'Enter' && startSelection()}
                  />
                </div>
                
                <button 
                    onClick={startSelection}
                    disabled={!question.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-900 to-purple-900 border border-purple-500/30 rounded-full text-amber-100 uppercase tracking-widest text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(88,28,135,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t.beginBtn}
                </button>
              </div>
            )}

            {/* === PHASE: SHUFFLE === */}
            {phase === AppPhase.SHUFFLE && (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative w-32 h-48 md:w-48 md:h-72">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="absolute inset-0 bg-slate-800 border border-purple-500/30 rounded-xl shadow-2xl origin-bottom" 
                                 style={{ 
                                     animation: `shuffleCard 2s ease-in-out infinite`,
                                     animationDelay: `${i * 0.1}s`,
                                     zIndex: i
                                 }}>
                                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900 to-black rounded-xl flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 border-2 border-purple-500/10 rounded-xl m-1"></div>
                                    <span className="text-4xl opacity-30 animate-pulse">☪</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-purple-200 font-cinzel text-lg tracking-[0.5em] animate-pulse">{t.shuffling}</p>
                </div>
            )}

            {/* === PHASE: SELECTION === */}
            {phase === AppPhase.SELECTION && (
                <div className="w-full h-full flex flex-col justify-between py-2 md:py-6">
                    <div className="text-center shrink-0">
                      <h3 className="text-xl md:text-2xl font-cinzel text-purple-100">{t.selectTitle}</h3>
                      <p className="text-purple-300/50 text-xs md:text-sm mt-1">{t.selectedCount(selectedIndices.length)}</p>
                    </div>

                    <div className="flex-1 relative flex items-center justify-center w-full overflow-hidden my-4 perspective-1000">
                        
                        <div className="relative w-full max-w-xs md:max-w-3xl h-40 md:h-64 flex justify-center items-end">
                            {deck.slice(0, 12).map((card, index) => {
                                const isSelected = selectedIndices.includes(index);
                                if (isSelected) return null;
                                
                                const totalCards = 12;
                                const center = totalCards / 2;
                                const spread = isMobile ? 12 : 35; 
                                const rotateSpread = isMobile ? 3 : 5; 
                                const rotate = (index - center) * rotateSpread;
                                const x = (index - center) * spread;
                                const y = Math.abs(index - center) * (isMobile ? 2 : 5); 

                                const isHoveredLocal = hoveredIndex === index;

                                return (
                                    <div 
                                      key={card.id} 
                                      onClick={() => handleCardSelect(index)}
                                      className="absolute transition-all duration-300 cursor-pointer origin-bottom hover:z-50"
                                      style={{ 
                                        transform: `rotate(${rotate}deg) translate(${x}px, ${y}px) translateY(${isHoveredLocal ? -30 : 0}px) scale(${isHoveredLocal ? 1.1 : 1})`,
                                        zIndex: index
                                      }}
                                    >
                                        <Card 
                                            isFlipped={false} 
                                            isHovered={isHoveredLocal}
                                            className="w-16 h-28 md:w-28 md:h-44 shadow-lg hover:shadow-purple-500/50"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="shrink-0 flex justify-center gap-4 md:gap-12 pb-4">
                          {[t.past, t.present, t.future].map((label, slot) => (
                              <div key={slot} className="flex flex-col items-center gap-2">
                                <div className={`w-16 h-24 md:w-24 md:h-36 border border-dashed rounded-lg flex items-center justify-center transition-all duration-500 ${selectedIndices[slot] !== undefined ? 'border-purple-400/50 bg-purple-900/20' : 'border-slate-700 bg-slate-900/20'}`}>
                                    {selectedIndices[slot] !== undefined ? (
                                        <Card isFlipped={false} className="w-full h-full" />
                                    ) : (
                                        <span className="text-slate-600 text-lg opacity-30">{slot + 1}</span>
                                    )}
                                </div>
                                <span className="text-[10px] uppercase tracking-wider text-purple-300/40">{label}</span>
                              </div>
                          ))}
                    </div>
                </div>
            )}

            {/* === PHASE: RESULT (INTERPRETATION) === */}
            {(phase === AppPhase.REVEALING || phase === AppPhase.INTERPRETATION) && (
                <div className="w-full h-full flex flex-col md:flex-row gap-4 md:gap-8 overflow-hidden animate-in fade-in duration-700">
                    
                    {/* 修复核心：左侧牌阵区域 
                       1. 移除了 md:justify-center，改用内部 div 的 m-auto。
                       2. 增加了 md:overflow-y-auto 以防屏幕过矮时无法查看全部。
                       3. 增加了 py-6 的上下内边距。
                    */}
                    <div className="shrink-0 md:w-1/3 md:h-full flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar scroll-smooth">
                        <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-8 p-4 m-auto min-w-full md:min-h-min">
                            {selectedIndices.map((deckIndex, slot) => {
                                const card = deck[deckIndex];
                                return (
                                    <div key={slot} className={`flex flex-col items-center transition-all duration-700 delay-${slot*200} ${phase === AppPhase.INTERPRETATION ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-amber-500/70 mb-2 font-bold">
                                            {slot === 0 ? t.past : slot === 1 ? t.present : t.future}
                                        </span>
                                        <div className="relative group">
                                             <Card card={card} isFlipped={true} className="w-20 h-32 md:w-40 md:h-64 shadow-xl" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 右侧：解读文本 */}
                    <div className="flex-1 bg-slate-950/50 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden flex flex-col min-h-0">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Stars className="text-purple-400" /></div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
                           {isReadingLoading ? (
                               <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                   <div className="w-12 h-12 border-2 border-purple-500/30 border-t-amber-200 rounded-full animate-spin"></div>
                                   <p className="text-purple-200 font-cinzel animate-pulse text-sm tracking-widest">{t.consulting}</p>
                               </div>
                           ) : (
                               <div className="prose prose-invert prose-sm md:prose-base prose-purple max-w-none">
                                   <ReactMarkdown components={{
                                       h1: (props) => <h1 className="text-xl md:text-2xl font-cinzel text-amber-100 border-b border-white/10 pb-2 mb-4" {...props} />,
                                       h2: (props) => <h2 className="text-lg md:text-xl font-cinzel text-purple-200 mt-6 mb-2" {...props} />,
                                       p: (props) => <p className="text-slate-300 font-light leading-relaxed mb-4" {...props} />,
                                       strong: (props) => <strong className="text-amber-200 font-normal" {...props} />,
                                   }}>
                                       {interpretation}
                                   </ReactMarkdown>
                                   
                                   <div className="pt-8 pb-4 flex justify-center">
                                       <button 
                                          onClick={resetApp}
                                          className="group flex items-center gap-2 px-6 py-2 rounded-full border border-purple-500/30 hover:bg-purple-900/30 transition-all text-xs uppercase tracking-widest text-purple-200"
                                       >
                                          <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500"/>
                                          <span>{t.newReading}</span>
                                       </button>
                                   </div>
                               </div>
                           )}
                        </div>
                    </div>

                </div>
            )}
        </main>
      </div>
    </StarryBackground>
  );
};

export default App;