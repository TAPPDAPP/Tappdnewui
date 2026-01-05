import { Users, Heart, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

export type ConnectionType = 'friend' | 'date' | 'business';

interface ConnectionTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (type: ConnectionType) => void;
  personName: string;
}

export function ConnectionTypeDialog({ 
  open, 
  onOpenChange, 
  onSelect, 
  personName 
}: ConnectionTypeDialogProps) {
  const handleSelect = (type: ConnectionType) => {
    // If date is selected, show anonymous request notification
    if (type === 'date') {
      toast.success(
        `💕 Anonymous date request sent to ${personName}!`,
        {
          description: "Your identity will be revealed once both of you select 'Date'. The app theme will switch to dating mode when mutual interest is confirmed. 💖",
          duration: 8000,
        }
      );
    }
    
    onSelect(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0a0322] border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-center">Connect with {personName}</DialogTitle>
          <DialogDescription className="text-white/70 text-center">
            How would you like to connect?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {/* Friend Option */}
          <button
            onClick={() => handleSelect('friend')}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white font-medium">Friend</h4>
              <p className="text-white/60 text-sm">Connect as friends</p>
            </div>
          </button>

          {/* Date Option */}
          <button
            onClick={() => handleSelect('date')}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white font-medium">Date</h4>
              <p className="text-white/60 text-sm">Send anonymous interest • Reveals when mutual</p>
            </div>
          </button>

          {/* Business Option */}
          <button
            onClick={() => handleSelect('business')}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white font-medium">Business</h4>
              <p className="text-white/60 text-sm">Connect professionally</p>
            </div>
          </button>
        </div>

        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="w-full border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}