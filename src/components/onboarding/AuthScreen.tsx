import { motion } from "motion/react";
import { Button } from "../ui/button";

interface AuthScreenProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function AuthScreen({ onLogin, onSignup }: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo and Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white tracking-wider mb-3">TAPPD</h1>
        <p className="text-white/70 text-lg">Tap into your world</p>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl font-semibold text-white mb-3">Welcome!</h2>
        <p className="text-white/60 text-base max-w-sm">
          Discover amazing events, connect with like-minded people, and create unforgettable experiences.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-sm space-y-4"
      >
        {/* Sign Up Button */}
        <Button
          onClick={onSignup}
          className="w-full h-12 bg-gradient-to-r from-chart-2 to-chart-3 hover:from-primary hover:to-chart-2 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started
        </Button>

        {/* Login Button */}
        <Button
          onClick={onLogin}
          variant="outline"
          className="w-full h-12 border-white/20 text-white hover:bg-white/5 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          I already have an account
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-white/40 text-sm">
          By continuing, you agree to our{" "}
          <button className="text-primary hover:underline">Terms of Service</button>
          {" "}and{" "}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </motion.div>
    </div>
  );
}