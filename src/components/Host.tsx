import React, { useState, useCallback, useEffect } from "react";
import { ArrowLeft, Plus, MapPin, Calendar, Clock, Users, Upload, Info, X, Lock, FileText, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner@2.0.3";
import { ManageEventDialog } from "./ManageEventDialog";

interface TicketType {
  id: string;
  name: string;
  price: number;
}

interface EventForm {
  name: string;
  genre: string;
  category: string;
  date: string;
  time: string;
  location: string;
  maxOccupancy: number;
  ageRestriction: string;
  genderAllowance: string;
  alcoholAllowed: boolean;
  smokingAllowed: boolean;
  description: string;
  photos: string[];
  tickets: TicketType[];
}

interface HostProps {
  onShowDrafts?: () => void;
  onShowPublished?: () => void;
  onBack?: () => void;
  editingDraft?: any;
}

const eventGenres = [
  "Arts, Culture & Entertainment",
  "Music & Nightlife", 
  "Social & Lifestyle",
  "Business & Networking",
  "Wellness & Personal Growth",
  "Sports & Outdoors",
  "Education & Learning",
  "Community & Causes",
  "Family & Kids",
  "Seasonal & Special"
];

const eventCategories = [
  "Theatre Plays", "Stand-up Comedy", "Dance Performances", "Live Bands", 
  "DJ & EDM Nights", "Cocktail Nights", "Rooftop Parties", "Corporate Conferences",
  "Startup Pitch Nights", "Yoga Retreats", "Sound Healing", "Football Matches",
  "Cricket Screenings", "Coding Bootcamps", "Tech Hackathons", "Charity Galas",
  "Fundraisers", "Kids Theatre", "Educational Fun Events", "New Year's Eve Parties"
];

const ageRestrictions = ["16+", "18+", "21+", "25+"];
const genderOptions = ["Only Male", "Only Female", "Male & Female", "All Genders"];

export function Host({ onShowDrafts, onShowPublished, onBack, editingDraft }: HostProps) {
  const [activeTab, setActiveTab] = useState<'private' | 'public' | 'published'>('private');
  const [showPublicVerification, setShowPublicVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showManageEvent, setShowManageEvent] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    username: "Harsh@tappd.co.in",
    password: "Tappd@2025"
  });
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  
  // Local form state (for continuous typing)
  const [localFormData, setLocalFormData] = useState<EventForm>({
    name: "",
    genre: "",
    category: "",
    date: "",
    time: "",
    location: "",
    maxOccupancy: 0,
    ageRestriction: "",
    genderAllowance: "",
    alcoholAllowed: false,
    smokingAllowed: false,
    description: "",
    photos: [],
    tickets: [{ id: "ticket-1", name: "Standard", price: 500 }]
  });

  // Actual form state (only updated on save/publish)
  const [formData, setFormData] = useState<EventForm>({
    name: "",
    genre: "",
    category: "",
    date: "",
    time: "",
    location: "",
    maxOccupancy: 0,
    ageRestriction: "",
    genderAllowance: "",
    alcoholAllowed: false,
    smokingAllowed: false,
    description: "",
    photos: [],
    tickets: [{ id: "ticket-1", name: "Standard", price: 500 }]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load editing draft if provided
  useEffect(() => {
    if (editingDraft) {
      setLocalFormData(editingDraft);
      setFormData(editingDraft);
    }
  }, [editingDraft]);

  // Stable handlers using useCallback for local state (continuous typing)
  const handleLocalFieldChange = useCallback((field: keyof EventForm, value: any) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
    // Clear error immediately for better UX
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  const handleLocalTicketChange = useCallback((ticketId: string, field: 'name' | 'price', value: string | number) => {
    setLocalFormData(prev => ({
      ...prev,
      tickets: prev.tickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, [field]: value } : ticket
      )
    }));
  }, []);

  const addTicketType = useCallback(() => {
    const newTicket: TicketType = {
      id: `ticket-${Date.now()}`,
      name: "",
      price: 500
    };
    setLocalFormData(prev => ({ ...prev, tickets: [...prev.tickets, newTicket] }));
  }, []);

  const removeTicket = useCallback((id: string) => {
    if (localFormData.tickets.length > 1) {
      setLocalFormData(prev => ({
        ...prev,
        tickets: prev.tickets.filter(ticket => ticket.id !== id)
      }));
    }
  }, [localFormData.tickets.length]);

  const calculateServiceCharge = (price: number) => {
    const serviceCharge = Math.round(price * 0.2);
    const hostReceives = price - serviceCharge;
    return { serviceCharge, hostReceives };
  };

  const validateForm = (data: EventForm) => {
    const newErrors: Record<string, string> = {};
    
    if (!data.name.trim()) newErrors.name = "Event name is required";
    if (!data.genre) newErrors.genre = "Genre is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!data.date) newErrors.date = "Date is required";
    if (!data.time) newErrors.time = "Time is required";
    if (!data.location.trim()) newErrors.location = "Location is required";
    if (data.maxOccupancy <= 0) newErrors.maxOccupancy = "Max occupancy must be greater than 0";
    if (!data.ageRestriction) newErrors.ageRestriction = "Age restriction is required";
    if (!data.genderAllowance) newErrors.genderAllowance = "Gender allowance is required";
    
    data.tickets.forEach((ticket, index) => {
      if (!ticket.name.trim()) newErrors[`ticket_name_${index}`] = "Ticket name is required";
      if (ticket.price < 500) newErrors[`ticket_price_${index}`] = "Minimum ticket price is ₹500";
    });

    return newErrors;
  };

  const handleSaveDraft = () => {
    // Update form data with local state
    setFormData(localFormData);
    
    // Save to localStorage or backend
    const draftId = editingDraft?.id || `draft-${Date.now()}`;
    const draftData = {
      ...localFormData,
      id: draftId,
      createdAt: editingDraft?.createdAt || new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, save to backend)
    const existingDrafts = JSON.parse(localStorage.getItem('eventDrafts') || '[]');
    const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftId);
    updatedDrafts.push(draftData);
    localStorage.setItem('eventDrafts', JSON.stringify(updatedDrafts));
    
    toast.success('Draft saved successfully!');
    console.log('Saving draft...', draftData);
  };

  const handlePublishEvent = () => {
    const validationErrors = validateForm(localFormData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      // Update form data with local state
      setFormData(localFormData);
      
      // Publish logic here
      const publishedData = {
        ...localFormData,
        id: `pub-${Date.now()}`,
        publishedAt: new Date().toISOString(),
        status: 'upcoming'
      };
      
      toast.success('Event published successfully!');
      console.log('Publishing event...', publishedData);
      
      // Reset form
      const resetData = {
        name: "",
        genre: "",
        category: "",
        date: "",
        time: "",
        location: "",
        maxOccupancy: 0,
        ageRestriction: "",
        genderAllowance: "",
        alcoholAllowed: false,
        smokingAllowed: false,
        description: "",
        photos: [],
        tickets: [{ id: "ticket-1", name: "Standard", price: 500 }]
      };
      setLocalFormData(resetData);
      setFormData(resetData);
    }
  };

  const handlePublicTabClick = () => {
    if (!isVerified) {
      setShowPublicVerification(true);
    } else {
      setActiveTab('public');
    }
  };

  const handlePublishedTabClick = () => {
    if (onShowPublished) {
      onShowPublished();
    }
  };

  const handleLogin = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    }
    
    // Validate credentials
    if (loginData.username === "Harsh@tappd.co.in" && loginData.password === "Tappd@2025") {
      setIsVerified(true);
      setShowPublicVerification(false);
      setActiveTab('public');
      setLoginErrors({});
    } else {
      newErrors.credentials = "Invalid username or password";
    }
    
    setLoginErrors(newErrors);
  };

  const PublicVerificationForm = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-8 space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-white text-xl">Host Verification</h3>
        <p className="text-white/70 text-center">
          Sign in with your verified host credentials to access public event creation.
        </p>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Username</Label>
          <Input
            type="email"
            value={loginData.username}
            onChange={(e) => {
              setLoginData(prev => ({ ...prev, username: e.target.value }));
              if (loginErrors.username) {
                setLoginErrors(prev => ({ ...prev, username: "" }));
              }
            }}
            placeholder="Enter your email"
            className="bg-input-background border-white/10 text-white placeholder:text-white/50"
          />
          {loginErrors.username && <p className="text-destructive text-sm">{loginErrors.username}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-white">Password</Label>
          <Input
            type="password"
            value={loginData.password}
            onChange={(e) => {
              setLoginData(prev => ({ ...prev, password: e.target.value }));
              if (loginErrors.password) {
                setLoginErrors(prev => ({ ...prev, password: "" }));
              }
            }}
            placeholder="Enter your password"
            className="bg-input-background border-white/10 text-white placeholder:text-white/50"
          />
          {loginErrors.password && <p className="text-destructive text-sm">{loginErrors.password}</p>}
        </div>

        {loginErrors.credentials && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm text-center">{loginErrors.credentials}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button onClick={handleLogin} className="w-full gradient-primary">
            Sign In
          </Button>
          <Button 
            onClick={() => {
              setShowPublicVerification(false);
              setActiveTab('private');
            }} 
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  const EventForm = () => (
    <div className="flex-1 overflow-y-auto px-4 py-4 safe-bottom scrollbar-hide">
      <div className="space-y-8">
        {/* Event Basics */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Event Basics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Event Name</Label>
              <Input
                value={localFormData.name}
                onChange={(e) => handleLocalFieldChange('name', e.target.value)}
                placeholder="Enter event name"
                className="bg-input-background border-white/10 text-white placeholder:text-white/50"
              />
              {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Genre</Label>
                <Select value={localFormData.genre} onValueChange={(value) => handleLocalFieldChange('genre', value)}>
                  <SelectTrigger className="bg-input-background border-white/10 text-white">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {eventGenres.map((genre) => (
                      <SelectItem key={genre} value={genre} className="text-white focus:bg-white/10">
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.genre && <p className="text-destructive text-sm">{errors.genre}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Category</Label>
                <Select value={localFormData.category} onValueChange={(value) => handleLocalFieldChange('category', value)}>
                  <SelectTrigger className="bg-input-background border-white/10 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {eventCategories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white focus:bg-white/10">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-destructive text-sm">{errors.category}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Label>
                <Input
                  type="date"
                  value={localFormData.date}
                  onChange={(e) => handleLocalFieldChange('date', e.target.value)}
                  className="bg-input-background border-white/10 text-white"
                />
                {errors.date && <p className="text-destructive text-sm">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time
                </Label>
                <Input
                  type="time"
                  value={localFormData.time}
                  onChange={(e) => handleLocalFieldChange('time', e.target.value)}
                  className="bg-input-background border-white/10 text-white"
                />
                {errors.time && <p className="text-destructive text-sm">{errors.time}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                value={localFormData.location}
                onChange={(e) => handleLocalFieldChange('location', e.target.value)}
                placeholder="Enter event location"
                className="bg-input-background border-white/10 text-white placeholder:text-white/50"
              />
              {errors.location && <p className="text-destructive text-sm">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Users className="h-4 w-4" />
                Max Occupancy
              </Label>
              <Input
                type="number"
                value={localFormData.maxOccupancy || ""}
                onChange={(e) => handleLocalFieldChange('maxOccupancy', parseInt(e.target.value) || 0)}
                placeholder="Enter maximum capacity"
                className="bg-input-background border-white/10 text-white placeholder:text-white/50"
              />
              {errors.maxOccupancy && <p className="text-destructive text-sm">{errors.maxOccupancy}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Restrictions & Permissions */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Restrictions & Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Age Restrictions</Label>
                <Select value={localFormData.ageRestriction} onValueChange={(value) => handleLocalFieldChange('ageRestriction', value)}>
                  <SelectTrigger className="bg-input-background border-white/10 text-white">
                    <SelectValue placeholder="Select age limit" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {ageRestrictions.map((age) => (
                      <SelectItem key={age} value={age} className="text-white focus:bg-white/10">
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ageRestriction && <p className="text-destructive text-sm">{errors.ageRestriction}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Gender Allowance</Label>
                <Select value={localFormData.genderAllowance} onValueChange={(value) => handleLocalFieldChange('genderAllowance', value)}>
                  <SelectTrigger className="bg-input-background border-white/10 text-white">
                    <SelectValue placeholder="Select allowance" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {genderOptions.map((option) => (
                      <SelectItem key={option} value={option} className="text-white focus:bg-white/10">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.genderAllowance && <p className="text-destructive text-sm">{errors.genderAllowance}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="space-y-1">
                  <Label className="text-white">Alcohol Allowed</Label>
                  <p className="text-white/60 text-sm">Allow alcoholic beverages</p>
                </div>
                <Switch
                  checked={localFormData.alcoholAllowed}
                  onCheckedChange={(checked) => handleLocalFieldChange('alcoholAllowed', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="space-y-1">
                  <Label className="text-white">Smoking Allowed</Label>
                  <p className="text-white/60 text-sm">Allow smoking areas</p>
                </div>
                <Switch
                  checked={localFormData.smokingAllowed}
                  onCheckedChange={(checked) => handleLocalFieldChange('smokingAllowed', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability & Tickets */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-white">Availability & Tickets</CardTitle>
            <Button
              onClick={addTicketType}
              size="sm"
              className="gradient-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Ticket
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {localFormData.tickets.map((ticket, index) => (
              <div key={ticket.id} className="p-4 bg-white/5 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white">Ticket Type {index + 1}</h4>
                  {localFormData.tickets.length > 1 && (
                    <Button
                      onClick={() => removeTicket(ticket.id)}
                      size="sm"
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Ticket Name</Label>
                    <Input
                      value={ticket.name}
                      onChange={(e) => handleLocalTicketChange(ticket.id, 'name', e.target.value)}
                      placeholder="e.g., Standard, Premium, VIP"
                      className="bg-input-background border-white/10 text-white placeholder:text-white/50"
                    />
                    {errors[`ticket_name_${index}`] && (
                      <p className="text-destructive text-sm">{errors[`ticket_name_${index}`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Price (₹)</Label>
                    <Input
                      type="number"
                      value={ticket.price || ""}
                      onChange={(e) => handleLocalTicketChange(ticket.id, 'price', parseInt(e.target.value) || 500)}
                      min="500"
                      className="bg-input-background border-white/10 text-white"
                    />
                    {errors[`ticket_price_${index}`] && (
                      <p className="text-destructive text-sm">{errors[`ticket_price_${index}`]}</p>
                    )}
                  </div>
                </div>

                {ticket.price >= 500 && (
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-primary" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-background border-white/10">
                            <p className="text-white text-sm">
                              TAPPD charges 20% service fee to maintain platform quality,<br />
                              secure payments, and provide customer support.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-primary text-sm">Service Charge Breakdown</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Ticket Price:</span>
                        <span>₹{ticket.price}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>TAPPD Service Charge (20%):</span>
                        <span>₹{calculateServiceCharge(ticket.price).serviceCharge}</span>
                      </div>
                      <Separator className="bg-white/20 my-2" />
                      <div className="flex justify-between text-primary">
                        <span>You will receive:</span>
                        <span>₹{calculateServiceCharge(ticket.price).hostReceives}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* More Event Details */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">More Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Event Description</Label>
              <Textarea
                value={localFormData.description}
                onChange={(e) => handleLocalFieldChange('description', e.target.value)}
                placeholder="Describe your event in detail..."
                rows={4}
                className="bg-input-background border-white/10 text-white placeholder:text-white/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Event Photos (Up to 5)
              </Label>
              <div className="p-6 border-2 border-dashed border-white/20 rounded-lg text-center">
                <Upload className="h-8 w-8 text-white/50 mx-auto mb-2" />
                <p className="text-white/70 text-sm">Click to upload or drag & drop</p>
                <p className="text-white/50 text-xs mt-1">PNG, JPG up to 5MB each</p>
              </div>
              {localFormData.photos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto">
                  {localFormData.photos.map((photo, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-white/50 text-xs">Photo {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (activeTab === 'published') {
    return null; // This will be handled by parent component
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="relative flex items-center justify-center p-4 border-b border-white/10">
        <div className="absolute left-4 flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          {onShowDrafts && (
            <button 
              onClick={onShowDrafts}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FileText className="w-5 h-5 text-white/70 hover:text-white" />
            </button>
          )}
        </div>
        <h1 className="text-white">Welcome Host</h1>
        <div className="absolute right-4">
          <button 
            onClick={() => setShowManageEvent(true)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5 text-white/70 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Menu Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('private')}
          className={`flex-1 py-3 px-4 text-center transition-colors ${
            activeTab === 'private'
              ? 'gradient-primary text-white border-b-2 border-primary'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          Private Event
        </button>
        <button
          onClick={handlePublishedTabClick}
          className="flex-1 py-3 px-4 text-center transition-colors text-white/70 hover:text-white hover:bg-white/5"
        >
          Published Events
        </button>
        <button
          onClick={handlePublicTabClick}
          className={`flex-1 py-3 px-4 text-center transition-colors relative ${
            activeTab === 'public'
              ? 'gradient-primary text-white border-b-2 border-primary'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          Public Event
          {isVerified && (
            <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 py-0">
              Verified
            </Badge>
          )}
        </button>
      </div>

      {/* Content */}
      {showPublicVerification ? <PublicVerificationForm /> : <EventForm />}

      {/* Bottom Action Buttons */}
      {!showPublicVerification && activeTab !== 'published' && (
        <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-4 py-4 bg-background border-t border-white/10">
          <div className="flex gap-3">
            <Button 
              onClick={handleSaveDraft}
              variant="outline" 
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Save as Draft
            </Button>
            <Button 
              onClick={handlePublishEvent}
              className="flex-1 gradient-primary"
            >
              Publish Event
            </Button>
          </div>
        </div>
      )}

      {/* Manage Event Dialog */}
      <ManageEventDialog 
        open={showManageEvent}
        onOpenChange={setShowManageEvent}
        eventName="Summer Jazz Festival"
        eventDate="2024-12-15"
        eventLocation="Sky Lounge, Downtown"
      />
    </div>
  );
}