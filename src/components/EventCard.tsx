import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Calendar, MapPin, Heart, Users } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

interface EventCardProps {
  // New direct props structure for easier usage
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  attendees?: number;
  isWishlisted?: boolean;
  // Legacy event object structure for backward compatibility
  event?: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    isWishlisted?: boolean;
  };
  size?: 'small' | 'medium' | 'large';
  layout?: 'grid' | 'list';
  showWishlist?: boolean;
  showWishlistButton?: boolean;
  onClick?: () => void;
  onWishlistToggle?: (isWishlisted: boolean) => void;
}

export function EventCard({ 
  event, 
  title: propTitle, 
  date: propDate, 
  time: propTime, 
  location: propLocation, 
  image: propImage, 
  attendees, 
  isWishlisted: propIsWishlisted,
  size = 'medium', 
  layout = 'grid',
  showWishlist = false,
  showWishlistButton = true,
  onClick,
  onWishlistToggle
}: EventCardProps) {
  // Use direct props or fallback to event object
  const title = propTitle || event?.title || '';
  const date = propDate || event?.date || '';
  const time = propTime || event?.time || '';
  const location = propLocation || event?.location || '';
  const image = propImage || event?.image || '';
  
  // Local state for wishlist status
  const [isWishlisted, setIsWishlisted] = useState(propIsWishlisted || event?.isWishlisted || false);

  // Handle wishlist toggle
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    const newWishlistStatus = !isWishlisted;
    setIsWishlisted(newWishlistStatus);
    onWishlistToggle?.(newWishlistStatus);
    
    if (newWishlistStatus) {
      toast.success("Added to wishlist! ❤️");
    } else {
      toast.success("Removed from wishlist");
    }
  };

  const cardWidth = size === 'small' ? 'w-64' : size === 'large' ? 'w-full' : 'w-72';
  const imageHeight = size === 'small' ? 'h-32' : size === 'large' ? 'h-48' : 'h-40';

  if (layout === 'list') {
    return (
      <Card 
        className="w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/5 border-white/10 cursor-pointer hover:bg-white/10"
        onClick={onClick}
      >
        <div className="flex">
          <div className="relative w-24 h-24 flex-shrink-0">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            {showWishlist && (
              <button className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-primary text-primary' : 'text-white'}`} />
              </button>
            )}
          </div>
          <CardContent className="flex-1 p-4">
            <h4 className="mb-2 line-clamp-1 text-white">{title}</h4>
            <div className="space-y-1 text-white/70">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-primary" />
                <span className="text-xs">{date} • {time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-xs line-clamp-1">{location}</span>
              </div>
              {attendees && (
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3 text-primary" />
                  <span className="text-xs">{attendees} attending</span>
                </div>
              )}
            </div>
            {showWishlistButton && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 border-primary/50 hover:bg-primary/20 text-white flex items-center justify-center gap-2"
                onClick={handleWishlistToggle}
              >
                <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Button>
            )}
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`${cardWidth} flex-shrink-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/5 border-white/10 cursor-pointer hover:bg-white/10`}
      onClick={onClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className={`w-full ${imageHeight} object-cover`}
        />
        {showWishlist && (
          <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-primary text-primary' : 'text-white'}`} />
          </button>
        )}
      </div>
      <CardContent className="p-4">
        <h4 className="mb-2 line-clamp-2 text-white">{title}</h4>
        <div className="space-y-1 text-white/70">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">{date} • {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
          {attendees && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm">{attendees} attending</span>
            </div>
          )}
        </div>
        {showWishlistButton && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 border-primary/50 hover:bg-primary/20 text-white flex items-center justify-center gap-2"
            onClick={handleWishlistToggle}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}