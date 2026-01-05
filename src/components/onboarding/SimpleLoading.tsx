import { useEffect } from "react";

interface SimpleLoadingProps {
  onComplete: () => void;
}

export function SimpleLoading({ onComplete }: SimpleLoadingProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* TAPPD Logo */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white tracking-wider">TAPPD</h1>
      </div>

      {/* Simple Loading Animation using CSS */}
      <div className="relative mb-8">
        {/* Spinning Ring */}
        <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-primary animate-spin"></div>
        
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="flex items-center space-x-1">
        <span className="text-white/60">Loading</span>
        <span className="text-white/60 animate-pulse" style={{ animationDelay: "0s" }}>.</span>
        <span className="text-white/60 animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
        <span className="text-white/60 animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
      </div>
    </div>
  );
}