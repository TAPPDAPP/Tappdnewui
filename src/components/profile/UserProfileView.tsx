import { ArrowLeft, MessageCircle, UserPlus, UserMinus } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface Connection {
  id: string;
  name: string;
  age: number;
  photo: string;
  type: 'friend' | 'match' | 'business';
  bio?: string;
  occupation?: string;
  education?: string;
  location?: string;
  interests?: string[];
}

interface UserProfileViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Connection | null;
  onMessageClick: () => void;
}

export const UserProfileView = ({ open, onOpenChange, user, onMessageClick }: UserProfileViewProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/10 text-white max-w-md mx-auto p-0 h-[85vh] overflow-hidden flex flex-col">
        {/* Header with Cover */}
        <div className="relative h-48 bg-gradient-to-r from-primary to-purple-600 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full z-10"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>

          {/* Profile Photo */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background">
              <img
                src={user.photo}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-6 pb-4 flex-shrink-0 text-center border-b border-white/10">
          <h2 className="text-white text-2xl font-medium mb-1">{user.name}</h2>
          <p className="text-white/60 mb-3">{user.age} years old</p>
          
          <div className="flex gap-2 justify-center mb-4">
            <Badge className={`${
              user.type === 'friend' ? 'bg-blue-500/20 text-blue-400' :
              user.type === 'match' ? 'bg-pink-500/20 text-pink-400' :
              'bg-yellow-500/20 text-yellow-400'
            } border-0`}>
              {user.type}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                onMessageClick();
                onOpenChange(false);
              }}
              className="flex-1 gradient-primary hover:gradient-primary-hover"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              <UserMinus className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="about" className="w-full flex flex-col flex-1 min-h-0">
            <TabsList className="w-full grid grid-cols-2 bg-transparent border-b border-white/10 rounded-none h-12 flex-shrink-0">
              <TabsTrigger 
                value="about" 
                className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="photos" 
                className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Photos
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="flex-1 m-0 overflow-auto">
              <div className="px-6 py-6 space-y-6">
                {/* Bio */}
                {user.bio && (
                  <div>
                    <h4 className="text-white font-medium mb-2">About</h4>
                    <p className="text-white/70 leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}

                {/* Professional Info */}
                <div className="grid grid-cols-2 gap-4">
                  {user.occupation && (
                    <div>
                      <h5 className="text-white/50 text-sm mb-1">Occupation</h5>
                      <p className="text-white">{user.occupation}</p>
                    </div>
                  )}
                  {user.education && (
                    <div>
                      <h5 className="text-white/50 text-sm mb-1">Education</h5>
                      <p className="text-white">{user.education}</p>
                    </div>
                  )}
                </div>

                {/* Location */}
                {user.location && (
                  <div>
                    <h5 className="text-white/50 text-sm mb-1">Location</h5>
                    <p className="text-white">{user.location}</p>
                  </div>
                )}

                {/* Interests */}
                {user.interests && user.interests.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-3">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest) => (
                        <span key={interest} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="flex-1 m-0 overflow-auto">
              <div className="px-6 py-6">
                <div className="grid grid-cols-3 gap-2">
                  {/* Placeholder for user photos */}
                  <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                    <img src={user.photo} alt="" className="w-full h-full object-cover" />
                  </div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                      <span className="text-white/30 text-xs">No photo</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
