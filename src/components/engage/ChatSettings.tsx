import { useState } from "react";
import { ArrowLeft, Heart, Paperclip, UserMinus, Shield, Palette, AlertTriangle, ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { toast } from "sonner@2.0.3";

interface ChatSettingsProps {
  userName: string;
  userAvatar: string;
  onBack: () => void;
  onThemeChange?: (theme: string) => void;
  onRemoveFriend?: (userName: string) => void;
  onBlockUser?: (userName: string) => void;
}

const chatThemes = [
  { id: 'default', name: 'Default Purple', color: '#c451c9' },
  { id: 'ocean', name: 'Ocean Blue', color: '#0ea5e9' },
  { id: 'sunset', name: 'Sunset Orange', color: '#f97316' },
  { id: 'forest', name: 'Forest Green', color: '#22c55e' }
];

export function ChatSettings({ userName, userAvatar, onBack, onThemeChange, onRemoveFriend, onBlockUser }: ChatSettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [showDateRequestDialog, setShowDateRequestDialog] = useState(false);
  const [showRemoveFriendDialog, setShowRemoveFriendDialog] = useState(false);
  const [showBlockUserDialog, setShowBlockUserDialog] = useState(false);
  const [dateRequestSent, setDateRequestSent] = useState(false);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    onThemeChange?.(themeId);
  };

  const handleDateRequest = () => {
    setDateRequestSent(true);
    setShowDateRequestDialog(false);
    
    toast.success("Anonymous date request sent!", {
      description: "They won't know it's you until they also select 'Date'",
      duration: 5000,
      icon: <Heart className="h-5 w-5 text-red-400" />
    });
  };

  const handleRemoveFriend = () => {
    setShowRemoveFriendDialog(false);
    onRemoveFriend?.(userName);
    
    toast.success(`Removed ${userName} from your friends`, {
      duration: 3000
    });
    
    // Go back after removal
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const handleBlockUser = () => {
    setShowBlockUserDialog(false);
    onBlockUser?.(userName);
    
    toast.success(`Blocked ${userName}`, {
      description: "You won't receive messages from this user anymore",
      duration: 3000
    });
    
    // Go back after blocking
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const settingsOptions = [
    {
      icon: Heart,
      title: "Friend for Date",
      description: "Ask if they're interested in dating",
      action: () => setShowDateRequestDialog(true),
      color: "text-red-400"
    },
    {
      icon: Paperclip,
      title: "Attachment",
      description: "Send photos, videos, or files",
      action: () => {
        toast.info("Opening file picker...");
      },
      color: "text-blue-400"
    },
    {
      icon: UserMinus,
      title: "Remove User",
      description: "Remove this person from your friends",
      action: () => setShowRemoveFriendDialog(true),
      color: "text-orange-400"
    },
    {
      icon: Shield,
      title: "Block User",
      description: "Block and report this user",
      action: () => setShowBlockUserDialog(true),
      color: "text-red-500"
    },
    {
      icon: AlertTriangle,
      title: "Report an Issue",
      description: "Report inappropriate behavior",
      action: () => {
        toast.info("Opening report form...");
      },
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-background border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-1 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <h2 className="text-white font-medium">Chat Settings</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Anonymous Date Request Banner */}
        {dateRequestSent && (
          <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 p-4 animate-in slide-in-from-top">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5 text-red-400 fill-current" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-white font-medium flex items-center gap-2">
                  Anonymous Date Request Sent
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Your identity is hidden. {userName} will only know it's you if they also express interest by clicking "Friend for Date".
                </p>
                <div className="flex items-center gap-2 mt-2 p-2 bg-white/5 rounded-lg">
                  <Palette className="h-4 w-4 text-primary" />
                  <p className="text-white/60 text-xs">
                    Chat theme will automatically change to <span className="text-red-400 font-medium">Date Theme</span> once both of you match!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* User Info */}
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">{userName}</h3>
              <p className="text-white/60 text-sm">Connected via Jazz Night Event</p>
            </div>
          </div>
        </Card>

        {/* Chat Theme Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="text-white font-medium">Chat Theme</h3>
          </div>
          
          <Card className="bg-white/5 border-white/10 p-4">
            <Select value={selectedTheme} onValueChange={handleThemeChange}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent className="bg-background border-white/10">
                {chatThemes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id} className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: theme.color }}
                      ></div>
                      <span>{theme.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        </div>

        <Separator className="bg-white/10" />

        {/* Settings Options */}
        <div className="space-y-3">
          {settingsOptions.map((option, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 p-4 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={option.action}
            >
              <div className="flex items-center space-x-4">
                <div className={`${option.color}`}>
                  <option.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{option.title}</h4>
                  <p className="text-white/60 text-sm">{option.description}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/40 rotate-[-90deg]" />
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="space-y-2">
            <h4 className="text-white font-medium">Connection Info</h4>
            <div className="space-y-1 text-sm text-white/60">
              <p>• Connected: 2 days ago</p>
              <p>• Mutual interests: Jazz, Live Music</p>
              <p>• Mutual friends: 3 people</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Dialogs */}
      <Dialog open={showDateRequestDialog} onOpenChange={setShowDateRequestDialog}>
        <DialogContent className="bg-background border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Send Anonymous Date Request
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Your request will be sent anonymously to {userName}. They will only know it's you if they also express interest by selecting "Friend for Date".
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Card className="bg-white/5 border-white/10 p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Anonymous Request</p>
                    <p className="text-white/60 text-xs">Your identity stays hidden until mutual interest</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Wait for Match</p>
                    <p className="text-white/60 text-xs">If they also click "Friend for Date", you'll both be notified</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="h-4 w-4 text-red-400 fill-current" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Theme Changes Automatically</p>
                    <p className="text-white/60 text-xs">Chat theme will switch to romantic Date Theme on mutual match</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDateRequestDialog(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDateRequest}
              disabled={dateRequestSent}
              className="gradient-primary"
            >
              {dateRequestSent ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Request Sent
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRemoveFriendDialog} onOpenChange={setShowRemoveFriendDialog}>
        <DialogContent className="bg-background border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Remove Friend</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to remove {userName} from your friends list? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <Card className="bg-orange-500/10 border-orange-500/30 p-4 my-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-white text-sm font-medium">This will:</p>
                <ul className="text-white/70 text-xs space-y-1 list-disc list-inside">
                  <li>Remove {userName} from your friends list</li>
                  <li>Remove you from their friends list</li>
                  <li>Delete all chat history</li>
                </ul>
              </div>
            </div>
          </Card>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRemoveFriendDialog(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleRemoveFriend}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <UserMinus className="h-4 w-4 mr-2" />
              Remove Friend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBlockUserDialog} onOpenChange={setShowBlockUserDialog}>
        <DialogContent className="bg-background border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Block User</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to block {userName}? They won't be able to contact you anymore.
            </DialogDescription>
          </DialogHeader>
          
          <Card className="bg-red-500/10 border-red-500/30 p-4 my-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-white text-sm font-medium">Blocking will:</p>
                <ul className="text-white/70 text-xs space-y-1 list-disc list-inside">
                  <li>Prevent {userName} from messaging you</li>
                  <li>Remove them from your friends list</li>
                  <li>Hide your profile from them</li>
                  <li>Report suspicious activity to TAPPD moderators</li>
                </ul>
              </div>
            </div>
          </Card>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowBlockUserDialog(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleBlockUser}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Block User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}