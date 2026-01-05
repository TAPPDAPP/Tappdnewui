import { useState } from "react";
import { MapPin, Clock, Eye, UserPlus, MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { FriendRequestProfile } from "./FriendRequestProfile";
import { toast } from "sonner@2.0.3";

interface CrossedPath {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: string;
  image: string;
  location: string;
  timestamp: string;
  distance: string;
  crossedCount: number;
  commonInterests?: string[];
  bio?: string;
  occupation?: string;
  eventsAttended?: number;
  mutualFriends?: number;
}

const mockCrossedPaths: CrossedPath[] = [
  {
    id: "cp1",
    userId: "u1",
    name: "Isabella Martinez",
    age: 25,
    gender: "Female",
    image: "https://images.unsplash.com/photo-1706607321814-7cab2f6dea85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcmVkJTIwaGFpcnxlbnwxfHx8fDE3NTgxNTY4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Sky Lounge, Mumbai",
    timestamp: "2 hours ago",
    distance: "5m away",
    crossedCount: 3,
    commonInterests: ["Jazz", "Art", "Coffee"],
    bio: "Creative soul who loves live music and art galleries. Always exploring new venues!",
    occupation: "Interior Designer",
    eventsAttended: 45,
    mutualFriends: 6
  },
  {
    id: "cp2",
    userId: "u2",
    name: "Alex Thompson",
    age: 28,
    gender: "Male",
    image: "https://images.unsplash.com/photo-1695737679868-de7eb09df3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFufGVufDF8fHx8MTc1ODA5MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Central Cafe, Bandra",
    timestamp: "5 hours ago",
    distance: "10m away",
    crossedCount: 1,
    commonInterests: ["Tech", "Food"],
    bio: "Tech enthusiast and foodie. Love discovering new cafes and restaurants.",
    occupation: "Product Manager",
    eventsAttended: 32,
    mutualFriends: 4
  },
  {
    id: "cp3",
    userId: "u3",
    name: "Priya Sharma",
    age: 26,
    gender: "Female",
    image: "https://images.unsplash.com/photo-1687610265701-1255ece05d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwYnJ1bmV0dGV8ZW58MXx8fHwxNzU4MTU2ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Innovation Hub, Powai",
    timestamp: "Yesterday",
    distance: "15m away",
    crossedCount: 2,
    commonInterests: ["Startup", "Networking", "Yoga"],
    bio: "Entrepreneur building the next big thing. Always open to networking!",
    occupation: "Startup Founder",
    eventsAttended: 28,
    mutualFriends: 8
  },
  {
    id: "cp4",
    userId: "u4",
    name: "Rahul Verma",
    age: 29,
    gender: "Male",
    image: "https://images.unsplash.com/photo-1633037543479-a70452ea1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTgxNTY4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Downtown Club, Lower Parel",
    timestamp: "2 days ago",
    distance: "20m away",
    crossedCount: 5,
    commonInterests: ["Music", "Nightlife", "Sports"],
    bio: "DJ and music producer. Love the nightlife scene and meeting new people.",
    occupation: "DJ / Producer",
    eventsAttended: 78,
    mutualFriends: 12
  }
];

export function CrossedPathsHistory() {
  const [crossedPaths] = useState<CrossedPath[]>(mockCrossedPaths);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleViewProfile = (path: CrossedPath) => {
    setSelectedProfile({
      id: path.userId,
      name: path.name,
      age: path.age,
      gender: path.gender,
      image: path.image,
      location: path.location,
      bio: path.bio,
      occupation: path.occupation,
      interests: path.commonInterests,
      eventsAttended: path.eventsAttended,
      mutualFriends: path.mutualFriends
    });
    setShowProfile(true);
  };

  const handleConnect = (path: CrossedPath) => {
    toast.success(`Connection request sent to ${path.name}! 🎉`);
  };

  const handleMessage = (path: CrossedPath) => {
    toast.info(`Opening chat with ${path.name}...`);
  };

  if (crossedPaths.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <MapPin className="w-10 h-10 text-white/30" />
        </div>
        <h2 className="text-white text-xl mb-2">No Crossed Paths Yet</h2>
        <p className="text-white/70 text-center text-sm">
          Attend events to see people you've crossed paths with!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Profile View Dialog */}
      <FriendRequestProfile
        open={showProfile}
        onOpenChange={setShowProfile}
        request={selectedProfile}
        onAccept={() => {
          if (selectedProfile) {
            toast.success(`Connected with ${selectedProfile.name}! 🎉`);
          }
          setShowProfile(false);
        }}
        onDecline={() => {
          setShowProfile(false);
        }}
      />

      {/* Header */}
      <div className="px-4 py-4">
        <h2 className="text-white text-xl mb-2">Crossed Paths</h2>
        <p className="text-white/60 text-sm">
          People you've crossed paths with at events
        </p>
      </div>

      {/* Crossed Paths List */}
      <div className="flex-1 px-4 pb-4 space-y-3 overflow-y-auto">
        {crossedPaths.map((path) => (
          <Card 
            key={path.id}
            className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Profile Image */}
                <div 
                  className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 cursor-pointer"
                  onClick={() => handleViewProfile(path)}
                >
                  <img
                    src={path.image}
                    alt={path.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-white mb-1 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleViewProfile(path)}
                      >
                        {path.name}, {path.age}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          {path.crossedCount}x crossed
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Location & Time */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{path.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Clock className="w-3 h-3" />
                      <span>{path.timestamp}</span>
                      <span>•</span>
                      <span>{path.distance}</span>
                    </div>
                  </div>

                  {/* Common Interests */}
                  {path.commonInterests && path.commonInterests.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {path.commonInterests.map((interest, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline"
                          className="border-white/20 text-white/70 text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Separator className="bg-white/10 mb-3" />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleViewProfile(path)}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleConnect(path)}
                      className="flex-1 gradient-primary"
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Connect
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleMessage(path)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
