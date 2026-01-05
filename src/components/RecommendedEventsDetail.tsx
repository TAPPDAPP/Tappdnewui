import { ArrowLeft } from "lucide-react";
import { EventCard } from "./EventCard";
import { ScrollArea } from "./ui/scroll-area";

interface RecommendedEventsDetailProps {
  onBack: () => void;
  onEventSelect?: (eventId: string, eventName: string) => void;
}

// Extended list of recommended events
const recommendedEvents = [
  {
    id: "1",
    title: "Summer Rooftop Party",
    date: "Sep 22, 2024",
    time: "8:00 PM",
    location: "Sky Lounge, Downtown",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 85
  },
  {
    id: "2",
    title: "Live Jazz Night",
    date: "Sep 24, 2024",
    time: "9:00 PM",
    location: "Blue Note Cafe",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 120
  },
  {
    id: "3",
    title: "Movie Night: Classic Cinema",
    date: "Sep 25, 2024",
    time: "7:30 PM",
    location: "Vintage Theater",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 65
  },
  {
    id: "4",
    title: "House Party Vibes",
    date: "Sep 26, 2024",
    time: "10:00 PM",
    location: "Private Residence",
    image: "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 95
  },
  {
    id: "5",
    title: "Pool Party Extravaganza",
    date: "Sep 28, 2024",
    time: "2:00 PM",
    location: "Aqua Resort",
    image: "https://images.unsplash.com/photo-1562866470-3774249bef10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwb29sJTIwcGFydHklMjBzdW1tZXJ8ZW58MXx8fHwxNzU4MDU4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 150
  },
  {
    id: "6",
    title: "Acoustic Coffee Sessions",
    date: "Sep 29, 2024",
    time: "6:00 PM",
    location: "Artisan Coffee House",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 45
  },
  {
    id: "7",
    title: "Sunset Yacht Party",
    date: "Sep 30, 2024",
    time: "5:00 PM",
    location: "Marina Harbor",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 75
  },
  {
    id: "8",
    title: "Wine & Paint Night",
    date: "Oct 1, 2024",
    time: "7:00 PM",
    location: "Art Studio Gallery",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 55
  },
  {
    id: "9",
    title: "Electronic Dance Night",
    date: "Oct 3, 2024",
    time: "11:00 PM",
    location: "The Warehouse Club",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbHViJTIwbmlnaHRsaWZlfGVufDF8fHx8MTc1ODE1NTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 200
  },
  {
    id: "10",
    title: "Brunch & Beats Sunday",
    date: "Oct 5, 2024",
    time: "11:00 AM",
    location: "Riverside Terrace",
    image: "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 110
  },
];

export function RecommendedEventsDetail({ onBack, onEventSelect }: RecommendedEventsDetailProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with back button */}
      <div className="flex items-center px-4 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="flex-1 text-center text-white pr-14">Recommended for You</h1>
      </div>

      {/* Events List */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-6 space-y-4 safe-bottom">
          {recommendedEvents.map((event) => (
            <div key={event.id} className="w-full">
              <EventCard
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                image={event.image}
                attendees={event.attendees}
                layout="list"
                onClick={() => onEventSelect?.(event.id, event.title)}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
