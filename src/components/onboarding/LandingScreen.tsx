import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface LandingScreenProps {
  onComplete: () => void;
}

export function LandingScreen({ onComplete }: LandingScreenProps) {
  const [showInfinity, setShowInfinity] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Show infinity symbol after logo animation
    const infinityTimer = setTimeout(() => {
      setShowInfinity(true);
    }, 2000);

    // Show tagline after infinity appears
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 2800);

    // Complete landing after full animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(infinityTimer);
      clearTimeout(taglineTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo Animation */}
      <div className="relative mb-8">
        {/* TAPPD Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl font-bold text-white tracking-wider relative overflow-hidden"
        >
          TAPPD
          
          {/* Light passing through effect */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 1, 0] }}
            transition={{ 
              duration: 1.5, 
              delay: 0.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #c451c9 50%, transparent 100%)',
              filter: 'blur(1px)',
              mixBlendMode: 'overlay'
            }}
          />
        </motion.div>
      </div>

      {/* Infinity Symbol */}
      {showInfinity && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "backOut",
            scale: { type: "spring", stiffness: 200, damping: 20 }
          }}
          className="mb-6"
        >
          <svg
            width="80"
            height="40"
            viewBox="0 0 80 40"
            fill="none"
            className="text-primary"
          >
            <motion.path
              d="M20 20C20 31.0457 11.0457 40 0 40C-11.0457 40 -20 31.0457 -20 20C-20 8.9543 -11.0457 0 0 0C11.0457 0 20 8.9543 20 20ZM60 20C60 8.9543 68.9543 0 80 0C91.0457 0 100 8.9543 100 20C100 31.0457 91.0457 40 80 40C68.9543 40 60 31.0457 60 20Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              transform="translate(-20, 0)"
            />
          </svg>
        </motion.div>
      )}

      {/* Tagline */}
      {showTagline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white/80 text-lg text-center tracking-wide"
        >
          Tap into your world
        </motion.p>
      )}
    </div>
  );
}