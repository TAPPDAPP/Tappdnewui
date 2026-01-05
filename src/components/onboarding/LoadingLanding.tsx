import { useEffect } from 'react';

interface LoadingLandingProps {
  onComplete: () => void;
}

export function LoadingLanding({ onComplete }: LoadingLandingProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Reduced to 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen-mobile bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Simple Door Animation - Responsive */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 max-w-[85vw] max-h-[60vh]">
        {/* Background Behind Doors */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 via-background to-primary/5">
          {/* Simple particles */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/40 rounded-full opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full opacity-0 animate-fade-in" style={{ animationDelay: '1.8s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary/50 rounded-full opacity-0 animate-fade-in" style={{ animationDelay: '2.1s' }}></div>
        </div>

        {/* Left Door - Simplified */}
        <div 
          className="absolute left-0 top-0 w-1/2 h-full rounded-l-lg border border-white/5 origin-left transition-transform duration-1000 ease-out"
          style={{ 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(196,81,201,0.05) 50%, rgba(116,1,130,0.03) 100%)',
            transform: 'perspective(800px) rotateY(0deg)',
            animation: 'simple-door-left 1.2s ease-out 0.8s forwards'
          }}
        >
          {/* Simple Door Panel */}
          <div className="absolute inset-3 border border-white/5 rounded-md"></div>
          
          {/* Simple Door Handle */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-4 bg-gradient-to-r from-white/30 to-primary/20 rounded-full border border-white/10"></div>
          </div>
        </div>

        {/* Right Door - Simplified */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full rounded-r-lg border border-white/5 origin-right transition-transform duration-1000 ease-out"
          style={{ 
            background: 'linear-gradient(145deg, rgba(116,1,130,0.03) 0%, rgba(196,81,201,0.05) 50%, rgba(255,255,255,0.02) 100%)',
            transform: 'perspective(800px) rotateY(0deg)',
            animation: 'simple-door-right 1.2s ease-out 0.8s forwards'
          }}
        >
          {/* Simple Door Panel */}
          <div className="absolute inset-3 border border-white/5 rounded-md"></div>
          
          {/* Simple Door Handle */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-4 bg-gradient-to-l from-white/30 to-primary/20 rounded-full border border-white/10"></div>
          </div>
        </div>

        {/* Content Revealed Behind Doors */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 px-2" style={{ animation: 'simple-content-reveal 0.8s ease-out 1.5s forwards' }}>
          {/* Simple TAPPD Text Logo - Responsive */}
          <div className="relative z-10">
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-wider">
              <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                TAPPD
              </span>
            </div>
          </div>

          {/* Tagline - Responsive */}
          <div className="mt-3 sm:mt-4 text-white text-center relative z-10 px-2">
            <span className="text-xs sm:text-sm tracking-wide bg-gradient-to-r from-white/80 via-primary/90 to-white/80 bg-clip-text text-transparent">
              Your door to endless opportunities
            </span>
          </div>

          {/* Simple Loading Dots */}
          <div className="flex justify-center space-x-1 mt-3 sm:mt-4 relative z-10">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      {/* Welcome Text - Responsive */}
      <div 
        className="mt-4 sm:mt-6 text-white/70 text-center opacity-0 animate-fade-in px-4"
        style={{ animationDelay: '2.2s' }}
      >
        <span className="text-xs tracking-widest uppercase">
          Welcome to TAPPD
        </span>
      </div>
    </div>
  );
}