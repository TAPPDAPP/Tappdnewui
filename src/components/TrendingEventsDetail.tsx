import { ArrowLeft, TrendingUp } from "lucide-react";
import { EventCard } from "./EventCard";
import { ScrollArea } from "./ui/scroll-area";

interface TrendingEventsDetailProps {
  onBack: () => void;
  onEventSelect?: (eventId: string, eventName: string) => void;
}

// Extended list of trending events
const trendingEvents = [
  {
    id: "t1",
    title: "Electronic Music Festival 2024",
    date: "Oct 1-3, 2024",
    time: "All Day",
    location: "Central Park Amphitheater",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 500
  },
  {
    id: "t2",
    title: "Exclusive Nightclub Opening",
    date: "Sep 30, 2024",
    time: "11:00 PM",
    location: "The Underground, Midtown",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 350
  },
  {
    id: "t3",
    title: "Community Pool Party",
    date: "Sep 29, 2024",
    time: "3:00 PM",
    location: "Riverside Community Center",
    image: "https://images.unsplash.com/photo-1562866470-3774249bef10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwb29sJTIwcGFydHklMjBzdW1tZXJ8ZW58MXx8fHwxNzU4MDU4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 220
  },
  {
    id: "t4",
    title: "Sufi Music Evening",
    date: "Oct 2, 2024",
    time: "7:00 PM",
    location: "Cultural Center",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWZpJTIwbXVzaWN8ZW58MXx8fHwxNzU4MTU1ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 180
  },
  {
    id: "t5",
    title: "Date Night Special",
    date: "Oct 3, 2024",
    time: "8:00 PM",
    location: "Romantic Rooftop",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRhdGUlMjBuaWdodHxlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 140
  },
  {
    id: "t6",
    title: "Movie Marathon Night",
    date: "Oct 4, 2024",
    time: "6:00 PM",
    location: "Cinema Complex",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 95
  },
  {
    id: "t7",
    title: "Late Night Clubbing",
    date: "Oct 5, 2024",
    time: "12:00 AM",
    location: "Elite Club",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbHViJTIwbmlnaHRsaWZlfGVufDF8fHx8MTc1ODE1NTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 280
  },
  {
    id: "t8",
    title: "Hip Hop Showcase",
    date: "Oct 6, 2024",
    time: "9:00 PM",
    location: "Urban Stage",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 310
  },
  {
    id: "t9",
    title: "Beach Bonfire Night",
    date: "Oct 7, 2024",
    time: "7:30 PM",
    location: "Sunset Beach",
    image: "https://images.unsplash.com/photo-1562866470-3774249bef10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwb29sJTIwcGFydHklMjBzdW1tZXJ8ZW58MXx8fHwxNzU4MDU4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 165
  },
  {
    id: "t10",
    title: "Comedy Night Extravaganza",
    date: "Oct 8, 2024",
    time: "8:30 PM",
    location: "Laugh Factory",
    image: "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 190
  },
  {
    id: "t11",
    title: "Techno Underground Party",
    date: "Oct 10, 2024",
    time: "11:30 PM",
    location: "Basement Club",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 400
  },
  {
    id: "t12",
    title: "Food Truck Festival",
    date: "Oct 12, 2024",
    time: "12:00 PM",
    location: "City Plaza",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 600
  },
];

export function TrendingEventsDetail({ onBack, onEventSelect }: TrendingEventsDetailProps) {
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
        <div className="flex-1 flex items-center justify-center pr-14">
          <TrendingUp className="w-5 h-5 text-primary mr-2" />
          <h1 className="text-white">Trending in Your Area</h1>
        </div>
      </div>

      {/* Events List */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-6 space-y-4 safe-bottom">
          {trendingEvents.map((event) => (
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
