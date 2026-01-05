import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { ChatSection } from "./engage/ChatSection";
import { PreferableMatchSection } from "./engage/PreferableMatchSection";
import { EventInteractionSection } from "./engage/EventInteractionSection";
import { TapToConnectSection } from "./engage/TapToConnectSection";

export function Engage() {
  const [activeSection, setActiveSection] = useState<'chat' | 'match' | 'interaction' | 'connect'>('interaction');

  const menuItems = [
    { id: 'chat' as const, label: 'Chat' },
    { id: 'match' as const, label: 'Preferable Match' },
    { id: 'interaction' as const, label: 'Event Interaction' },
    { id: 'connect' as const, label: 'Tap to Connect' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatSection />;
      case 'match':
        return <PreferableMatchSection />;
      case 'interaction':
        return <EventInteractionSection />;
      case 'connect':
        return <TapToConnectSection />;
      default:
        return <EventInteractionSection />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Fixed Top Menu Bar */}
      <div className="bg-background border-b border-white/10 px-4 py-3">
        <div className="flex justify-center">
          <div className="flex bg-white/5 rounded-lg p-1 max-w-full overflow-x-auto">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(item.id)}
                className={`
                  px-3 py-2 text-xs whitespace-nowrap min-w-fit
                  ${activeSection === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-hidden">
        {renderSection()}
      </div>
    </div>
  );
}