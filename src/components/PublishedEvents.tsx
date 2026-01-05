import { useState } from "react";
import { ArrowLeft, Calendar, Users, TrendingUp, DollarSign, Star, MessageSquare, Eye, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

interface PublishedEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  maxOccupancy: number;
  registrations: number;
  revenue: number;
  serviceCharge: number;
  netEarnings: number;
  rating: number;
  totalReviews: number;
  connections: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  reviews: Array<{
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    reply?: string;
  }>;
}

interface PublishedEventsProps {
  onBack: () => void;
}

// Mock published events data
const mockPublishedEvents: PublishedEvent[] = [
  {
    id: "pub-1",
    name: "Rooftop Jazz Night",
    date: "2024-06-20",
    location: "Sky Lounge",
    maxOccupancy: 100,
    registrations: 85,
    revenue: 127500,
    serviceCharge: 25500,
    netEarnings: 102000,
    rating: 4.7,
    totalReviews: 42,
    connections: 78,
    status: 'completed',
    reviews: [
      {
        id: "r1",
        userName: "Sarah M.",
        rating: 5,
        comment: "Amazing atmosphere and great music! The venue was perfect for networking.",
        date: "2024-06-21"
      },
      {
        id: "r2", 
        userName: "Mike R.",
        rating: 4,
        comment: "Good event overall, though the sound could have been better in some areas.",
        date: "2024-06-21"
      }
    ]
  },
  {
    id: "pub-2",
    name: "Tech Startup Pitch Night",
    date: "2024-07-25",
    location: "Innovation Hub",
    maxOccupancy: 150,
    registrations: 142,
    revenue: 213000,
    serviceCharge: 42600,
    netEarnings: 170400,
    rating: 4.9,
    totalReviews: 67,
    connections: 156,
    status: 'upcoming',
    reviews: []
  },
  {
    id: "pub-3",
    name: "Summer Food Festival",
    date: "2024-07-10",
    location: "Central Plaza",
    maxOccupancy: 300,
    registrations: 278,
    revenue: 417000,
    serviceCharge: 83400,
    netEarnings: 333600,
    rating: 4.5,
    totalReviews: 89,
    connections: 234,
    status: 'ongoing',
    reviews: [
      {
        id: "r3",
        userName: "Emma L.",
        rating: 5,
        comment: "Incredible variety of food vendors! Met so many interesting people.",
        date: "2024-07-10"
      }
    ]
  }
];

export function PublishedEvents({ onBack }: PublishedEventsProps) {
  const [events] = useState<PublishedEvent[]>(mockPublishedEvents);
  const [selectedEvent, setSelectedEvent] = useState<PublishedEvent | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
  const totalNetEarnings = events.reduce((sum, event) => sum + event.netEarnings, 0);
  const totalRegistrations = events.reduce((sum, event) => sum + event.registrations, 0);
  const totalConnections = events.reduce((sum, event) => sum + event.connections, 0);
  const averageRating = events.reduce((sum, event) => sum + event.rating, 0) / events.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ongoing': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleReplySubmit = (reviewId: string) => {
    console.log('Reply submitted for review:', reviewId, replyText);
    // Implement reply logic
    setReplyingTo(null);
    setReplyText("");
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  // Mock data for earnings graph
  const earningsData = [
    { month: 'Jan', earnings: 45000 },
    { month: 'Feb', earnings: 52000 },
    { month: 'Mar', earnings: 78000 },
    { month: 'Apr', earnings: 89000 },
    { month: 'May', earnings: 95000 },
    { month: 'Jun', earnings: 102000 },
    { month: 'Jul', earnings: 170400 }
  ];

  const EventCard = ({ event }: { event: PublishedEvent }) => (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => setSelectedEvent(event)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-white mb-1">{event.name}</h3>
            <p className="text-white/60 text-sm">{event.location}</p>
          </div>
          <Badge className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl text-primary">{event.registrations}</p>
            <p className="text-xs text-white/60">Registrations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-green-400">{formatCurrency(event.netEarnings)}</p>
            <p className="text-xs text-white/60">Net Earnings</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-white/70">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{event.rating} ({event.totalReviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{event.connections} connections</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EventDetailModal = ({ event }: { event: PublishedEvent }) => (
    <Dialog open={!!event} onOpenChange={() => setSelectedEvent(null)}>
      <DialogContent className="bg-background border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{event.name}</DialogTitle>
          <DialogDescription className="text-white/70">
            Analytics, reviews, and financial details for your published event
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-primary">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-primary">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="financials" className="text-white data-[state=active]:bg-primary">
              Financials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl text-white">{event.registrations}</p>
                  <p className="text-sm text-white/60">Registered</p>
                  <Progress 
                    value={(event.registrations / event.maxOccupancy) * 100} 
                    className="mt-2 h-2"
                  />
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl text-white">{event.connections}</p>
                  <p className="text-sm text-white/60">Connections Made</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Ratings & Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl text-yellow-400">{event.rating}</p>
                    <p className="text-sm text-white/60">Average Rating</p>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-white/60 text-sm">{star}★</span>
                          <Progress value={star === 5 ? 70 : star === 4 ? 20 : 10} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {event.reviews.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No reviews yet</p>
              </div>
            ) : (
              event.reviews.map((review) => (
                <Card key={review.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white">{review.userName}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/50 text-sm">{review.date}</p>
                    </div>
                    <p className="text-white/80 mb-3">{review.comment}</p>
                    
                    {review.reply && (
                      <div className="bg-primary/10 border-l-2 border-primary pl-3 py-2 mb-2">
                        <p className="text-primary text-sm">Host Reply:</p>
                        <p className="text-white/80 text-sm">{review.reply}</p>
                      </div>
                    )}
                    
                    {!review.reply && (
                      <div>
                        {replyingTo === review.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write your reply..."
                              rows={2}
                              className="bg-input-background border-white/10 text-white placeholder:text-white/50"
                            />
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="gradient-primary"
                                onClick={() => handleReplySubmit(review.id)}
                              >
                                Send Reply
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-white/20 text-white"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/20 text-white/70"
                            onClick={() => setReplyingTo(review.id)}
                          >
                            Reply
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Revenue Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Revenue:</span>
                    <span className="text-white">{formatCurrency(event.revenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">TAPPD Service Charge (20%):</span>
                    <span className="text-red-400">-{formatCurrency(event.serviceCharge)}</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Net Earnings:</span>
                    <span className="text-green-400 font-medium">{formatCurrency(event.netEarnings)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Occupancy Rate:</span>
                    <span className="text-white">{Math.round((event.registrations / event.maxOccupancy) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Revenue per Attendee:</span>
                    <span className="text-white">{formatCurrency(Math.round(event.revenue / event.registrations))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Connection Rate:</span>
                    <span className="text-white">{Math.round((event.connections / event.registrations) * 100)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
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
        <h1 className="text-white">Published Events</h1>
        <div className="w-10" />
      </div>

      {/* Overview Stats */}
      <div className="p-4 border-b border-white/10">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-3 text-center">
              <p className="text-lg text-green-400">{formatCurrency(totalNetEarnings)}</p>
              <p className="text-xs text-white/60">Total Earnings</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-3 text-center">
              <p className="text-lg text-primary">{totalRegistrations}</p>
              <p className="text-xs text-white/60">Total Registrations</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between text-sm text-white/70">
          <span>{events.length} events published</span>
          <span>Avg. {averageRating.toFixed(1)}★ rating</span>
        </div>
      </div>

      {/* Earnings Graph */}
      <div className="p-4 border-b border-white/10">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Earnings Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'white' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="hsl(var(--primary))" 
                  fill="url(#earningsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 safe-bottom">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && <EventDetailModal event={selectedEvent} />}
    </div>
  );
}