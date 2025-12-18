import React, { useState, useEffect } from 'react';
import { TarotCard } from '../types';

interface CardProps {
  card?: TarotCard;
  isFlipped: boolean;
  onClick?: () => void;
  isHovered?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick, isHovered, className = "", style }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (card) {
      setImgSrc(card.image);
      setHasError(false);
    }
  }, [card]);

  const handleImageError = () => {
    if (!card) return;
    const filename = card.image.split('/').pop();
    // 简单的回退逻辑，实际项目中可根据路径结构调整
    if (imgSrc.startsWith('/cards/')) setHasError(true); 
    else setImgSrc(`/cards/${filename}`); 
  };

  return (
    <div 
        className={`relative perspective-1000 cursor-pointer select-none transition-all duration-500 ease-out ${isHovered ? 'z-50' : 'z-0'} ${className}`}
        style={style}
        onClick={onClick}
    >
      <div className={`card-flip-inner relative w-full h-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] rounded-xl transition-transform duration-700 ${isFlipped ? 'card-flipped' : ''}`}>
        
        {/* === Card Back (背面) === */}
        <div className="card-back absolute w-full h-full bg-[#1a1a2e] rounded-xl overflow-hidden flex items-center justify-center border border-indigo-500/30 group">
            {/* 边框纹理 */}
            <div className="absolute inset-1 border border-amber-500/20 rounded-lg"></div>
            <div className="absolute inset-2 border border-indigo-400/10 rounded-lg"></div>
            
            {/* 背景图案 */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(88,28,135,0.4)_0%,_transparent_70%)]"></div>
            
            {/* 中心符号 */}
            <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 md:w-16 md:h-16 border border-amber-500/40 rotate-45 transition-transform duration-1000 group-hover:rotate-90"></div>
                <div className="absolute w-12 h-12 md:w-16 md:h-16 border border-purple-500/40 rotate-0 transition-transform duration-1000 group-hover:-rotate-45"></div>
                <span className="text-2xl md:text-4xl text-amber-100/60 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">☪</span>
            </div>
        </div>

        {/* === Card Front (正面) === */}
        <div className="card-front absolute w-full h-full bg-[#0f172a] rounded-xl overflow-hidden border border-amber-500/50 shadow-inner">
           {/* 光泽动画 */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_3s_infinite] pointer-events-none z-10"></div>
           
           {card && (
               <>
                 {!hasError ? (
                   <img 
                      src={imgSrc}
                      alt={card.name} 
                      className={`w-full h-full object-cover ${card.isReversed ? 'rotate-180' : ''}`} 
                      onError={handleImageError}
                   />
                 ) : (
                    // 图片加载失败的回退UI
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 p-2 text-center border-4 border-double border-slate-700">
                         <h4 className="text-amber-100 font-cinzel text-sm md:text-lg font-bold">{card.name}</h4>
                         <p className="text-purple-300/70 text-xs mt-1">{card.nameCN}</p>
                         {card.isReversed && <p className="text-red-400 text-[10px] mt-2 border border-red-900/50 px-1 rounded">REV</p>}
                    </div>
                 )}
                 
                 {/* 底部文字遮罩 */}
                 <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-8 pb-2 px-2 text-center z-20">
                     <h3 className="text-amber-50 text-[10px] md:text-xs font-bold font-cinzel tracking-wider truncate">{card.name}</h3>
                     {card.isReversed && <p className="text-red-400 text-[9px] uppercase tracking-widest leading-none mt-0.5">Reversed</p>}
                 </div>
               </>
           )}
        </div>

      </div>
    </div>
  );
};

export default Card;