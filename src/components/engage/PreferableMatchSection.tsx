import { useState } from "react";
import { ArrowLeft, Filter, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

interface User {
  id: string;
  name: string;
  age: number;
  occupation: string;
  motive: string;
  bio: string;
  photos: string[];
  vitals: {
    height: string;
    fitness: string;
    diet: string;
  };
  vices: {
    smoking: string;
    drinking: string;
  };
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Aarav Mehta',
    age: 27,
    occupation: 'Tech Entrepreneur',
    motive: 'Business',
    bio: 'Scaling my second startup. Always looking to meet sharp minds over coffee or cocktails.',
    photos: [
      'https://images.unsplash.com/photo-1615724320397-9d4db10ec2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGluZGlhbiUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODIyOTE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'11",
      fitness: "Active gym-goer",
      diet: "Vegetarian"
    },
    vices: {
      smoking: "No",
      drinking: "Occasionally"
    }
  },
  {
    id: '2',
    name: 'Sophia Kapoor',
    age: 24,
    occupation: 'Fashion Stylist',
    motive: 'Date',
    bio: 'Love old money fashion, rooftop brunches, and people who can make me laugh.',
    photos: [
      'https://images.unsplash.com/photo-1621536531700-cb0d34d56699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZmFzaGlvbiUyMHN0eWxpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyMjkxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1583590019912-19cdc55ec80e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGluZGlhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MTA4Mjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'6",
      fitness: "Pilates & yoga",
      diet: "Non-vegetarian"
    },
    vices: {
      smoking: "No",
      drinking: "Yes"
    }
  },
  {
    id: '3',
    name: 'Kabir Singh',
    age: 30,
    occupation: 'Investment Banker',
    motive: 'Casual',
    bio: 'Work hard, play harder. Always up for last-minute plans and late-night drives.',
    photos: [
      'https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjI5MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "6'0",
      fitness: "Lean athletic",
      diet: "Flexible"
    },
    vices: {
      smoking: "Yes (social)",
      drinking: "Yes"
    }
  },
  {
    id: '4',
    name: 'Meera Rathi',
    age: 26,
    occupation: 'Travel Blogger',
    motive: 'Travel Buddy',
    bio: '12 countries down, 20 to go. Let\'s swap stories over sunsets.',
    photos: [
      'https://images.unsplash.com/photo-1473351528942-b35ae8d43e42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwdHJhdmVsJTIwYmxvZ2dlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODIyOTE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1506629905607-0493c31d74ca?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'4",
      fitness: "Average",
      diet: "Vegan"
    },
    vices: {
      smoking: "No",
      drinking: "Rarely"
    }
  },
  {
    id: '5',
    name: 'Rohan Malhotra',
    age: 28,
    occupation: 'DJ & Music Producer',
    motive: 'Friend',
    bio: 'Music is my escape. If you vibe with techno or house, we\'ll get along just fine.',
    photos: [
      'https://images.unsplash.com/photo-1684621353266-71cbac8a6b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGRqJTIwbXVzaWMlMjBwcm9kdWNlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODIyOTE4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'9",
      fitness: "Fit",
      diet: "Non-vegetarian"
    },
    vices: {
      smoking: "Yes",
      drinking: "Yes"
    }
  },
  {
    id: '6',
    name: 'Alisha Verma',
    age: 23,
    occupation: 'Marketing Analyst',
    motive: 'Date',
    bio: 'Ambitious but soft at heart. Coffee addict, Netflix over parties any day.',
    photos: [
      'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwbWFya2V0aW5nJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjI5MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'3",
      fitness: "Slim",
      diet: "Vegetarian"
    },
    vices: {
      smoking: "No",
      drinking: "Occasionally"
    }
  },
  {
    id: '7',
    name: 'Devansh Khurana',
    age: 32,
    occupation: 'Luxury Real Estate Consultant',
    motive: 'Business',
    bio: 'Matching people with their dream homes. Love fine dining and classic cars.',
    photos: [
      'https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHJlYWwlMjBlc3RhdGUlMjBjb25zdWx0YW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjI5MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "6'1",
      fitness: "Well-built",
      diet: "Non-vegetarian"
    },
    vices: {
      smoking: "No",
      drinking: "Yes"
    }
  },
  {
    id: '8',
    name: 'Natasha D\'Souza',
    age: 29,
    occupation: 'Interior Designer',
    motive: 'Friend',
    bio: 'Designing spaces that feel like home. Big on art galleries and wine nights.',
    photos: [
      'https://images.unsplash.com/photo-1667035533110-7964092f44a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwaW50ZXJpb3IlMjBkZXNpZ25lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODIyOTE5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'5",
      fitness: "Curvy",
      diet: "Non-vegetarian"
    },
    vices: {
      smoking: "No",
      drinking: "Yes"
    }
  },
  {
    id: '9',
    name: 'Arjun Patel',
    age: 25,
    occupation: 'Photographer',
    motive: 'Travel Buddy',
    bio: 'Chasing golden hours and city lights. If you love spontaneous trips, we\'re on the same page.',
    photos: [
      'https://images.unsplash.com/photo-1610618616234-fb0b87065fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBob3RvZ3JhcGhlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODIyOTIwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'10",
      fitness: "Athletic",
      diet: "Flexible"
    },
    vices: {
      smoking: "Occasionally",
      drinking: "Yes"
    }
  },
  {
    id: '10',
    name: 'Kavya Sharma',
    age: 27,
    occupation: 'Psychologist',
    motive: 'Casual',
    bio: 'Empath by profession, sass by personality. Wine nights and deep talks are my thing.',
    photos: [
      'https://images.unsplash.com/photo-1583590019912-19cdc55ec80e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGluZGlhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MTA4Mjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1506629905607-0493c31d74ca?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop'
    ],
    vitals: {
      height: "5'7",
      fitness: "Fit",
      diet: "Vegetarian"
    },
    vices: {
      smoking: "No",
      drinking: "Yes"
    }
  }
];

export function PreferableMatchSection() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setCurrentPhotoIndex(0);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  const nextPhoto = () => {
    if (selectedUser) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedUser.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedUser) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedUser.photos.length - 1 : prev - 1
      );
    }
  };

  const handleConnect = () => {
    console.log(`Connect with ${selectedUser?.name}`);
    // Handle connect action - could show success message or add to connections
    handleBack();
  };

  const handleReject = () => {
    console.log(`Reject ${selectedUser?.name}`);
    // Handle reject action - could remove from suggestions
    handleBack();
  };

  if (selectedUser) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Profile Header */}
        <div className="bg-background border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-1 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <h2 className="text-white font-medium">Profile</h2>
          <div className="w-6" />
        </div>

        <ScrollArea className="flex-1">
          <div className="px-4 py-4 space-y-6 safe-bottom">
            {/* Photo Gallery */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white/5">
                <img
                  src={selectedUser.photos[currentPhotoIndex]}
                  alt={`${selectedUser.name} photo ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Photo Navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevPhoto}
                    className="p-2 bg-black/20 hover:bg-black/40 rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextPhoto}
                    className="p-2 bg-black/20 hover:bg-black/40 rounded-full"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </Button>
                </div>
                
                {/* Photo Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {selectedUser.photos.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-white text-xl font-medium">
                  {selectedUser.name}, {selectedUser.age}
                </h3>
                <p className="text-white/70">{selectedUser.occupation}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">
                  {selectedUser.motive}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-white font-medium mb-2">About</h4>
              <p className="text-white/70">{selectedUser.bio}</p>
            </div>

            {/* Vitals */}
            <div>
              <h4 className="text-white font-medium mb-2">Vitals</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Height</p>
                  <p className="text-white">{selectedUser.vitals.height}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Fitness</p>
                  <p className="text-white">{selectedUser.vitals.fitness}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-white/50 text-sm">Diet</p>
                  <p className="text-white">{selectedUser.vitals.diet}</p>
                </div>
              </div>
            </div>

            {/* Vices */}
            <div>
              <h4 className="text-white font-medium mb-2">Vices</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Smoking</p>
                  <p className="text-white">{selectedUser.vices.smoking}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Drinking</p>
                  <p className="text-white">{selectedUser.vices.drinking}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="border-t border-white/10 px-4 py-6 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-8">
            <Button
              onClick={handleReject}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
              variant="outline"
            >
              <X className="w-6 h-6 text-white" />
            </Button>
            <Button
              onClick={handleConnect}
              className="w-16 h-16 rounded-full gradient-primary hover:gradient-primary-hover"
            >
              <Heart className="w-6 h-6 text-white" />
            </Button>
          </div>
          
          {/* Action Labels */}
          <div className="flex items-center justify-center gap-8 mt-3">
            <p className="text-white/50 text-sm text-center w-16">Pass</p>
            <p className="text-white/50 text-sm text-center w-16">Connect</p>
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
          <h2 className="text-white font-medium">Preferable Match</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Filter className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-white/10 text-white">
              <DropdownMenuItem className="hover:bg-white/10">Age Range</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Gender</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Looking For</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Distance</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10">Interests</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* User Grid */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-4 safe-bottom">
          <div className="grid grid-cols-2 gap-4">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleUserSelect(user)}
              >
                {/* User Card */}
                <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  {/* Profile Image */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={user.photos[0]}
                      alt={user.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient overlay for name */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <div className="p-3">
                        <h3 className="text-white font-medium text-sm">
                          {user.name}, {user.age}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info Section */}
                  <div className="p-3 space-y-1">
                    <p className="text-white/80 text-sm line-clamp-1">{user.occupation}</p>
                    <p className="text-primary text-xs line-clamp-1">{user.motive}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}