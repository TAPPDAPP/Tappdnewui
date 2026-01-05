import { EventCard } from "./EventCard";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const recommendedEvents = [
  {
    id: "1",
    title: "Summer Rooftop Party",
    date: "Sep 22",
    time: "8:00 PM",
    location: "Sky Lounge, Downtown",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "2", 
    title: "Live Jazz Night",
    date: "Sep 24",
    time: "9:00 PM",
    location: "Blue Note Cafe",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "3",
    title: "Movie Night: Classic Cinema",
    date: "Sep 25", 
    time: "7:30 PM",
    location: "Vintage Theater",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "4",
    title: "House Party Vibes",
    date: "Sep 26",
    time: "10:00 PM", 
    location: "Private Residence",
    image: "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "5",
    title: "Pool Party Extravaganza",
    date: "Sep 28",
    time: "2:00 PM",
    location: "Aqua Resort",
    image: "https://images.unsplash.com/photo-1562866470-3774249bef10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwb29sJTIwcGFydHklMjBzdW1tZXJ8ZW58MXx8fHwxNzU4MDU4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

interface RecommendedEventsProps {
  onEventSelect?: (eventId: string, eventName: string) => void;
  onExploreAll?: () => void;
}

export function RecommendedEvents({ onEventSelect, onExploreAll }: RecommendedEventsProps) {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="text-white">Recommended for You</h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide" style={{ touchAction: 'pan-x' }}>
        {recommendedEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            size="small" 
            onClick={() => onEventSelect?.(event.id, event.title)}
          />
        ))}
        
        {/* Explore All button */}
        <div className="flex-shrink-0 flex items-center justify-center w-32">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 rounded-full border-primary text-primary hover:gradient-primary hover:text-white hover:border-transparent"
            onClick={onExploreAll}
          >
            Explore All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}