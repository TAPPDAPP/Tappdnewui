import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Video, Phone, Search, MoreVertical, Send, Smile } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { ChatSettings } from "./ChatSettings";

interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  messageCount: number;
  timestamp: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b833?auto=format&fit=crop&w=100&h=100',
    lastMessage: 'Looking forward to the jazz night!',
    messageCount: 3,
    timestamp: '2m ago',
    isOnline: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
    lastMessage: 'Great meeting you at the pool party',
    messageCount: 1,
    timestamp: '15m ago',
    isOnline: false
  },
  {
    id: '3',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
    lastMessage: 'The concert was amazing! 🎵',
    messageCount: 7,
    timestamp: '1h ago',
    isOnline: true
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
    lastMessage: 'Thanks for the recommendation',
    messageCount: 2,
    timestamp: '3h ago',
    isOnline: false
  },
  {
    id: '5',
    name: 'Jessica Park',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=100&h=100',
    lastMessage: 'See you at the art gallery opening!',
    messageCount: 0,
    timestamp: '5h ago',
    isOnline: true
  },
  {
    id: '6',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100',
    lastMessage: 'The hiking trip was incredible',
    messageCount: 0,
    timestamp: '1d ago',
    isOnline: false
  }
];

const mockMessages: Message[] = [
  { id: '1', text: 'Hey! Are you going to the jazz event tonight?', sender: 'other', timestamp: '7:30 PM' },
  { id: '2', text: 'Yes! I\'m really excited. Are you performing?', sender: 'user', timestamp: '7:32 PM' },
  { id: '3', text: 'Actually yes! I\'ll be playing saxophone in the second set', sender: 'other', timestamp: '7:33 PM' },
  { id: '4', text: 'That\'s awesome! I can\'t wait to hear you play', sender: 'user', timestamp: '7:35 PM' },
  { id: '5', text: 'Looking forward to the jazz night!', sender: 'other', timestamp: '7:40 PM' }
];

export function ChatSection() {
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleChatSelect = (chat: ChatPreview) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
    setShowSettings(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Show typing indicator briefly
      setIsTyping(true);
      
      // Simulate response after a short delay
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "That sounds great!",
          "I agree!",
          "Thanks for sharing that",
          "Interesting point!",
          "Cool! 😊"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'other',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  if (selectedChat) {
    // Show chat settings if settings is active
    if (showSettings) {
      return (
        <ChatSettings
          userName={selectedChat.name}
          userAvatar={selectedChat.avatar}
          onBack={handleBackFromSettings}
          onRemoveFriend={(userName) => {
            // Handle remove friend
            console.log('Removed friend:', userName);
            // In a real app, this would call an API to remove the friend
            setSelectedChat(null);
            setShowSettings(false);
          }}
          onBlockUser={(userName) => {
            // Handle block user
            console.log('Blocked user:', userName);
            // In a real app, this would call an API to block the user
            setSelectedChat(null);
            setShowSettings(false);
          }}
        />
      );
    }

    return (
      <div className="flex flex-col h-full bg-background m-[0px] pt-[-10px] pr-[0px] pb-[0px] pl-[0px]">
        {/* Chat Header */}
        <div className="bg-background border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-1 hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <img src={selectedChat.avatar} alt={selectedChat.name} className="rounded-full" />
                </Avatar>
                {selectedChat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              <div>
                <h3 className="text-white font-medium">{selectedChat.name}</h3>
                <p className="text-white/60 text-sm">{selectedChat.isOnline ? 'Online' : 'Last seen 2h ago'}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
              <Video className="h-5 w-5 text-white" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
              <Phone className="h-5 w-5 text-white" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
              <Search className="h-5 w-5 text-white" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white/10 h-10 w-10">
                <MoreVertical className="h-5 w-5 text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-white/10 text-white">
                <DropdownMenuItem className="hover:bg-white/10" onClick={handleSettingsClick}>
                  Chat Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">When We Matched</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">Media Shared</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-2 pb-20">
          <div className="space-y-4 px-[0px] py-[-10px] mx-[0px] my-[-30px] mt-[0px] mr-[0px] mb-[10px] ml-[0px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-white/60'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white max-w-[70%] rounded-lg px-3 py-2">
                  <span className="text-xs text-white/60">typing...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Fixed Message Input Above Bottom Nav */}
        <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto bg-background border-t border-white/10 px-4 py-3 z-10">
          <div className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-20"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-primary hover:bg-primary/80 p-2 absolute right-6"
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-white font-medium">Chats</h2>
            <div className="bg-primary/20 rounded-full px-2 py-1">
              <span className="text-primary text-xs font-medium">
                {mockChats.filter(chat => chat.messageCount > 0).length} new
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 pb-24">
        <div className="px-4 py-2 space-y-2">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <img src={chat.avatar} alt={chat.name} className="rounded-full" />
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium truncate">{chat.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/60 text-xs">{chat.timestamp}</span>
                    {chat.messageCount > 0 && (
                      <div className="bg-primary rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                        <span className="text-primary-foreground text-xs font-medium">
                          {chat.messageCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-white/60 text-sm truncate text-left">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>


    </div>
  );
}