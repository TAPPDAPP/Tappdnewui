import { useState, useRef } from "react";
import { ArrowLeft, Settings, Edit, Plus, Filter, LogOut, User, Shield, Bell, HelpCircle, Eye, Camera, Watch, List, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Avatar } from "./ui/avatar";
import { BandRegistration } from "./engage/BandRegistration";
import { BandManager } from "./engage/BandManager";
import { PaymentManager } from "./profile/PaymentManager";
import { EditProfileDialog } from "./profile/EditProfileDialog";
import { UserProfileView } from "./profile/UserProfileView";
import { toast } from "sonner@2.0.3";

// Import Harsh's photos
import harshPhoto1 from 'figma:asset/29f1cfc25481805d037161cab42c8c14985fe446.png';
import harshPhoto2 from 'figma:asset/7fd392e5cf26534f479e1a01880081e1baf02c9b.png';
import harshPhoto3 from 'figma:asset/03c88cd1f2fec060fe6277475d95661623c2d7a5.png';

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

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Alex Chen',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    type: 'friend',
    bio: 'Software engineer passionate about building innovative solutions. Love hiking and photography in my free time.',
    occupation: 'Software Engineer',
    education: 'Stanford University',
    location: 'San Francisco, USA',
    interests: ['Coding', 'Photography', 'Hiking', 'Travel']
  },
  {
    id: '2', 
    name: 'Sarah Kim',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    type: 'match',
    bio: 'Creative designer who loves art, music, and good coffee. Always looking for new adventures!',
    occupation: 'UX Designer',
    education: 'Parsons School of Design',
    location: 'New York, USA',
    interests: ['Design', 'Art', 'Music', 'Coffee']
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    age: 32,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    type: 'business',
    bio: 'Entrepreneur and investor focused on tech startups. Building the future, one company at a time.',
    occupation: 'Founder & CEO',
    education: 'Harvard Business School',
    location: 'London, UK',
    interests: ['Startups', 'Investing', 'Networking', 'Golf']
  },
  {
    id: '4',
    name: 'Emily Davis',
    age: 29,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    type: 'friend',
    bio: 'Marketing professional with a passion for storytelling. Foodie, traveler, and dog lover.',
    occupation: 'Marketing Manager',
    education: 'UCLA',
    location: 'Los Angeles, USA',
    interests: ['Marketing', 'Food', 'Travel', 'Dogs']
  }
];

const harshPhotos = [
  harshPhoto1, // Professional portrait in suit
  harshPhoto2, // Adventure photo with motorcycle in mountains
  harshPhoto3, // Stylish photo on yacht
];

interface ProfileProps {
  onBack: () => void;
  initialTab?: string;
}

export function Profile({ onBack, initialTab = 'about' }: ProfileProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showSettings, setShowSettings] = useState(false);
  const [connectionFilter, setConnectionFilter] = useState<'all' | 'friends' | 'matches' | 'business'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showBandRegistration, setShowBandRegistration] = useState(false);
  const [showBandManager, setShowBandManager] = useState(false);
  const [showPaymentManager, setShowPaymentManager] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userPhotos, setUserPhotos] = useState<string[]>([harshPhoto1, harshPhoto2, harshPhoto3]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Profile data state
  const [profileData, setProfileData] = useState({
    bio: "Entrepreneurial growth strategist with 5+ years of experience scaling ventures across consumer tech, hospitality, and consulting. Proven expertise in performance marketing, organic growth, and 0-to-1 GTM execution, with a strong record of driving measurable user acquisition, retention, and revenue growth. Skilled at building and executing multi-channel growth strategies, optimizing CAC/LTV, and leading cross-functional collaboration between product, marketing, and operations. Passionate about combining data-driven insights with creative experimentation to build high-impact growth engines.",
    occupation: "Founder",
    education: "MAIT, Delhi",
    motives: ['Friendship', 'Business', 'Partnership'],
    age: 22,
    height: `5'10"`,
    gender: "Male",
    location: "New Delhi, India",
    interests: ['Entrepreneurship', 'Growth Marketing', 'Startups', 'Tech', 'Strategy', 'Innovation'],
    smoking: "No",
    drinking: "Socially"
  });

  const filteredConnections = connectionFilter === 'all' 
    ? mockConnections 
    : mockConnections.filter(conn => {
        if (connectionFilter === 'friends') return conn.type === 'friend';
        if (connectionFilter === 'matches') return conn.type === 'match';
        if (connectionFilter === 'business') return conn.type === 'business';
        return true;
      });

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotos([...userPhotos, reader.result as string]);
        toast.success("Photo added successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle connection click
  const handleConnectionClick = (connection: Connection) => {
    setSelectedConnection(connection);
    setShowUserProfile(true);
  };

  // Handle message click from user profile
  const handleMessageFromProfile = () => {
    // This would navigate to chat with the selected user
    toast.success(`Opening chat with ${selectedConnection?.name}...`);
    // You can integrate this with your chat functionality
  };

  // Handle profile save
  const handleProfileSave = (data: any) => {
    setProfileData(data);
    toast.success("Profile updated successfully!");
  };

  const SettingsDialog = () => (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="bg-background border-white/10 text-white max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your profile and account settings
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-96">
          <div className="space-y-4">
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
              <Edit className="w-4 h-4 mr-3" />
              Edit Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
              <Shield className="w-4 h-4 mr-3" />
              Privacy & Security
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
              <Bell className="w-4 h-4 mr-3" />
              Notification Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
              <User className="w-4 h-4 mr-3" />
              Account Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
              <HelpCircle className="w-4 h-4 mr-3" />
              Help & Support
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

  const PhotoDialog = () => (
    <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
      <DialogContent className="bg-black/90 border-0 max-w-sm mx-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Full Size Photo</DialogTitle>
          <DialogDescription>
            Viewing full size photo from Harsh's gallery
          </DialogDescription>
        </DialogHeader>
        {selectedPhoto && (
          <img
            src={selectedPhoto}
            alt="Full size photo"
            className="w-full h-auto rounded-lg"
          />
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1 hover:bg-white/10">
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <h1 className="text-white font-medium">My Profile</h1>
        <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)} className="p-1 hover:bg-white/10">
          <Settings className="h-5 w-5 text-white" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="safe-bottom">
        {/* Profile Header */}
        <div className="px-4 py-6 text-center border-b border-white/10">
          {/* Profile Photo */}
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto">
              <img
                src={harshPhotos[0]}
                alt="Harsh Arora Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              size="sm"
              className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary hover:bg-primary/80 p-0"
            >
              <Camera className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Name & Age */}
          <h2 className="text-white text-xl mb-2">Harsh Arora, 22</h2>
          
          {/* Tagline */}
          <p className="text-white/70 mb-4">Exploring every day like its theist ✨</p>
          
          {/* Basic Info Row */}
          <div className="flex items-center justify-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Male
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              New Delhi
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Founder
            </span>
          </div>
        </div>

        {/* Menu Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-4 bg-transparent border-b border-white/10 rounded-none h-12">
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
            <TabsTrigger 
              value="connections" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Connections
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="text-white/70 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="px-4 py-6 space-y-6">
            {/* Edit Button */}
            <Button 
              onClick={() => setShowEditProfile(true)}
              className="w-full gradient-primary hover:gradient-primary-hover"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Details
            </Button>

            {/* Full Bio */}
            <div>
              <h4 className="text-white font-medium mb-2">About Me</h4>
              <p className="text-white/70 leading-relaxed">
                {profileData.bio}
              </p>
            </div>

            {/* Professional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-white/50 text-sm mb-1">Occupation</h5>
                <p className="text-white">{profileData.occupation}</p>
              </div>
              <div>
                <h5 className="text-white/50 text-sm mb-1">Education</h5>
                <p className="text-white">{profileData.education}</p>
              </div>
            </div>

            {/* Motives */}
            <div>
              <h4 className="text-white font-medium mb-3">Looking For</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.motives.map((motive) => (
                  <span key={motive} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                    {motive}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-white/50 text-sm mb-1">Age</h5>
                <p className="text-white">{profileData.age}</p>
              </div>
              <div>
                <h5 className="text-white/50 text-sm mb-1">Height</h5>
                <p className="text-white">{profileData.height}</p>
              </div>
              <div>
                <h5 className="text-white/50 text-sm mb-1">Gender</h5>
                <p className="text-white">{profileData.gender}</p>
              </div>
              <div>
                <h5 className="text-white/50 text-sm mb-1">Location</h5>
                <p className="text-white">{profileData.location}</p>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-white font-medium mb-3">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest) => (
                  <span key={interest} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Vices */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-white/50 text-sm mb-1">Smoking</h5>
                <p className="text-white">{profileData.smoking}</p>
              </div>
              <div>
                <h5 className="text-white/50 text-sm mb-1">Drinking</h5>
                <p className="text-white">{profileData.drinking}</p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end mt-6">
              <Button size="sm" className="gradient-primary hover:gradient-primary-hover" onClick={() => setShowEditProfile(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="px-4 py-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Add Photo Button */}
              <div 
                className="aspect-[9/16] bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => photoInputRef.current?.click()}
              >
                <Plus className="w-6 h-6 text-white/50" />
              </div>
              <input 
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              
              {/* Photo Grid */}
              {userPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => setSelectedPhoto(photo)}
              >
                <img
                src={photo}
          alt={`Harsh's Photo ${index + 1}`}
    className="w-full h-auto object-contain hover:brightness-110 transition-all duration-300 rounded-[1px]"
  />
</div>
              ))}
            </div>
            
            {/* Photo Stats */}
            <div className="mt-6 text-center">
              <p className="text-white/50 text-sm">
                {userPhotos.length} photo{userPhotos.length !== 1 ? 's' : ''}
              </p>
            </div>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections" className="px-4 py-6">
            {/* Filter Options */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto">
              {[
                { key: 'all', label: 'All' },
                { key: 'friends', label: 'Friends' },
                { key: 'matches', label: 'Matches' },
                { key: 'business', label: 'Business' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  size="sm"
                  variant={connectionFilter === key ? 'default' : 'outline'}
                  onClick={() => setConnectionFilter(key as any)}
                  className={
                    connectionFilter === key
                      ? 'gradient-primary text-white'
                      : 'border-white/20 text-white hover:bg-white/10'
                  }
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Connections Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredConnections.map((connection) => (
                <div 
                  key={connection.id}
                  className="bg-white/5 rounded-lg p-4 text-center cursor-pointer hover:bg-white/10 transition-colors border border-white/10"
                  onClick={() => handleConnectionClick(connection)}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-white/10">
                    <img
                      src={connection.photo}
                      alt={connection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-white text-sm font-medium">{connection.name}</h4>
                  <p className="text-white/60 text-xs">{connection.age} years old</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                    connection.type === 'friend' ? 'bg-blue-500/20 text-blue-400' :
                    connection.type === 'match' ? 'bg-pink-500/20 text-pink-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {connection.type}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="px-4 py-6 space-y-6">
            {/* Device Settings */}
            <div>
              <h4 className="text-white font-medium mb-4">Devices</h4>
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left hover:bg-white/10"
                  onClick={() => setShowBandRegistration(true)}
                >
                  <Watch className="w-4 h-4 mr-3 text-white/70" />
                  <span className="text-white">Register TAPPD Band</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left hover:bg-white/10"
                  onClick={() => setShowBandManager(true)}
                >
                  <List className="w-4 h-4 mr-3 text-white/70" />
                  <span className="text-white">Manage Bands</span>
                </Button>
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <h4 className="text-white font-medium mb-4">Account Settings</h4>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
                  <User className="w-4 h-4 mr-3 text-white/70" />
                  <span className="text-white">Change Email</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
                  <Shield className="w-4 h-4 mr-3 text-white/70" />
                  <span className="text-white">Change Password</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left hover:bg-white/10"
                  onClick={() => setShowPaymentManager(true)}
                >
                  <CreditCard className="w-4 h-4 mr-3 text-white/70" />
                  <span className="text-white">Manage Payment Information</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10 text-red-400">
                  <User className="w-4 h-4 mr-3" />
                  Delete Account
                </Button>
              </div>
            </div>

            {/* App Settings */}
            <div>
              <h4 className="text-white font-medium mb-4">App Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-white/70" />
                    <span className="text-white">Push Notifications</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-white/70" />
                    <span className="text-white">Show Online Status</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-white/70" />
                    <span className="text-white">Private Profile</span>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div>
              <h4 className="text-white font-medium mb-4">Help & Support</h4>
              <Button variant="ghost" className="w-full justify-start text-left hover:bg-white/10">
                <HelpCircle className="w-4 h-4 mr-3 text-white/70" />
                <span className="text-white">Contact Support</span>
              </Button>
            </div>

            {/* Logout */}
            <div className="pt-6">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </ScrollArea>

      {/* Dialogs */}
      <SettingsDialog />
      <PhotoDialog />
      <BandRegistration open={showBandRegistration} onOpenChange={setShowBandRegistration} />
      <BandManager open={showBandManager} onOpenChange={setShowBandManager} />
      <PaymentManager open={showPaymentManager} onOpenChange={setShowPaymentManager} />
      <EditProfileDialog 
        open={showEditProfile}
        onOpenChange={setShowEditProfile}
        profileData={profileData}
        onSave={handleProfileSave}
      />
      <UserProfileView
        open={showUserProfile}
        onOpenChange={setShowUserProfile}
        user={selectedConnection}
        onMessageClick={handleMessageFromProfile}
      />
    </div>
  );
}
