import { useState } from "react";
import { X, Heart, LayoutGrid, Layers, MapPin, UserMinus, Ban } from "lucide-react";
import { Button } from "./ui/button";
import { ConnectionTypeDialog, ConnectionType } from "./ConnectionTypeDialog";
import { FriendRequestProfile } from "./FriendRequestProfile";
import { CrossedPathsHistory } from "./CrossedPathsHistory";
import { toast } from "sonner@2.0.3";

interface FriendRequest {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  image: string;
  bio?: string;
  occupation?: string;
  education?: string;
  interests?: string[];
  eventsAttended?: number;
  mutualFriends?: number;
}

const friendRequests: FriendRequest[] = [
  {
    id: "1",
    name: "Claudia Alves",
    age: 24,
    gender: "Female",
    location: "MATCHA CLUB",
    image: "https://images.unsplash.com/photo-1615338437154-3b752f3e1a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwYmxvbmRlfGVufDF8fHx8MTc1ODE1Njg1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Art enthusiast and coffee lover. Always looking for new gallery openings and live music events!",
    occupation: "Graphic Designer",
    education: "BFA in Visual Arts",
    interests: ["Art", "Photography", "Live Music", "Coffee", "Travel"],
    eventsAttended: 42,
    mutualFriends: 5,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    age: 28,
    gender: "Male",
    location: "DOWNTOWN LOUNGE",
    image: "https://images.unsplash.com/photo-1633037543479-a70452ea1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbHxlbnwxfHx8fDE3NTgxNTY4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Tech professional by day, DJ by night. Love exploring the nightlife scene and meeting new people.",
    occupation: "Software Engineer",
    education: "MS Computer Science",
    interests: ["DJing", "Electronic Music", "Tech", "Nightlife", "Food"],
    eventsAttended: 67,
    mutualFriends: 8,
  },
  {
    id: "3",
    name: "Sofia Chen",
    age: 26,
    gender: "Female",
    location: "ROOFTOP BAR",
    image: "https://images.unsplash.com/photo-1687610265701-1255ece05d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwYnJ1bmV0dGV8ZW58MXx8fHwxNzU4MTU2ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Marketing strategist with a passion for social events. Wine enthusiast and sunset chaser.",
    occupation: "Marketing Manager",
    education: "BA Marketing",
    interests: ["Wine Tasting", "Sunsets", "Yoga", "Networking", "Brunch"],
    eventsAttended: 35,
    mutualFriends: 12,
  },
  {
    id: "4",
    name: "David Park",
    age: 25,
    gender: "Male",
    location: "JAZZ CAFE",
    image: "https://images.unsplash.com/photo-1695737679868-de7eb09df3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFufGVufDF8fHx8MTc1ODA5MjYxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Jazz musician and music teacher. Love performing at intimate venues and jamming with new artists.",
    occupation: "Music Teacher",
    education: "BA Music Performance",
    interests: ["Jazz", "Piano", "Live Performance", "Teaching", "Vinyl Records"],
    eventsAttended: 53,
    mutualFriends: 3,
  },
  {
    id: "5",
    name: "Emma Wilson",
    age: 27,
    gender: "Female",
    location: "WINE BAR",
    image: "https://images.unsplash.com/photo-1706607321814-7cab2f6dea85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcmVkJTIwaGFpcnxlbnwxfHx8fDE3NTgxNTY4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    bio: "Entrepreneur and wellness advocate. Building my startup while staying balanced through yoga and meditation.",
    occupation: "Startup Founder",
    education: "MBA",
    interests: ["Entrepreneurship", "Wellness", "Meditation", "Wine", "Networking"],
    eventsAttended: 28,
    mutualFriends: 7,
  },
];

export function Reconnect() {
  const [viewMode, setViewMode] = useState<'swipe' | 'list'>('swipe');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [requests, setRequests] = useState(friendRequests);
  const [showConnectionDialog, setShowConnectionDialog] = useState(false);
  const [pendingAcceptRequest, setPendingAcceptRequest] = useState<FriendRequest | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<FriendRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'requests' | 'crossed'>('requests');

  const handleButtonAction = (action: 'accept' | 'decline', requestId: string) => {
    if (action === 'accept') {
      // Show connection type dialog
      const request = requests.find(req => req.id === requestId);
      if (request) {
        setPendingAcceptRequest(request);
        setShowConnectionDialog(true);
      }
    } else {
      // Decline immediately
      const newRequests = requests.filter(req => req.id !== requestId);
      setRequests(newRequests);
      
      if (viewMode === 'swipe' && currentIndex >= newRequests.length && newRequests.length > 0) {
        setCurrentIndex(newRequests.length - 1);
      }
      
      toast.success("Request declined");
    }
  };

  const handleConnectionTypeSelect = (type: ConnectionType) => {
    if (!pendingAcceptRequest) return;

    // Remove the accepted request from the list
    const newRequests = requests.filter(req => req.id !== pendingAcceptRequest.id);
    setRequests(newRequests);
    
    if (viewMode === 'swipe' && currentIndex >= newRequests.length && newRequests.length > 0) {
      setCurrentIndex(newRequests.length - 1);
    }

    // Show success message with connection type
    const connectionTypeLabel = type === 'friend' ? 'Friend' : type === 'date' ? 'Date' : 'Business';
    toast.success(`Connected with ${pendingAcceptRequest.name} as ${connectionTypeLabel}! 🎉`);
    
    setPendingAcceptRequest(null);
  };

  const handleViewProfile = (request: FriendRequest) => {
    setSelectedProfile(request);
    setShowProfile(true);
  };

  const handleProfileAccept = () => {
    if (!selectedProfile) return;
    
    // Show connection type dialog
    setPendingAcceptRequest(selectedProfile);
    setShowConnectionDialog(true);
    setShowProfile(false);
  };

  const handleProfileDecline = () => {
    if (!selectedProfile) return;
    
    // Remove from list
    const newRequests = requests.filter(req => req.id !== selectedProfile.id);
    setRequests(newRequests);
    
    if (viewMode === 'swipe' && currentIndex >= newRequests.length && newRequests.length > 0) {
      setCurrentIndex(newRequests.length - 1);
    }
    
    toast.success("Request declined");
    setShowProfile(false);
    setSelectedProfile(null);
  };

  const handleRemoveFriend = () => {
    if (!selectedProfile) return;
    
    // Remove from list
    const newRequests = requests.filter(req => req.id !== selectedProfile.id);
    setRequests(newRequests);
    
    if (viewMode === 'swipe' && currentIndex >= newRequests.length && newRequests.length > 0) {
      setCurrentIndex(newRequests.length - 1);
    }
    
    setShowProfile(false);
    setSelectedProfile(null);
  };

  const handleBlockUser = () => {
    if (!selectedProfile) return;
    
    // Remove from list
    const newRequests = requests.filter(req => req.id !== selectedProfile.id);
    setRequests(newRequests);
    
    if (viewMode === 'swipe' && currentIndex >= newRequests.length && newRequests.length > 0) {
      setCurrentIndex(newRequests.length - 1);
    }
    
    setShowProfile(false);
    setSelectedProfile(null);
  };

  const currentRequest = requests[currentIndex];

  if (requests.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 safe-bottom">
        <h2 className="text-white text-xl mb-4">No more friend requests!</h2>
        <p className="text-white/70 text-center">Check back later for new connections.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col safe-bottom">
      {/* Connection Type Dialog */}
      <ConnectionTypeDialog
        open={showConnectionDialog}
        onOpenChange={setShowConnectionDialog}
        onSelect={handleConnectionTypeSelect}
        personName={pendingAcceptRequest?.name || ''}
      />

      {/* Profile View Dialog */}
      <FriendRequestProfile
        open={showProfile}
        onOpenChange={setShowProfile}
        request={selectedProfile}
        onAccept={handleProfileAccept}
        onDecline={handleProfileDecline}
        onRemoveFriend={handleRemoveFriend}
        onBlockUser={handleBlockUser}
      />

      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-white text-center text-2xl mb-6">Reconnect</h1>
        
        {/* Tab Toggle */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 ${
              activeTab === 'requests' 
                ? 'gradient-primary text-white' 
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <Heart className="w-4 h-4" />
            Friend Requests
          </Button>
          <Button
            variant={activeTab === 'crossed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('crossed')}
            className={`flex items-center gap-2 ${
              activeTab === 'crossed' 
                ? 'gradient-primary text-white' 
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Crossed Paths
          </Button>
        </div>

        {/* View Mode Toggle (only show on requests tab) */}
        {activeTab === 'requests' && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={viewMode === 'swipe' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('swipe')}
              className={`flex items-center gap-2 ${
                viewMode === 'swipe' 
                  ? 'gradient-primary text-white' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              Swipe
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 ${
                viewMode === 'list' 
                  ? 'gradient-primary text-white' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              List
            </Button>
          </div>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'crossed' ? (
        <CrossedPathsHistory />
      ) : viewMode === 'swipe' ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {currentRequest && (
            <div className="relative w-80 max-w-full">
              {/* Profile Card */}
              <div 
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/20 cursor-pointer hover:bg-white/15 transition-all"
                onClick={() => handleViewProfile(currentRequest)}
              >
                {/* Profile Image */}
                <div className="relative mx-auto mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto border-4 border-white/20">
                    <img
                      src={currentRequest.image}
                      alt={currentRequest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Profile Info */}
                <h2 className="text-white text-2xl mb-2">{currentRequest.name}</h2>
                <div className="flex items-center justify-center gap-4 text-white/70 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {currentRequest.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {currentRequest.location}
                  </span>
                </div>
                
                {/* Tap to view hint */}
                <p className="text-white/50 text-xs mb-6">Tap to view full profile</p>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
                  <Button
                    onClick={() => handleButtonAction('decline', currentRequest.id)}
                    className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
                    variant="outline"
                  >
                    <X className="w-6 h-6 text-white" />
                  </Button>
                  <Button
                    onClick={() => handleButtonAction('accept', currentRequest.id)}
                    className="w-16 h-16 rounded-full gradient-primary hover:gradient-primary-hover"
                  >
                    <Heart className="w-6 h-6 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">Use the buttons to accept or decline</p>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="flex-1 px-4 space-y-4 overflow-y-auto">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center gap-4 cursor-pointer hover:bg-white/15 transition-all"
              onClick={() => handleViewProfile(request)}
            >
              {/* Profile Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                <img
                  src={request.image}
                  alt={request.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Profile Info */}
              <div className="flex-1">
                <h3 className="text-white text-lg">{request.name}</h3>
                <p className="text-white/70 text-sm">{request.gender} • {request.location}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  onClick={() => handleButtonAction('decline', request.id)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
                  variant="outline"
                  size="sm"
                >
                  <X className="w-4 h-4 text-white" />
                </Button>
                <Button
                  onClick={() => handleButtonAction('accept', request.id)}
                  className="w-10 h-10 rounded-full gradient-primary hover:gradient-primary-hover"
                  size="sm"
                >
                  <Heart className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}