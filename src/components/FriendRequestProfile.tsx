import { ArrowLeft, Calendar, MapPin, Briefcase, GraduationCap, Heart, X, UserMinus, Ban } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

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

interface FriendRequestProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: FriendRequest | null;
  onAccept: () => void;
  onDecline: () => void;
  onRemoveFriend?: () => void;
  onBlockUser?: () => void;
  isConnected?: boolean;
}

export function FriendRequestProfile({ 
  open, 
  onOpenChange, 
  request, 
  onAccept, 
  onDecline,
  onRemoveFriend,
  onBlockUser,
  isConnected = false
}: FriendRequestProfileProps) {
  if (!request) return null;

  const handleRemoveFriend = () => {
    toast.success(`Removed ${request.name} from your friends`, {
      description: "You can reconnect with them anytime",
      duration: 3000
    });
    onRemoveFriend?.();
    onOpenChange(false);
  };

  const handleBlockUser = () => {
    toast.success(`Blocked ${request.name}`, {
      description: "They won't be able to send you requests or see your profile",
      duration: 4000
    });
    onBlockUser?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/10 text-white w-full max-w-[calc(100vw-2rem)] sm:max-w-md h-[90vh] max-h-[600px] sm:max-h-[85vh] mx-auto p-0 overflow-hidden flex flex-col">
        <VisuallyHidden.Root>
          <DialogTitle>{request.name}'s Profile</DialogTitle>
          <DialogDescription>
            View {request.name}'s profile information, including bio, occupation, education, and interests. You can accept or decline their friend request.
          </DialogDescription>
        </VisuallyHidden.Root>
        
        {/* Header with Cover */}
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-primary via-purple-600 to-pink-500 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="absolute top-2 left-2 p-2 hover:bg-white/10 rounded-full z-10"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </Button>

          {/* Profile Photo */}
          <div className="absolute -bottom-12 sm:-bottom-14 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-background">
              <img
                src={request.image}
                alt={request.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-3 flex-shrink-0 text-center border-b border-white/10">
          <h2 className="text-white text-xl sm:text-2xl mb-1">{request.name}</h2>
          <p className="text-white/60 text-sm sm:text-base mb-1">{request.age} years old • {request.gender}</p>
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs sm:text-sm mb-3">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span>{request.location}</span>
          </div>

          {/* Stats */}
          {(request.eventsAttended || request.mutualFriends) && (
            <div className="flex justify-center gap-6 mb-3 pb-3">
              {request.eventsAttended && (
                <div>
                  <p className="text-white text-lg sm:text-xl">{request.eventsAttended}</p>
                  <p className="text-white/50 text-xs">Events</p>
                </div>
              )}
              {request.mutualFriends && (
                <div>
                  <p className="text-white text-lg sm:text-xl">{request.mutualFriends}</p>
                  <p className="text-white/50 text-xs">Mutual Friends</p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {!isConnected ? (
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={() => {
                  onDecline();
                  onOpenChange(false);
                }}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10 text-sm sm:text-base h-9 sm:h-10"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Decline
              </Button>
              <Button
                onClick={() => {
                  onAccept();
                  onOpenChange(false);
                }}
                className="flex-1 gradient-primary hover:gradient-primary-hover text-sm sm:text-base h-9 sm:h-10"
              >
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Accept
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={handleRemoveFriend}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10 text-sm sm:text-base h-9 sm:h-10"
              >
                <UserMinus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Remove Friend
              </Button>
              <Button
                onClick={handleBlockUser}
                variant="outline"
                className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm sm:text-base h-9 sm:h-10"
              >
                <Ban className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Block User
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <Tabs defaultValue="about" className="w-full flex flex-col flex-1 min-h-0">
            <TabsList className="w-full grid grid-cols-2 bg-transparent border-b border-white/10 rounded-none h-10 sm:h-12 flex-shrink-0">
              <TabsTrigger 
                value="about" 
                className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm sm:text-base"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="photos" 
                className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-sm sm:text-base"
              >
                Photos
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="flex-1 m-0 overflow-y-auto">
              <ScrollArea className="h-full">
                <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                  {/* Bio */}
                  {request.bio && (
                    <div>
                      <h4 className="text-white mb-2 text-sm sm:text-base">About</h4>
                      <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                        {request.bio}
                      </p>
                    </div>
                  )}

                  {/* Professional Info */}
                  <div className="space-y-3 sm:space-y-4">
                    {request.occupation && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="text-white/50 text-xs sm:text-sm mb-1">Occupation</h5>
                          <p className="text-white text-sm sm:text-base">{request.occupation}</p>
                        </div>
                      </div>
                    )}
                    {request.education && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="text-white/50 text-xs sm:text-sm mb-1">Education</h5>
                          <p className="text-white text-sm sm:text-base">{request.education}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interests */}
                  {request.interests && request.interests.length > 0 && (
                    <div className="pb-4">
                      <h4 className="text-white mb-3 text-sm sm:text-base">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.interests.map((interest) => (
                          <span key={interest} className="bg-white/10 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm border border-white/10">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="flex-1 m-0 overflow-y-auto">
              <ScrollArea className="h-full">
                <div className="px-4 sm:px-6 py-4 sm:py-6 pb-8">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Main photo */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <img src={request.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* Placeholder for additional photos */}
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                        <span className="text-white/30 text-xs">No photo</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}