import { EventCard } from "./EventCard";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const wishlistedEvents = [
  {
    id: "w1",
    title: "Intimate House Concert",
    date: "Oct 5",
    time: "7:00 PM",
    location: "Artist's Studio, Brooklyn",
    image: "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isWishlisted: true,
  },
  {
    id: "w2",
    title: "Silent Film & Wine Tasting",
    date: "Oct 8",
    time: "6:30 PM",
    location: "Historic Movie Palace",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isWishlisted: true,
  },
  {
    id: "w3",
    title: "Jazz & Poetry Night",
    date: "Oct 10",
    time: "8:30 PM",
    location: "Cozy Cafe Downtown",
    image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsaXZlJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc1ODA1OTIzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isWishlisted: true,
  },
  {
    id: "w4",
    title: "Rooftop Sunset Party",
    date: "Oct 12",
    time: "5:00 PM",
    location: "Sky Deck Lounge",
    image: "https://images.unsplash.com/photo-1709131407822-84a466b130c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBwYXJ0eSUyMGV2ZW50fGVufDF8fHx8MTc1ODE1NTg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isWishlisted: true,
  },
  {
    id: "w5",
    title: "Pool Party Weekend",
    date: "Oct 14",
    time: "1:00 PM",
    location: "Resort Pool",
    image: "https://images.unsplash.com/photo-1562866470-3774249bef10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwb29sJTIwcGFydHklMjBzdW1tZXJ8ZW58MXx8fHwxNzU4MDU4NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isWishlisted: true,
  },
  {
    id: "w6",
    title: "Cozy Movie Evening",
    date: "Oct 16",
    time: "7:00 PM",
    location: "Home Theater",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU4MTUzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isWishlisted: true,
  },
  {
    id: "w7",
    title: "Exclusive Club Night",
    date: "Oct 18",
    time: "11:00 PM",
    location: "VIP Lounge",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbHViJTIwbmlnaHRsaWZlfGVufDF8fHx8MTc1ODE1NTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isWishlisted: true,
  },
];

interface WishlistedEventsProps {
  onEventSelect?: (eventId: string, eventName: string) => void;
  onExploreAll?: () => void;
}

export function WishlistedEvents({ onEventSelect, onExploreAll }: WishlistedEventsProps) {
  if (wishlistedEvents.length === 0) {
    return null;
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="text-white">Your Wishlist</h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide" style={{ touchAction: 'pan-x' }}>
        {wishlistedEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            size="small" 
            showWishlist={true}
            showWishlistButton={false}
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