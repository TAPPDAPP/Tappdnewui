import { useState, useMemo } from "react";
import { ArrowLeft, Calendar, MapPin, Star, Users, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

interface EventBookingProps {
  eventId: string;
  eventName: string;
  onBack: () => void;
}

// Simplified event data with fixed photos to prevent performance issues
const getEventData = (eventName: string) => {
  const lowerName = eventName.toLowerCase();
  
  // Determine event type
  const isPoolParty = lowerName.includes('pool');
  const isJazz = lowerName.includes('jazz');
  const isMovie = lowerName.includes('movie') || lowerName.includes('cinema');
  const isHouse = lowerName.includes('house');
  const isRooftop = lowerName.includes('rooftop');

  // Pre-defined photo sets
  const photoSets = {
    pool: [
      "https://images.unsplash.com/photo-1600854109241-46990389fb97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29sJTIwcGFydHklMjBuaWdodCUyMGxpZ2h0c3xlbnwxfHx8fDE3NTgyMjU4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1724980715475-f6ead604713f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcG9vbCUyMHBhcnR5fGVufDF8fHx8MTc1ODIyNTgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1661333587575-25c87c14f398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBsdXh1cnl8ZW58MXx8fHwxNzU4MjI1ODIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    jazz: [
      "https://images.unsplash.com/photo-1757439160077-dd5d62a4d851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwY2x1YiUyMGxpdmUlMjBtdXNpY3xlbnwxfHx8fDE3NTgyMjU3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1577369256636-2c077eec9abc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwc2F4b3Bob25lJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzU4MjI1ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1731083122864-0e226bb5f006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFuZCUyMHN0YWdlfGVufDF8fHx8MTc1ODIyNTgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    movie: [
      "https://images.unsplash.com/photo-1562505375-b049297e76b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2luZW1hJTIwdGhlYXRlcnxlbnwxfHx8fDE3NTgyMjU4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzU4MjE1MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1747144293265-fc806b5dbc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBwb3Bjb3JuJTIwZHJpbmtzfGVufDF8fHx8MTc1ODIyNTgxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    house: [
      "https://images.unsplash.com/photo-1655238865814-1e57e8dff451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMHBhcnR5JTIwZnJpZW5kc3xlbnwxfHx8fDE3NTgxNTU4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1755539485162-72e939b6e2ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbSUyMHBhcnR5fGVufDF8fHx8MTc1ODIyNTgzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1750660736346-668a8ab7340f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZ2F0aGVyaW5nJTIwZm9vZHxlbnwxfHx8fDE3NTgyMjU4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    rooftop: [
      "https://images.unsplash.com/photo-1653221716413-43c674e1e56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwc2t5bGluZXxlbnwxfHx8fDE3NTgyMjU4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1644589075956-a2526d00fd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcGFydHklMjBjaXR5fGVufDF8fHx8MTc1ODIyNTgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1487551752097-08c18201f81b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwZXZlbmluZyUyMGxpZ2h0c3xlbnwxfHx8fDE3NTgyMjU4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    default: [
      "https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGNsdWIlMjBwYXJ0eSUyMGNyb3dkJTIwbGlnaHRzfGVufDF8fHx8MTc1ODIyNTA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1689793354800-de168c0a4c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBtdXNpY3xlbnwxfHx8fDE3NTgxOTA2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1738669469713-1e5327d2a786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW51ZSUyMGludGVyaW9yJTIwcGFydHl8ZW58MXx8fHwxNzU4MjI1MDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  };

  // Select photos based on event type
  let photos = photoSets.default;
  if (isPoolParty) photos = photoSets.pool;
  else if (isJazz) photos = photoSets.jazz;
  else if (isMovie) photos = photoSets.movie;
  else if (isHouse) photos = photoSets.house;
  else if (isRooftop) photos = photoSets.rooftop;

  // Event details based on type
  const eventDetails = {
    pool: {
      location: "Poolside Resort, Mumbai",
      description: "Dive into summer vibes with our exclusive pool party featuring internationally acclaimed DJs, premium drinks, and stunning pool views.",
      ageRestriction: "21+ Only"
    },
    jazz: {
      location: "Blue Note Jazz Cafe",
      description: "Experience the smooth sounds of live jazz in an intimate setting with world-class musicians and craft cocktails.",
      ageRestriction: "All Ages Welcome",
      alcohol: "Wine & Cocktails"
    },
    movie: {
      location: "Vintage Cinema Hall",
      description: "Step back in time with classic films in our beautifully restored theater, complete with vintage decor and gourmet snacks.",
      ageRestriction: "All Ages Welcome",
      alcohol: "Wine & Beer",
      smoking: "No Smoking"
    },
    house: {
      location: "Private Residence",
      description: "Join us for an intimate gathering with friends, great music, and a cozy atmosphere in a beautiful home setting.",
      ageRestriction: "All Ages Welcome",
      alcohol: "BYOB Welcome"
    },
    rooftop: {
      location: "Sky Lounge Rooftop",
      description: "Enjoy breathtaking city views while dancing under the stars with premium cocktails and amazing music."
    },
    default: {
      location: "Downtown Venue",
      description: "Join us for an unforgettable experience with great music, amazing people, and incredible vibes."
    }
  };

  let details = eventDetails.default;
  if (isPoolParty) details = eventDetails.pool;
  else if (isJazz) details = eventDetails.jazz;
  else if (isMovie) details = eventDetails.movie;
  else if (isHouse) details = eventDetails.house;
  else if (isRooftop) details = eventDetails.rooftop;

  return {
    name: eventName,
    date: "Saturday, Dec 21, 2024",
    time: "8:00 PM - 2:00 AM",
    location: details.location,
    genderPreference: "Mixed Gender",
    ageRestriction: details.ageRestriction || "18+ Only",
    alcohol: details.alcohol || "Full Bar Available",
    smoking: details.smoking || "Designated Smoking Area",
    description: details.description,
    photos
  };
};

const hostReviews = [
  {
    id: 1,
    user: "Vikram P.",
    rating: 5,
    date: "Nov 12, 2024",
    comment: "Professional organizing and excellent communication. The event exceeded all expectations!"
  },
  {
    id: 2,
    user: "Deepika R.",
    rating: 4,
    date: "Nov 5, 2024",
    comment: "Well-organized event with great attention to detail. The host was responsive and accommodating."
  },
  {
    id: 3,
    user: "Arjun T.",
    rating: 5,
    date: "Oct 28, 2024",
    comment: "Amazing host! Everything was as promised and more. Will definitely book again."
  }
];

const defaultReviews = [
  {
    id: 1,
    user: "Priya M.",
    rating: 5,
    date: "Nov 15, 2024",
    comment: "Amazing atmosphere! The DJ was incredible and the venue was perfect. Definitely attending the next one!"
  },
  {
    id: 2,
    user: "Rahul K.",
    rating: 4,
    date: "Nov 10, 2024",
    comment: "Great party, good music, and excellent service. The energy was infectious!"
  },
  {
    id: 3,
    user: "Anisha S.",
    rating: 5,
    date: "Nov 8, 2024",
    comment: "Best party I've been to this year! Everything was perfectly organized and the vibes were unmatched."
  }
];

const defaultBookingOptions = [
  {
    id: "standard",
    name: "Standard Entry",
    price: "₹1,200",
    tickets: 45,
    features: ["Entry to event", "1 Welcome drink", "Access to main floor"]
  },
  {
    id: "premium",
    name: "Premium Pass",
    price: "₹2,500",
    tickets: 23,
    features: ["Entry to event", "3 Premium drinks", "VIP lounge access", "Priority entry"]
  },
  {
    id: "table4",
    name: "Table for 4",
    price: "₹8,000",
    tickets: 8,
    features: ["Reserved table for 4", "Bottle service", "Dedicated waiter", "Dance floor access"]
  }
];

export function EventBooking({ eventId, eventName, onBack }: EventBookingProps) {
  const [activeTab, setActiveTab] = useState("details");
  
  // Memoize expensive computations
  const eventData = useMemo(() => getEventData(eventName), [eventName]);

  const addToCalendar = () => {
    alert("Event added to calendar!");
  };

  const openMaps = () => {
    window.open(`https://maps.google.com?q=${encodeURIComponent(eventData.location)}`, '_blank');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'
        }`}
      />
    ));
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <h1 className="text-white text-center flex-1 mx-4 truncate">
          {eventName}
        </h1>
        
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto safe-bottom">
        {/* Photo Gallery */}
        <div className="p-4">
          <div 
            className="relative rounded-lg overflow-hidden bg-white/5 border border-white/10"
            style={{
              boxShadow: '0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="flex gap-2 overflow-x-auto scrollbar-hide p-3">
              {eventData.photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden border border-white/20"
                  style={{
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}
                >
                  <img
                    src={photo}
                    alt={`Event photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
              <TabsTrigger 
                value="availability" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-white/70"
              >
                Availability
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-white/70"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-white/70"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-6 px-4 space-y-6">
              <div className="space-y-4">
                <h2 className="text-white text-xl">{eventName}</h2>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-white">{eventData.date}</p>
                    <p className="text-white/70 text-sm">{eventData.time}</p>
                  </div>
                  <Button 
                    onClick={addToCalendar}
                    size="sm" 
                    className="gradient-primary text-white border-0"
                  >
                    Add to Calendar
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-white">{eventData.location}</p>
                  </div>
                  <Button 
                    onClick={openMaps}
                    size="sm" 
                    variant="outline"
                    className="border-white/20 text-white hover:gradient-primary-hover"
                  >
                    Open Maps
                  </Button>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-white/70 text-sm">Gender Preference</p>
                      <p className="text-white">{eventData.genderPreference}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-white/70 text-sm">Age Restrictions</p>
                      <p className="text-white">{eventData.ageRestriction}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div>
                  <h3 className="text-white mb-2">About This Event</h3>
                  <p className="text-white/70 leading-relaxed">{eventData.description}</p>
                </div>
              </div>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="mt-6 px-4 space-y-4">
              {defaultBookingOptions.map((option) => (
                <div
                  key={option.id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white">{option.name}</h3>
                      <p className="text-primary text-xl mt-1">{option.price}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={option.tickets > 10 ? "default" : "destructive"}
                        className={option.tickets > 10 ? "gradient-primary text-white border-0" : ""}
                      >
                        {option.tickets} left
                      </Badge>
                    </div>
                  </div>
                  
                  <ul className="text-white/70 text-sm space-y-1 mb-4">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full gradient-primary text-white border-0"
                    disabled={option.tickets === 0}
                  >
                    {option.tickets === 0 ? 'Sold Out' : 'Book Now'}
                  </Button>
                </div>
              ))}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6 px-4 space-y-6">
              <div>
                <h3 className="text-white mb-4">Event Reviews</h3>
                <div className="space-y-4">
                  {defaultReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white">{review.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-white/70 text-sm">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-white/70">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-white mb-4">Host Reviews</h3>
                <div className="space-y-4">
                  {hostReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white">{review.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-white/70 text-sm">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-white/70">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}