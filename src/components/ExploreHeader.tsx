import { Search, Settings, Ticket, Bell, Map } from "lucide-react";
import { Input } from "./ui/input";

interface ExploreHeaderProps {
  activeSubTab: 'explore' | 'bookings' | 'map';
  onSubTabChange: (tab: 'explore' | 'bookings' | 'map') => void;
  onSettingsClick: () => void;
  onNotificationClick: () => void;
}

export function ExploreHeader({ 
  activeSubTab, 
  onSubTabChange, 
  onSettingsClick, 
  onNotificationClick 
}: ExploreHeaderProps) {
  return (
    <div className="bg-background border-b border-border w-full">
      {/* Welcome message */}
      <div className="text-center pt-3 pb-2 px-3 sm:px-4">
        <p className="text-muted-foreground text-sm">Welcome back,</p>
        <h2 className="text-primary text-lg sm:text-xl">Harsh Arora</h2>
      </div>
      
      {/* Top bar with logo, search, and icons */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 pb-3">
        {/* Logo space - Text version */}
        <div className="flex-shrink-0">
          <div className="text-lg sm:text-xl font-bold text-primary tracking-wider">
            TAPPD
          </div>
        </div>
        
        {/* Search bar */}
        <div className="flex-1 relative min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10 bg-input-background border border-white/10 rounded-full text-white placeholder:text-white/50 text-sm"
          />
        </div>
        
        {/* Action icons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button className="p-1.5 sm:p-2 rounded-full hover:bg-accent touch-manipulation" onClick={onSettingsClick}>
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-white" />
          </button>
          <button className="p-1.5 sm:p-2 rounded-full hover:bg-accent relative touch-manipulation" onClick={onNotificationClick}>
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-white/10">
        <button
          onClick={() => onSubTabChange('explore')}
          className={`flex-1 py-3 px-2 text-center transition-colors flex items-center justify-center gap-1 ${
            activeSubTab === 'explore'
              ? 'gradient-primary text-white border-b-2 border-primary'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Explore</span>
        </button>
        <button
          onClick={() => onSubTabChange('map')}
          className={`flex-1 py-3 px-2 text-center transition-colors flex items-center justify-center gap-1 ${
            activeSubTab === 'map'
              ? 'gradient-primary text-white border-b-2 border-primary'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Map className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Map</span>
        </button>
        <button
          onClick={() => onSubTabChange('bookings')}
          className={`flex-1 py-3 px-2 text-center transition-colors flex items-center justify-center gap-1 ${
            activeSubTab === 'bookings'
              ? 'gradient-primary text-white border-b-2 border-primary'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Bookings</span>
        </button>
      </div>
    </div>
  );
}