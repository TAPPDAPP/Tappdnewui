import { useEffect } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
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

      {/* Loading Animation */}
      <div className="relative mb-8">
        {/* Outer Circle */}
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-white/20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Circle with Gradient */}
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent bg-gradient-to-r from-primary to-chart-2 p-0.5"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </motion.div>

        {/* Center Dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        className="flex items-center space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-white/60">Loading</span>
        <motion.span
          className="text-white/60"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0,
          }}
        >
          .
        </motion.span>
        <motion.span
          className="text-white/60"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0.2,
          }}
        >
          .
        </motion.span>
        <motion.span
          className="text-white/60"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0.4,
          }}
        >
          .
        </motion.span>
      </motion.div>
    </div>
  );
}