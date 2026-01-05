import { EventCard } from "./EventCard";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const trendingEvents = [
  {
    id: "t1",
    title: "Electronic Music Festival 2024",
    date: "Oct 1-3",
    time: "All Day",
    location: "Central Park Amphitheater",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "t2",
    title: "Exclusive Nightclub Opening",
    date: "Sep 30",
    time: "11:00 PM",
    location: "The Underground, Midtown",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "t3",
    title: "Community Pool Party",
    date: "Sep 29",
    time: "3:00 PM",
    location: "Riverside Community Center",
    image: "https://images.unsplash.com/photo-1562866470-3774249bef10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwb29sJTIwcGFydHklMjBzdW1tZXJ8ZW58MXx8fHwxNzU4MDU4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "t4",
    title: "Sufi Music Evening",
    date: "Oct 2",
    time: "7:00 PM",
    location: "Cultural Center",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZpJTIwbXVzaWN8ZW58MXx8fHwxNzU4MTU1ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "t5",
    title: "Date Night Special",
    date: "Oct 3",
    time: "8:00 PM",
    location: "Romantic Rooftop",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRhdGUlMjBuaWdodHxlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "t6",
    title: "Movie Marathon Night",
    date: "Oct 4",
    time: "6:00 PM",
    location: "Cinema Complex",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "t7",
    title: "Late Night Clubbing",
    date: "Oct 5",
    time: "12:00 AM",
    location: "Elite Club",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbHViJTIwbmlnaHRsaWZlfGVufDF8fHx8MTc1ODE1NTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

interface TrendingEventsProps {
  onEventSelect?: (eventId: string, eventName: string) => void;
  onExploreAll?: () => void;
}

export function TrendingEvents({ onEventSelect, onExploreAll }: TrendingEventsProps) {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="text-white">Trending in Your Area</h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide" style={{ touchAction: 'pan-x' }}>
        {trendingEvents.map((event) => (
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