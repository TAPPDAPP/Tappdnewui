import { Home, Search, Users, Calendar, User } from "lucide-react";

const navItems = [
  { id: 'engage', label: 'Engage', icon: Home },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'reconnect', label: 'Reconnect', icon: Users },
  { id: 'host', label: 'Host', icon: Calendar },
  { id: 'profile', label: 'Profile', icon: User },
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 gradient-primary border-t border-border mobile-safe-area">
      <div className="flex items-center justify-around py-2 px-2 sm:px-4 w-full max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeTab;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-2 sm:px-3 rounded-lg transition-colors touch-manipulation ${
                isActive 
                  ? 'text-white bg-white/20' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}