import { useState, useEffect } from "react";
import { Watch, Calendar, TrendingUp, Users, Zap, ChevronRight, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface RegisteredBand {
  id: string;
  name: string;
  registeredAt: Date;
  eventsAttended: number;
  matchesMade: number;
  tappiesLeft: number;
}

interface BandManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data - In a real app, this would come from your backend/state management
const getMockBands = (): RegisteredBand[] => {
  const storedBands = localStorage.getItem('tappd_registered_bands');
  if (storedBands) {
    const bands = JSON.parse(storedBands);
    return bands.map((band: any) => ({
      ...band,
      registeredAt: new Date(band.registeredAt),
      eventsAttended: band.eventsAttended || Math.floor(Math.random() * 20) + 1,
      matchesMade: band.matchesMade || Math.floor(Math.random() * 50) + 5,
      tappiesLeft: band.tappiesLeft || Math.floor(Math.random() * 100) + 50,
    }));
  }
  return [];
};

export function BandManager({ open, onOpenChange }: BandManagerProps) {
  const [bands, setBands] = useState<RegisteredBand[]>([]);
  const [selectedBand, setSelectedBand] = useState<RegisteredBand | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (open) {
      const loadedBands = getMockBands();
      setBands(loadedBands);
    }
  }, [open]);

  const handleBandClick = (band: RegisteredBand) => {
    setSelectedBand(band);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedBand(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const BandListView = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3 p-4 pb-6">
          {bands.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Watch className="h-8 w-8 text-white/30" />
              </div>
              <h4 className="text-white font-medium mb-2">No Bands Registered</h4>
              <p className="text-white/50 text-sm mb-4">
                Register your first TAPPD band to get started
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Close
              </Button>
            </div>
          ) : (
            bands.map((band) => (
              <motion.div
                key={band.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="bg-white/5 border-white/10 p-4 cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => handleBandClick(band)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-2.5 flex-shrink-0">
                        <Watch className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{band.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-white/50 text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(band.registeredAt)}
                          </span>
                          <Badge 
                            variant="secondary" 
                            className="bg-primary/20 text-primary text-xs px-1.5 py-0"
                          >
                            {band.tappiesLeft} left
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/40 flex-shrink-0" />
                  </div>

                  {/* Quick Stats Preview */}
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-primary text-lg font-medium">{band.eventsAttended}</p>
                      <p className="text-white/50 text-xs">Events</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-400 text-lg font-medium">{band.matchesMade}</p>
                      <p className="text-white/50 text-xs">Matches</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const BandDetailsView = () => {
    if (!selectedBand) return null;

    return (
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 border-b border-white/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToList}
            className="p-2 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Button>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{selectedBand.name}</h3>
            <p className="text-white/50 text-xs font-mono truncate">{selectedBand.id}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-4 pb-6">
            {/* Band Visual */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-6 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl border border-white/10"
            >
              <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-6 mb-4">
                <Watch className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-white font-medium text-lg mb-1">{selectedBand.name}</h4>
              <p className="text-white/50 text-sm font-mono">{selectedBand.id}</p>
            </motion.div>

            {/* Registration Info Card */}
            <Card className="bg-white/5 border-white/10 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h5 className="text-white font-medium">Registration Details</h5>
              </div>
              <div className="space-y-2 ml-7">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Registered On</span>
                  <span className="text-white text-sm">{formatDate(selectedBand.registeredAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Days Active</span>
                  <span className="text-white text-sm">
                    {Math.floor((new Date().getTime() - selectedBand.registeredAt.getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              </div>
            </Card>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Events Card */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-primary/20 rounded-full p-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{selectedBand.eventsAttended}</p>
                    <p className="text-white/60 text-xs">Events Attended</p>
                  </div>
                </div>
              </Card>

              {/* Matches Card */}
              <Card className="bg-gradient-to-br from-purple-600/10 to-purple-600/5 border-purple-600/20 p-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-purple-600/20 rounded-full p-2">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-400">{selectedBand.matchesMade}</p>
                    <p className="text-white/60 text-xs">Matches Made</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Tappies Left Card */}
            <Card className="bg-gradient-to-r from-primary/10 via-purple-600/10 to-primary/10 border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary to-purple-600 rounded-full p-2">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Tappies Remaining</p>
                    <p className="text-white/50 text-xs">Available connections</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {selectedBand.tappiesLeft}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3 bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((selectedBand.tappiesLeft / 200) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-purple-600"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-white/40 text-xs">0</span>
                <span className="text-white/40 text-xs">200 max</span>
              </div>
            </Card>

            {/* Activity Summary */}
            <Card className="bg-white/5 border-white/10 p-4">
              <h5 className="text-white font-medium mb-3">Activity Summary</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/60 text-sm">Avg. Matches per Event</span>
                  <span className="text-white font-medium">
                    {selectedBand.eventsAttended > 0 
                      ? (selectedBand.matchesMade / selectedBand.eventsAttended).toFixed(1)
                      : '0.0'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/60 text-sm">Total Connections</span>
                  <span className="text-white font-medium">
                    {selectedBand.matchesMade + selectedBand.eventsAttended}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Success Rate</span>
                  <Badge className="bg-green-500/20 text-green-400 border-0">
                    {selectedBand.matchesMade > 0 ? '85%' : '0%'}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
              >
                View History
              </Button>
              <Button
                className="flex-1 gradient-primary hover:gradient-primary-hover"
              >
                Recharge Tappies
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/10 text-white max-w-md mx-auto p-0 h-[80vh] max-h-[600px] overflow-hidden flex flex-col gap-0">
        {!showDetails && (
          <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
            <DialogTitle>Manage TAPPD Bands</DialogTitle>
            <DialogDescription>
              View and manage your registered TAPPD bands
            </DialogDescription>
          </DialogHeader>
        )}

        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {showDetails ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <BandDetailsView />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <BandListView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
