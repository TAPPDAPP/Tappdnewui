import { useEffect, useState } from "react";

interface SimpleLandingProps {
  onComplete: () => void;
}

export function SimpleLanding({ onComplete }: SimpleLandingProps) {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Show tagline after brief delay
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 1500);

    // Complete landing animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="relative mb-8">
        <h1 className="text-6xl font-bold text-white tracking-wider animate-fade-in">
          TAPPD
        </h1>
      </div>

      {/* Simple infinity symbol using CSS */}
      <div className="mb-6">
        <div 
          className="w-20 h-10 border-2 border-primary rounded-full animate-pulse"
          style={{
            borderRadius: "50px 50px 50px 50px / 25px 25px 25px 25px",
            transform: "rotate(90deg)"
          }}
        />
      </div>

      {/* Tagline */}
      {showTagline && (
        <p className="text-white/80 text-lg text-center tracking-wide animate-fade-in-up">
          Tap into your world
        </p>
      )}
    </div>
  );
}