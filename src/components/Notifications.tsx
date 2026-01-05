import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, X, Calendar, MapPin, Clock, MessageCircle, Users, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface NotificationProps {
  onBack: () => void;
  onEventSelect: (eventId: string, eventName: string) => void;
  onOpenChat: (chatId: string) => void;
  onOpenReconnect: () => void;
  onOpenEventInteraction: (eventId: string) => void;
}

interface BaseNotification {
  id: string;
  timestamp: string;
  read: boolean;
}

interface EventNotification extends BaseNotification {
  type: 'recommended' | 'wishlisted' | 'booked';
  eventName: string;
  eventId: string;
  date: string;
  location: string;
  bookedDetails?: {
    bookedOn: string;
    peopleCount: number;
  };
}

interface ChatNotification extends BaseNotification {
  type: 'chat';
  userName: string;
  userAvatar: string;
  chatId: string;
  lastMessage: string;
}

interface ReconnectNotification extends BaseNotification {
  type: 'reconnect';
  userName: string;
  userAvatar: string;
  userId: string;
}

interface EventInteractionNotification extends BaseNotification {
  type: 'event_interaction';
  userName: string;
  userAvatar: string;
  eventName: string;
  eventId: string;
  interactionType: 'post' | 'match';
  content: string;
}

interface HostNotification extends BaseNotification {
  type: 'host';
  subType: 'posted' | 'ongoing' | 'upcoming';
  eventName: string;
  eventId: string;
  details: string;
}

// Mock notifications data
const mockNotifications = {
  events: [
    {
      id: 'evt-1',
      type: 'recommended' as const,
      eventName: 'Jazz & Wine Night',
      eventId: 'jazz-wine-2024',
      date: 'Dec 23, 2024',
      location: 'Blue Note Cafe',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 'evt-2', 
      type: 'booked' as const,
      eventName: 'Rooftop Pool Party',
      eventId: 'pool-party-2024',
      date: 'Dec 25, 2024',
      location: 'Sky Lounge',
      timestamp: '1 day ago',
      read: false,
      bookedDetails: {
        bookedOn: 'Dec 20, 2024 at 3:30 PM',
        peopleCount: 2
      }
    },
    {
      id: 'evt-3',
      type: 'wishlisted' as const, 
      eventName: 'Tech Startup Mixer',
      eventId: 'tech-mixer-2024',
      date: 'Dec 28, 2024',
      location: 'Innovation Hub',
      timestamp: '2 days ago',
      read: true
    }
  ] as EventNotification[],
  
  eventInteraction: [
    {
      id: 'ei-1',
      type: 'event_interaction' as const,
      userName: 'Priya Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b833?auto=format&fit=crop&w=100&h=100',
      eventName: 'Jazz & Wine Night',
      eventId: 'jazz-wine-2024',
      interactionType: 'post' as const,
      content: 'Just posted amazing photos from the jazz session!',
      timestamp: '30 minutes ago',
      read: false
    },
    {
      id: 'ei-2',
      type: 'event_interaction' as const,
      userName: 'Vikram Patel',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
      eventName: 'Rooftop Pool Party',
      eventId: 'pool-party-2024', 
      interactionType: 'match' as const,
      content: 'You have a new connection match!',
      timestamp: '2 hours ago',
      read: false
    }
  ] as EventInteractionNotification[],
  
  chat: [
    {
      id: 'chat-1',
      type: 'chat' as const,
      userName: 'Emma Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
      chatId: 'chat-emma-123',
      lastMessage: 'Looking forward to the jazz night!',
      timestamp: '5 minutes ago',
      read: false
    },
    {
      id: 'chat-2',
      type: 'chat' as const,
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
      chatId: 'chat-michael-456',
      lastMessage: 'Great meeting you at the pool party',
      timestamp: '20 minutes ago',
      read: false
    },
    {
      id: 'chat-3',
      type: 'chat' as const,
      userName: 'Sarah Williams',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100',
      chatId: 'chat-sarah-789',
      lastMessage: 'The concert was amazing! 🎵',
      timestamp: '1 hour ago',
      read: true
    }
  ] as ChatNotification[],
  
  reconnect: [
    {
      id: 'rc-1',
      type: 'reconnect' as const,
      userName: 'Aditi Gupta',
      userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&h=100',
      userId: 'user-aditi-123',
      timestamp: '15 minutes ago',
      read: false
    },
    {
      id: 'rc-2',
      type: 'reconnect' as const,
      userName: 'Rohan Malhotra',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100',
      userId: 'user-rohan-456',
      timestamp: '3 hours ago',
      read: false
    }
  ] as ReconnectNotification[],
  
  host: [
    {
      id: 'host-1',
      type: 'host' as const,
      subType: 'upcoming' as const,
      eventName: 'Private House Party',
      eventId: 'house-party-2024',
      details: 'Your event starts in 2 days - 45 people registered',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 'host-2',
      type: 'host' as const,
      subType: 'posted' as const,
      eventName: 'Wine Tasting Evening',
      eventId: 'wine-tasting-2024',
      details: 'Your event has been approved and is now live!',
      timestamp: '6 hours ago',
      read: false
    },
    {
      id: 'host-3',
      type: 'host' as const,
      subType: 'ongoing' as const,
      eventName: 'Business Networking Mixer',
      eventId: 'business-mixer-2024',
      details: 'Event is currently ongoing - 23 attendees checked in',
      timestamp: '2 hours ago',
      read: true
    }
  ] as HostNotification[]
};

export function Notifications({ 
  onBack, 
  onEventSelect, 
  onOpenChat, 
  onOpenReconnect, 
  onOpenEventInteraction 
}: NotificationProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    events: true,
    eventInteraction: false,
    chat: false,
    reconnect: false,
    host: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const dismissNotification = (category: keyof typeof notifications, notificationId: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category].filter(notification => notification.id !== notificationId)
    }));
  };

  const getUnreadCount = (categoryNotifications: BaseNotification[]) => {
    return categoryNotifications.filter(n => !n.read).length;
  };

  const getTotalUnreadCount = () => {
    return Object.values(notifications).flat().filter(n => !n.read).length;
  };

  const handleEventClick = (notification: EventNotification) => {
    onEventSelect(notification.eventId, notification.eventName);
  };

  const handleChatClick = (notification: ChatNotification) => {
    onOpenChat(notification.chatId);
  };

  const handleReconnectClick = () => {
    onOpenReconnect();
  };

  const handleEventInteractionClick = (notification: EventInteractionNotification) => {
    onOpenEventInteraction(notification.eventId);
  };

  const handleHostClick = (notification: HostNotification) => {
    // For now, just open the event - could be expanded to show host dashboard
    onEventSelect(notification.eventId, notification.eventName);
  };

  const NotificationCard = ({ 
    children, 
    onDismiss, 
    read = false,
    onClick 
  }: { 
    children: React.ReactNode; 
    onDismiss: () => void; 
    read?: boolean;
    onClick?: () => void;
  }) => (
    <Card 
      className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer ${
        !read ? 'border-primary/30 bg-primary/5' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-1 h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
        >
          <X className="h-3 w-3" />
        </Button>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex items-center gap-2">
          <h1 className="text-white">Notifications</h1>
          {getTotalUnreadCount() > 0 && (
            <Badge className="gradient-primary text-white border-0">
              {getTotalUnreadCount()}
            </Badge>
          )}
        </div>
        
        <div className="w-10" />
      </div>

      {/* Notifications Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4 safe-bottom">
          {/* Events Section */}
          <Collapsible 
            open={openSections.events} 
            onOpenChange={() => toggleSection('events')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-white font-medium">Events</span>
                  {getUnreadCount(notifications.events) > 0 && (
                    <Badge className="gradient-primary text-white border-0 text-xs">
                      {getUnreadCount(notifications.events)}
                    </Badge>
                  )}
                </div>
                {openSections.events ? (
                  <ChevronUp className="h-4 w-4 text-white/70" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/70" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {notifications.events.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  read={notification.read}
                  onDismiss={() => dismissNotification('events', notification.id)}
                  onClick={() => handleEventClick(notification)}
                >
                  <div className="space-y-2 pr-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-white font-medium">{notification.eventName}</h4>
                      <span className="text-white/50 text-xs">{notification.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="h-3 w-3" />
                      <span>{notification.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="h-3 w-3" />
                      <span>{notification.location}</span>
                    </div>
                    {notification.bookedDetails && (
                      <div className="text-sm text-green-400">
                        Booked on {notification.bookedDetails.bookedOn} for {notification.bookedDetails.peopleCount} people
                      </div>
                    )}
                    <Badge 
                      className={`text-xs ${
                        notification.type === 'recommended' ? 'bg-blue-500/20 text-blue-400' :
                        notification.type === 'booked' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {notification.type === 'recommended' ? 'Recommended' :
                       notification.type === 'booked' ? 'Booked' : 'Wishlisted'}
                    </Badge>
                  </div>
                </NotificationCard>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Event Interaction Section */}
          <Collapsible 
            open={openSections.eventInteraction} 
            onOpenChange={() => toggleSection('eventInteraction')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-white font-medium">Event Interaction</span>
                  {getUnreadCount(notifications.eventInteraction) > 0 && (
                    <Badge className="gradient-primary text-white border-0 text-xs">
                      {getUnreadCount(notifications.eventInteraction)}
                    </Badge>
                  )}
                </div>
                {openSections.eventInteraction ? (
                  <ChevronUp className="h-4 w-4 text-white/70" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/70" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {notifications.eventInteraction.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  read={notification.read}
                  onDismiss={() => dismissNotification('eventInteraction', notification.id)}
                  onClick={() => handleEventInteractionClick(notification)}
                >
                  <div className="flex items-start gap-3 pr-6">
                    <img 
                      src={notification.userAvatar} 
                      alt={notification.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="text-white font-medium">{notification.userName}</p>
                        <span className="text-white/50 text-xs">{notification.timestamp}</span>
                      </div>
                      <p className="text-white/70 text-sm">{notification.content}</p>
                      <p className="text-primary text-sm">in {notification.eventName}</p>
                      <Badge 
                        className={`text-xs ${
                          notification.interactionType === 'post' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-pink-500/20 text-pink-400'
                        }`}
                      >
                        {notification.interactionType === 'post' ? 'New Post' : 'New Match'}
                      </Badge>
                    </div>
                  </div>
                </NotificationCard>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Chat Section */}
          <Collapsible 
            open={openSections.chat} 
            onOpenChange={() => toggleSection('chat')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span className="text-white font-medium">Chat</span>
                  {getUnreadCount(notifications.chat) > 0 && (
                    <Badge className="gradient-primary text-white border-0 text-xs">
                      {getUnreadCount(notifications.chat)}
                    </Badge>
                  )}
                </div>
                {openSections.chat ? (
                  <ChevronUp className="h-4 w-4 text-white/70" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/70" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {notifications.chat.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  read={notification.read}
                  onDismiss={() => dismissNotification('chat', notification.id)}
                  onClick={() => handleChatClick(notification)}
                >
                  <div className="flex items-start gap-3 pr-6">
                    <img 
                      src={notification.userAvatar} 
                      alt={notification.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="text-white font-medium">{notification.userName}</p>
                        <span className="text-white/50 text-xs">{notification.timestamp}</span>
                      </div>
                      <p className="text-white/70 text-sm">{notification.lastMessage}</p>
                    </div>
                  </div>
                </NotificationCard>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Reconnect Section */}
          <Collapsible 
            open={openSections.reconnect} 
            onOpenChange={() => toggleSection('reconnect')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-white font-medium">Reconnect</span>
                  {getUnreadCount(notifications.reconnect) > 0 && (
                    <Badge className="gradient-primary text-white border-0 text-xs">
                      {getUnreadCount(notifications.reconnect)}
                    </Badge>
                  )}
                </div>
                {openSections.reconnect ? (
                  <ChevronUp className="h-4 w-4 text-white/70" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/70" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {notifications.reconnect.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  read={notification.read}
                  onDismiss={() => dismissNotification('reconnect', notification.id)}
                  onClick={handleReconnectClick}
                >
                  <div className="flex items-start gap-3 pr-6">
                    <img 
                      src={notification.userAvatar} 
                      alt={notification.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="text-white font-medium">New Connection Request</p>
                        <span className="text-white/50 text-xs">{notification.timestamp}</span>
                      </div>
                      <p className="text-white/70 text-sm">You have a request from {notification.userName}</p>
                    </div>
                  </div>
                </NotificationCard>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Host Section */}
          <Collapsible 
            open={openSections.host} 
            onOpenChange={() => toggleSection('host')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-white font-medium">Host</span>
                  {getUnreadCount(notifications.host) > 0 && (
                    <Badge className="gradient-primary text-white border-0 text-xs">
                      {getUnreadCount(notifications.host)}
                    </Badge>
                  )}
                </div>
                {openSections.host ? (
                  <ChevronUp className="h-4 w-4 text-white/70" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/70" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {notifications.host.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  read={notification.read}
                  onDismiss={() => dismissNotification('host', notification.id)}
                  onClick={() => handleHostClick(notification)}
                >
                  <div className="space-y-2 pr-6">
                    <div className="flex items-start justify-between">
                      <h4 className="text-white font-medium">{notification.eventName}</h4>
                      <span className="text-white/50 text-xs">{notification.timestamp}</span>
                    </div>
                    <p className="text-white/70 text-sm">{notification.details}</p>
                    <Badge 
                      className={`text-xs ${
                        notification.subType === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                        notification.subType === 'ongoing' ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}
                    >
                      {notification.subType === 'upcoming' ? 'Upcoming Event' :
                       notification.subType === 'ongoing' ? 'Ongoing Event' : 'Event Posted'}
                    </Badge>
                  </div>
                </NotificationCard>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Empty State */}
          {getTotalUnreadCount() === 0 && Object.values(notifications).every(arr => arr.length === 0) && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-white/50" />
              </div>
              <h3 className="text-white/70 mb-2">No notifications yet</h3>
              <p className="text-white/50 text-sm">
                You'll see updates about events, chats, and connections here
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}