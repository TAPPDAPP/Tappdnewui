import { useState } from "react";
import { X, QrCode, Users, BarChart3, TrendingUp, CheckCircle, UserCheck, Clock, Eye, Camera, Car } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";

interface Guest {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  ticketNumber: string;
  status: 'pending' | 'checked-in';
  checkInTime?: string;
}

interface ManageEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventName: string;
  eventDate: string;
  eventLocation?: string;
}

const mockGuests: Guest[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    ticketType: "VIP",
    ticketNumber: "VIP-001",
    status: 'checked-in',
    checkInTime: "7:30 PM"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    ticketType: "Standard",
    ticketNumber: "STD-045",
    status: 'checked-in',
    checkInTime: "7:45 PM"
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    ticketType: "Premium",
    ticketNumber: "PRM-023",
    status: 'pending'
  },
  {
    id: "4",
    name: "David Kumar",
    email: "d.kumar@email.com",
    ticketType: "Standard",
    ticketNumber: "STD-078",
    status: 'pending'
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    ticketType: "VIP",
    ticketNumber: "VIP-002",
    status: 'checked-in',
    checkInTime: "8:00 PM"
  },
  {
    id: "6",
    name: "James Taylor",
    email: "j.taylor@email.com",
    ticketType: "Premium",
    ticketNumber: "PRM-034",
    status: 'pending'
  },
  {
    id: "7",
    name: "Priya Sharma",
    email: "priya.s@email.com",
    ticketType: "VIP",
    ticketNumber: "VIP-003",
    status: 'checked-in',
    checkInTime: "8:15 PM"
  },
  {
    id: "8",
    name: "Robert Martinez",
    email: "r.martinez@email.com",
    ticketType: "Standard",
    ticketNumber: "STD-089",
    status: 'pending'
  },
  {
    id: "9",
    name: "Sophia Lee",
    email: "sophia.l@email.com",
    ticketType: "Premium",
    ticketNumber: "PRM-056",
    status: 'checked-in',
    checkInTime: "8:30 PM"
  },
  {
    id: "10",
    name: "Alex Rodriguez",
    email: "alex.r@email.com",
    ticketType: "Standard",
    ticketNumber: "STD-112",
    status: 'pending'
  },
  {
    id: "11",
    name: "Maya Patel",
    email: "maya.p@email.com",
    ticketType: "VIP",
    ticketNumber: "VIP-004",
    status: 'pending'
  },
  {
    id: "12",
    name: "Daniel Brown",
    email: "d.brown@email.com",
    ticketType: "Premium",
    ticketNumber: "PRM-067",
    status: 'checked-in',
    checkInTime: "8:45 PM"
  },
  {
    id: "13",
    name: "Olivia White",
    email: "olivia.w@email.com",
    ticketType: "Standard",
    ticketNumber: "STD-123",
    status: 'pending'
  },
  {
    id: "14",
    name: "Noah Thompson",
    email: "noah.t@email.com",
    ticketType: "VIP",
    ticketNumber: "VIP-005",
    status: 'pending'
  },
  {
    id: "15",
    name: "Ava Garcia",
    email: "ava.g@email.com",
    ticketType: "Premium",
    ticketNumber: "PRM-078",
    status: 'checked-in',
    checkInTime: "9:00 PM"
  }
];

export function ManageEventDialog({ open, onOpenChange, eventName, eventDate, eventLocation }: ManageEventDialogProps) {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [scanInput, setScanInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const totalBooked = guests.length;
  const showedUp = guests.filter(g => g.status === 'checked-in').length;
  const remaining = totalBooked - showedUp;

  const handleScanTicket = () => {
    if (!scanInput.trim()) {
      toast.error("Please enter a ticket number");
      return;
    }

    const guest = guests.find(g => g.ticketNumber.toLowerCase() === scanInput.toLowerCase());
    
    if (!guest) {
      toast.error("Ticket not found");
      return;
    }

    if (guest.status === 'checked-in') {
      toast.warning(`${guest.name} already checked in at ${guest.checkInTime}`);
      return;
    }

    const now = new Date();
    const checkInTime = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    setGuests(guests.map(g => 
      g.id === guest.id 
        ? { ...g, status: 'checked-in' as const, checkInTime }
        : g
    ));

    toast.success(`${guest.name} checked in successfully!`);
    setScanInput("");
  };

  const handleCameraScan = () => {
    toast.info("Opening camera for QR code scanning...", {
      description: "Position the QR code within the frame",
      duration: 2000
    });
    // In a real implementation, this would open the device camera
    // For now, we'll simulate it
    setTimeout(() => {
      // Simulate a successful scan
      const pendingGuest = guests.find(g => g.status === 'pending');
      if (pendingGuest) {
        setScanInput(pendingGuest.ticketNumber);
        toast.success("QR Code scanned successfully!");
      }
    }, 2000);
  };

  const handleBookCab = () => {
    toast.success("Opening ride booking...", {
      description: `Booking ride to ${eventLocation || 'event venue'}`,
      duration: 3000
    });
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/10 text-white max-w-2xl h-[85vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
          <DialogTitle className="text-white">{eventName}</DialogTitle>
          <DialogDescription className="text-white/70">
            Manage your event, scan tickets, and view real-time analytics
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="analytics" className="flex-1 flex flex-col min-h-0 px-6 pb-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 flex-shrink-0 mb-4">
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-primary">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="scan" className="text-white data-[state=active]:bg-primary">
              <QrCode className="h-4 w-4 mr-2" />
              Scan
            </TabsTrigger>
            <TabsTrigger value="guests" className="text-white data-[state=active]:bg-primary">
              <Users className="h-4 w-4 mr-2" />
              Guests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="flex-1 min-h-0 mt-0">
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4 pb-4">
                {/* Overview Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-4 text-center">
                      <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl text-white">{totalBooked}</p>
                      <p className="text-xs text-white/60">Booked</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <p className="text-2xl text-white">{showedUp}</p>
                      <p className="text-xs text-white/60">Showed Up</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-4 text-center">
                      <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-2xl text-white">{remaining}</p>
                      <p className="text-xs text-white/60">Remaining</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Attendance Rate */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Attendance Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Current Check-ins</span>
                        <span className="text-white">{Math.round((showedUp / totalBooked) * 100)}%</span>
                      </div>
                      <Progress value={(showedUp / totalBooked) * 100} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Ticket Type Breakdown */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Ticket Type Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {['VIP', 'Premium', 'Standard'].map(type => {
                      const typeGuests = guests.filter(g => g.ticketType === type);
                      const checkedIn = typeGuests.filter(g => g.status === 'checked-in').length;
                      const total = typeGuests.length;
                      
                      return (
                        <div key={type}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">{type}</span>
                            <span className="text-white">{checkedIn}/{total}</span>
                          </div>
                          <Progress value={total > 0 ? (checkedIn / total) * 100 : 0} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Real-time Activity */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Recent Check-ins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {guests
                        .filter(g => g.status === 'checked-in')
                        .slice(-5)
                        .reverse()
                        .map(guest => (
                          <div key={guest.id} className="flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm">{guest.name}</p>
                              <p className="text-white/50 text-xs">{guest.ticketType}</p>
                            </div>
                            <p className="text-white/70 text-xs">{guest.checkInTime}</p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cab Booking Option */}
                <Card className="bg-gradient-to-r from-black to-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Car className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white">Need to get to the venue?</h4>
                        <p className="text-white/70 text-xs">Book a ride to manage your event</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleBookCab}
                      className="w-full bg-white text-black hover:bg-gray-100"
                    >
                      <Car className="h-4 w-4 mr-2" />
                      Book Ride
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="scan" className="flex-1 min-h-0 mt-0">
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4 pb-4">
                {/* Scan Interface */}
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-32 h-32 border-4 border-primary rounded-lg flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-primary" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-white/70 text-center text-sm">
                        Scan QR code or enter ticket number manually
                      </p>

                      {/* Camera Scan Button */}
                      <Button
                        onClick={handleCameraScan}
                        className="w-full gradient-primary mb-3"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Open Camera to Scan QR Code
                      </Button>
                      
                      <div className="flex gap-2">
                        <Input
                          value={scanInput}
                          onChange={(e) => setScanInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleScanTicket()}
                          placeholder="Enter ticket number (e.g., VIP-001)"
                          className="bg-input-background border-white/10 text-white placeholder:text-white/50"
                        />
                        <Button 
                          onClick={handleScanTicket}
                          className="gradient-primary"
                        >
                          Check In
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-primary text-xl">{totalBooked}</p>
                    <p className="text-white/60 text-xs">Total</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-green-400 text-xl">{showedUp}</p>
                    <p className="text-white/60 text-xs">In</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <p className="text-yellow-400 text-xl">{remaining}</p>
                    <p className="text-white/60 text-xs">Pending</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="guests" className="flex-1 min-h-0 mt-0 overflow-hidden">
            <div className="h-full flex flex-col overflow-hidden">
              {/* Header with guest count */}
              <div className="flex items-center justify-between flex-shrink-0 mb-4">
                <div className="text-white/70 text-sm">
                  Total Guests: <span className="text-white font-medium">{guests.length}</span>
                </div>
                <div className="text-white/70 text-sm">
                  Checked In: <span className="text-green-400 font-medium">{showedUp}</span>
                </div>
              </div>

              {/* Search */}
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guests..."
                className="bg-input-background border-white/10 text-white placeholder:text-white/50 flex-shrink-0 mb-4"
              />

              {/* Guest List */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-2 pr-4 pb-4">
                    {filteredGuests.map((guest, index) => (
                      <Card key={guest.id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Guest Number */}
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-primary text-sm font-medium">#{index + 1}</span>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-white">{guest.name}</p>
                                <Badge 
                                  className={
                                    guest.status === 'checked-in'
                                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                  }
                                >
                                  {guest.status === 'checked-in' ? 'Checked In' : 'Pending'}
                                </Badge>
                              </div>
                              <p className="text-white/60 text-sm">{guest.email}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                                <span>{guest.ticketType}</span>
                                <span>•</span>
                                <span>{guest.ticketNumber}</span>
                                {guest.checkInTime && (
                                  <>
                                    <span>•</span>
                                    <span className="text-green-400">{guest.checkInTime}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {guest.status === 'checked-in' ? (
                              <UserCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setScanInput(guest.ticketNumber);
                                  handleScanTicket();
                                }}
                                className="gradient-primary"
                              >
                                Check In
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}