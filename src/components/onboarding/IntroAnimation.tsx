import { useEffect, useState } from "react";
import { MapPin, Users, Heart } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const features = [
  {
    icon: MapPin,
    title: "Discover Local Events",
    description: "Find amazing events happening around you",
    color: "#c451c9"
  },
  {
    icon: Users,
    title: "Connect with People",
    description: "Meet like-minded individuals at events",
    color: "#a9016d"
  },
  {
    icon: Heart,
    title: "Share Experiences",
    description: "Create memories and share your moments",
    color: "#740182"
  }
];

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    // Initial logo animation
    const logoTimer = setTimeout(() => {
      setShowFeatures(true);
    }, 3000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (showFeatures) {
      // Cycle through features
      const featureInterval = setInterval(() => {
        setCurrentFeature(prev => {
          if (prev < features.length - 1) {
            return prev + 1;
          } else {
            // Complete the intro after showing all features
            setTimeout(onComplete, 1000);
            return prev;
          }
        });
      }, 2500);

      return () => clearInterval(featureInterval);
    }
  }, [showFeatures, onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background circles */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-10 animate-spin"
          style={{
            background: "radial-gradient(circle, #c451c9 0%, transparent 70%)",
            top: "-10%",
            right: "-20%",
            animationDuration: "20s"
          }}
        />
        
        <div 
          className="absolute w-80 h-80 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #a9016d 0%, transparent 70%)",
            bottom: "-10%",
            left: "-20%",
            animation: "spin 15s linear infinite reverse"
          }}
        />
      </div>

      {/* Logo Section */}
      {!showFeatures && (
        <div className="text-center z-10 animate-fade-in">
          {/* Main Logo */}
          <div className="relative mb-8">
            <h1 className="text-7xl font-bold text-white tracking-wider relative animate-logo-entrance">
              TAPPD
              {/* Glow effect */}
              <div
                className="absolute inset-0 text-7xl font-bold tracking-wider opacity-60 animate-glow-pulse"
                style={{
                  background: "linear-gradient(135deg, #c451c9, #a9016d, #740182)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  filter: "blur(8px)",
                }}
              >
                TAPPD
              </div>
            </h1>
          </div>

          {/* Floating Icons */}
          <div className="relative w-80 h-40 mx-auto">
            {[MapPin, Users, Heart].map((Icon, index) => (
              <div
                key={index}
                className="absolute animate-float-icon"
                style={{
                  left: `${20 + (index % 3) * 30}%`,
                  top: `${30 + Math.floor(index / 3) * 40}%`,
                  animationDelay: `${index * 0.3}s`
                }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-chart-2 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      {showFeatures && (
        <div className="text-center z-10 w-full max-w-sm animate-fade-in">
          {/* Small Logo */}
          <div className="mb-8 animate-logo-shrink">
            <h1 className="text-4xl font-bold text-white tracking-wider">TAPPD</h1>
          </div>

          {/* Feature Showcase */}
          <div className="text-center">
            {/* Feature Icon */}
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative animate-feature-spotlight"
              style={{
                background: `linear-gradient(135deg, ${features[currentFeature].color}, #740182)`,
              }}
            >
              <features[currentFeature].icon className="w-10 h-10 text-white" />
              
              {/* Orbiting dots */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-white/30 animate-orbit"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>

            {/* Feature Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-white mb-3">
                {features[currentFeature].title}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {features[currentFeature].description}
              </p>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeature 
                      ? 'bg-primary scale-125' 
                      : 'bg-white/30 scale-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="absolute w-2 h-2 rounded-full bg-primary/40 animate-particle-float"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${index * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-6 text-white/60 hover:text-white transition-colors z-20 animate-fade-in"
        style={{ animationDelay: '1s' }}
      >
        Skip
      </button>
    </div>
  );
}