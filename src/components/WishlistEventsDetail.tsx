import { ArrowLeft, Heart } from "lucide-react";
import { EventCard } from "./EventCard";
import { ScrollArea } from "./ui/scroll-area";

interface WishlistEventsDetailProps {
  onBack: () => void;
  onEventSelect?: (eventId: string, eventName: string) => void;
}

// Extended list of wishlisted events
const wishlistedEvents = [
  {
    id: "w1",
    title: "Intimate House Concert",
    date: "Oct 5, 2024",
    time: "7:00 PM",
    location: "Artist's Studio, Brooklyn",
    image: "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 40,
    isWishlisted: true,
  },
  {
    id: "w2",
    title: "Silent Film & Wine Tasting",
    date: "Oct 8, 2024",
    time: "6:30 PM",
    location: "Historic Movie Palace",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 60,
    isWishlisted: true,
  },
  {
    id: "w3",
    title: "Jazz & Poetry Night",
    date: "Oct 10, 2024",
    time: "8:30 PM",
    location: "Cozy Cafe Downtown",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 50,
    isWishlisted: true,
  },
  {
    id: "w4",
    title: "Rooftop Sunset Party",
    date: "Oct 12, 2024",
    time: "5:00 PM",
    location: "Sky Deck Lounge",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 120,
    isWishlisted: true,
  },
  {
    id: "w5",
    title: "Pool Party Weekend",
    date: "Oct 14, 2024",
    time: "1:00 PM",
    location: "Resort Pool",
    image: "https://images.unsplash.com/photo-1562866470-3774249bef10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwb29sJTIwcGFydHklMjBzdW1tZXJ8ZW58MXx8fHwxNzU4MDU4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 180,
    isWishlisted: true,
  },
  {
    id: "w6",
    title: "Cozy Movie Evening",
    date: "Oct 16, 2024",
    time: "7:00 PM",
    location: "Home Theater",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 35,
    isWishlisted: true,
  },
  {
    id: "w7",
    title: "Exclusive Club Night",
    date: "Oct 18, 2024",
    time: "11:00 PM",
    location: "VIP Lounge",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbHViJTIwbmlnaHRsaWZlfGVufDF8fHx8MTc1ODE1NTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 150,
    isWishlisted: true,
  },
  {
    id: "w8",
    title: "Brunch & Mimosas",
    date: "Oct 19, 2024",
    time: "11:00 AM",
    location: "Garden Bistro",
    image: "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 70,
    isWishlisted: true,
  },
  {
    id: "w9",
    title: "Acoustic Open Mic",
    date: "Oct 21, 2024",
    time: "8:00 PM",
    location: "Local Coffee Shop",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 45,
    isWishlisted: true,
  },
  {
    id: "w10",
    title: "Stargazing Night",
    date: "Oct 23, 2024",
    time: "9:00 PM",
    location: "Observatory Hill",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    attendees: 55,
    isWishlisted: true,
  },
];

export function WishlistEventsDetail({ onBack, onEventSelect }: WishlistEventsDetailProps) {
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
          <Heart className="w-5 h-5 text-primary fill-primary mr-2" />
          <h1 className="text-white">Your Wishlist</h1>
        </div>
      </div>

      {/* Events List */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-6 space-y-4 safe-bottom">
          {wishlistedEvents.map((event) => (
            <div key={event.id} className="w-full">
              <EventCard
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                image={event.image}
                attendees={event.attendees}
                layout="list"
                isWishlisted={true}
                onClick={() => onEventSelect?.(event.id, event.title)}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
