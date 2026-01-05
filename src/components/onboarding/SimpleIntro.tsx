import { useEffect, useState } from "react";
import { MapPin, Users, Heart } from "lucide-react";

interface SimpleIntroProps {
  onComplete: () => void;
}

const features = [
  {
    icon: MapPin,
    title: "Discover Events",
    description: "Find amazing events near you"
  },
  {
    icon: Users,
    title: "Connect",
    description: "Meet like-minded people"
  },
  {
    icon: Heart,
    title: "Share",
    description: "Create lasting memories"
  }
];

export function SimpleIntro({ onComplete }: SimpleIntroProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    // Show logo first
    const logoTimer = setTimeout(() => {
      setShowFeatures(true);
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (showFeatures) {
      const interval = setInterval(() => {
        setCurrentFeature(prev => {
          if (prev < features.length - 1) {
            return prev + 1;
          } else {
            setTimeout(onComplete, 1000);
            return prev;
          }
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showFeatures, onComplete]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo Section */}
      {!showFeatures && (
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            TAPPD
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
      )}

      {/* Features Section */}
      {showFeatures && (
        <div className="text-center w-full max-w-sm">
          {/* Small Logo */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-white tracking-wider">TAPPD</h1>
          </div>

          {/* Current Feature */}
          <div className="text-center">
            {/* Icon */}
            <div 
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #c451c9, #740182)"
              }}
            >
              <features[currentFeature].icon className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <h2 className="text-xl font-semibold text-white mb-3">
              {features[currentFeature].title}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {features[currentFeature].description}
            </p>

            {/* Progress */}
            <div className="flex justify-center space-x-2 mt-8">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentFeature ? 'bg-primary' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-6 text-white/60 hover:text-white transition-colors"
      >
        Skip
      </button>
    </div>
  );
}