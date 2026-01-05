import { useState } from "react";
import { ArrowLeft, Calendar, CreditCard, Ticket, Star, TrendingUp, Users, MessageSquare, Award, Clock, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookedEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  ticketNumber: string;
  price: number;
  status: 'upcoming' | 'completed' | 'ongoing';
  image: string;
  hasRated: boolean;
  rating?: number;
  connections: number;
}

interface Transaction {
  id: string;
  eventName: string;
  date: string;
  amount: number;
  ticketType: string;
  quantity: number;
  status: 'completed' | 'pending' | 'refunded';
  transactionId: string;
}

interface ManageBookingsProps {
  onBack: () => void;
  onEventSelect?: (eventId: string, eventName: string) => void;
}

const mockBookedEvents: BookedEvent[] = [
  {
    id: "1",
    name: "Rooftop Jazz Night",
    date: "2024-12-15",
    time: "8:00 PM",
    location: "Sky Lounge, Mumbai",
    ticketType: "VIP",
    ticketNumber: "VIP-001",
    price: 1500,
    status: 'upcoming',
    image: "jazz concert",
    hasRated: false,
    connections: 0
  },
  {
    id: "2",
    name: "Tech Startup Pitch Night",
    date: "2024-11-28",
    time: "6:30 PM",
    location: "Innovation Hub, Bangalore",
    ticketType: "Standard",
    ticketNumber: "STD-045",
    price: 500,
    status: 'completed',
    image: "business conference",
    hasRated: true,
    rating: 5,
    connections: 12
  },
  {
    id: "3",
    name: "Summer Food Festival",
    date: "2024-12-05",
    time: "12:00 PM",
    location: "Central Plaza, Delhi",
    ticketType: "Premium",
    ticketNumber: "PRM-023",
    price: 800,
    status: 'ongoing',
    image: "food festival",
    hasRated: false,
    connections: 5
  }
];

const mockTransactions: Transaction[] = [
  {
    id: "txn-1",
    eventName: "Rooftop Jazz Night",
    date: "2024-12-01",
    amount: 1500,
    ticketType: "VIP",
    quantity: 1,
    status: 'completed',
    transactionId: "TXN1234567890"
  },
  {
    id: "txn-2",
    eventName: "Tech Startup Pitch Night",
    date: "2024-11-20",
    amount: 500,
    ticketType: "Standard",
    quantity: 1,
    status: 'completed',
    transactionId: "TXN0987654321"
  },
  {
    id: "txn-3",
    eventName: "Summer Food Festival",
    date: "2024-11-28",
    amount: 800,
    ticketType: "Premium",
    quantity: 1,
    status: 'completed',
    transactionId: "TXN1122334455"
  }
];

export function ManageBookings({ onBack, onEventSelect }: ManageBookingsProps) {
  const [bookedEvents, setBookedEvents] = useState<BookedEvent[]>(mockBookedEvents);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedEvent, setSelectedEvent] = useState<BookedEvent | null>(null);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const totalSpent = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const eventsAttended = bookedEvents.filter(e => e.status === 'completed').length;
  const totalConnections = bookedEvents.reduce((sum, e) => sum + e.connections, 0);

  const handleRateEvent = (event: BookedEvent) => {
    setSelectedEvent(event);
    setRating(event.rating || 0);
    setShowRatingDialog(true);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (selectedEvent) {
      setBookedEvents(bookedEvents.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, hasRated: true, rating }
          : e
      ));
      
      toast.success("Thank you for your rating!");
      setShowRatingDialog(false);
      setRating(0);
      setReview("");
      setSelectedEvent(null);
    }
  };

  const handleShowTicket = (event: BookedEvent) => {
    setSelectedEvent(event);
    setShowTicketDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ongoing': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'refunded': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const EventCard = ({ event }: { event: BookedEvent }) => (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <ImageWithFallback
            src={event.image}
            alt={event.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-white mb-1 truncate">{event.name}</h3>
                <p className="text-white/60 text-sm truncate">{event.location}</p>
              </div>
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => handleShowTicket(event)}
                className="gradient-primary flex-1"
              >
                <Ticket className="h-3 w-3 mr-1" />
                View Ticket
              </Button>
              
              {event.status === 'completed' && !event.hasRated && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRateEvent(event)}
                  className="border-white/20 text-white flex-1"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Rate
                </Button>
              )}
              
              {event.hasRated && (
                <div className="flex items-center gap-1 flex-1 justify-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{event.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
        <h1 className="text-white">Manage Bookings</h1>
        <div className="w-10" />
      </div>

      {/* Overview Stats */}
      <div className="p-4 border-b border-white/10">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-3 text-center">
              <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-lg text-white">{bookedEvents.length}</p>
              <p className="text-xs text-white/60">Booked</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-3 text-center">
              <Users className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <p className="text-lg text-white">{totalConnections}</p>
              <p className="text-xs text-white/60">Connections</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-3 text-center">
              <Award className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg text-white">{eventsAttended}</p>
              <p className="text-xs text-white/60">Attended</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="events" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border-b border-white/10 rounded-none">
            <TabsTrigger value="events" className="text-white data-[state=active]:bg-primary">
              Events
            </TabsTrigger>
            <TabsTrigger value="tickets" className="text-white data-[state=active]:bg-primary">
              Tickets
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-primary">
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 safe-bottom">
            {bookedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>

          <TabsContent value="tickets" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 safe-bottom">
            {bookedEvents.filter(e => e.status !== 'completed').map(event => (
              <Card key={event.id} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white mb-1">{event.name}</h3>
                      <p className="text-white/60 text-sm">{event.ticketType} - {event.ticketNumber}</p>
                    </div>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Date:</span>
                      <span className="text-white">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Time:</span>
                      <span className="text-white">{event.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Location:</span>
                      <span className="text-white truncate ml-2">{event.location}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleShowTicket(event)}
                    className="w-full gradient-primary"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    View QR Code
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="transactions" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 safe-bottom">
            <Card className="bg-white/5 border-white/10 mb-4">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-1">Total Spent</p>
                  <p className="text-3xl text-primary">₹{totalSpent.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            {transactions.map(txn => (
              <Card key={txn.id} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{txn.eventName}</h3>
                      <p className="text-white/60 text-sm">Transaction ID: {txn.transactionId}</p>
                    </div>
                    <Badge className={getTransactionStatusColor(txn.status)}>
                      {txn.status}
                    </Badge>
                  </div>

                  <Separator className="bg-white/10 my-3" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Date:</span>
                      <span className="text-white">{new Date(txn.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Ticket Type:</span>
                      <span className="text-white">{txn.ticketType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Quantity:</span>
                      <span className="text-white">{txn.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Amount:</span>
                      <span className="text-primary">₹{txn.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="bg-background border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Rate Event</DialogTitle>
            <DialogDescription className="text-white/70">
              How was your experience at {selectedEvent?.name}?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Star Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    className={`h-10 w-10 ${
                      star <= rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-white/30'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <label className="text-white text-sm">Your Review (Optional)</label>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts about the event..."
                rows={4}
                className="bg-input-background border-white/10 text-white placeholder:text-white/50 resize-none"
              />
            </div>

            {/* Connections Made */}
            {selectedEvent && selectedEvent.connections > 0 && (
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-white text-sm">
                        You made {selectedEvent.connections} connections at this event!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowRatingDialog(false);
                  setRating(0);
                  setReview("");
                }}
                variant="outline"
                className="flex-1 border-white/20 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitRating}
                className="flex-1 gradient-primary"
              >
                Submit Rating
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ticket Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="bg-background border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Your Ticket</DialogTitle>
            <DialogDescription className="text-white/70">
              Show this QR code at the venue entrance
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              {/* QR Code */}
              <div className="flex items-center justify-center p-6 bg-white rounded-lg">
                <div className="w-48 h-48 border-4 border-primary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Ticket className="h-16 w-16 text-primary mx-auto mb-2" />
                    <p className="text-background text-sm">{selectedEvent.ticketNumber}</p>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-white mb-3">{selectedEvent.name}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Date:</span>
                    <span className="text-white">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Time:</span>
                    <span className="text-white">{selectedEvent.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Ticket Type:</span>
                    <span className="text-white">{selectedEvent.ticketType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Ticket Number:</span>
                    <span className="text-white">{selectedEvent.ticketNumber}</span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={() => {
                  toast.success("Ticket downloaded!");
                }}
                className="w-full gradient-primary"
              >
                Download Ticket
              </Button>

              {/* Uber Ride Booking - only show for upcoming/ongoing events */}
              {(selectedEvent.status === 'upcoming' || selectedEvent.status === 'ongoing') && (
                <Card className="bg-gradient-to-r from-black to-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Car className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white">Need a ride?</h4>
                        <p className="text-white/70 text-xs">Book an Uber to the venue</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        toast.success("Opening Uber app...", {
                          description: `Booking ride to ${selectedEvent.location}`,
                          duration: 3000
                        });
                      }}
                      className="w-full bg-white text-black hover:bg-gray-100"
                    >
                      <Car className="h-4 w-4 mr-2" />
                      Book Uber
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}