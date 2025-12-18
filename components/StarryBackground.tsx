import React, { useMemo } from 'react';

const StarryBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Generate random stars
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f0c29] to-black text-white">
      {/* Stars layer */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div 
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse"
            style={{ 
              top: star.top, 
              left: star.left, 
              width: `${star.size}px`, 
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>
      
      {/* Nebulas - Enhanced */}
      <div className="absolute top-[-10%] left-[-10%] h-[60vh] w-[60vw] rounded-full bg-purple-900/30 blur-[120px] z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[60vh] w-[60vw] rounded-full bg-indigo-900/30 blur-[120px] z-0 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[40vh] w-[40vw] rounded-full bg-amber-900/10 blur-[100px] z-0"></div>

      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default StarryBackground;
