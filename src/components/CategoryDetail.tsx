import { ArrowLeft } from "lucide-react";
import { EventCard } from "./EventCard";
import { ScrollArea } from "./ui/scroll-area";

interface CategoryDetailProps {
  category: string;
  onBack: () => void;
  onEventSelect?: (eventId: string, eventName: string) => void;
}

// Mock events data for different categories
const getCategoryEvents = (category: string) => {
  const baseEvents = [
    {
      id: 1,
      title: `${category} Extravaganza`,
      date: "Dec 25, 2024",
      time: "8:00 PM",
      location: "Downtown Club",
      image: "https://images.unsplash.com/photo-1721133073235-e4b5facb27fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGV2ZW50JTIwbXVzaWN8ZW58MXx8fHwxNzU4MjE3ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      attendees: 120
    },
    {
      id: 2,
      title: `Ultimate ${category} Experience`,
      date: "Dec 28, 2024",
      time: "9:30 PM",
      location: "Rooftop Venue",
      image: "https://images.unsplash.com/photo-1649527296822-048c4a050d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGNyb3dkfGVufDF8fHx8MTc1ODIxNzg2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      attendees: 85
    },
    {
      id: 3,
      title: `${category} Vibes Only`,
      date: "Jan 2, 2025",
      time: "7:00 PM",
      location: "City Center",
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzU4MTIzMjYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      attendees: 200
    },
    {
      id: 4,
      title: `Exclusive ${category} Gathering`,
      date: "Jan 5, 2025",
      time: "8:30 PM",
      location: "Private Lounge",
      image: "https://images.unsplash.com/photo-1579254216656-3c0c16a3bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwYXJ0eSUyMHZlbnVlfGVufDF8fHx8MTc1ODIxNzg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      attendees: 65
    },
    {
      id: 5,
      title: `${category} Night Special`,
      date: "Jan 10, 2025",
      time: "10:00 PM",
      location: "Waterfront Hall",
      image: "https://images.unsplash.com/photo-1751891159950-bf33e1e8705b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHZlbnVlJTIwbGlnaHRzfGVufDF8fHx8MTc1ODIxNzg3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      attendees: 150
    },
    {
      id: 6,
      title: `Premium ${category} Event`,
      date: "Jan 15, 2025",
      time: "7:30 PM",
      location: "Grand Ballroom",
      image: "https://images.unsplash.com/photo-1739918533428-040764352a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcGFydHklMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTc4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      attendees: 300
    }
  ];

  return baseEvents;
};

export function CategoryDetail({ category, onBack, onEventSelect }: CategoryDetailProps) {
  const events = getCategoryEvents(category);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header with back button and category name */}
      <div className="flex items-center px-4 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="flex-1 text-center text-white pr-14">{category}</h1>
      </div>

      {/* Events List */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-6 space-y-4 safe-bottom">
          {events.map((event) => (
            <div key={event.id} className="w-full">
              <EventCard
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                image={event.image}
                attendees={event.attendees}
                layout="list"
                onClick={() => onEventSelect?.(event.id.toString(), event.title)}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}