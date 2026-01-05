import { useState } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";

const eventCategoriesData = {
  "Arts, Culture & Entertainment": [
    "Theatre Plays",
    "Stand-up Comedy", 
    "Dance Performances",
    "Classical Music & Opera",
    "Film Screenings & Festivals",
    "Art Exhibitions & Galleries",
    "Poetry Slams & Literature Evenings",
    "Cultural Heritage Shows"
  ],
  "Music & Nightlife": [
    "Live Bands",
    "International Artist Gigs",
    "DJ & EDM Nights",
    "Jazz & Blues Sessions",
    "Acoustic Evenings",
    "Open Mic Music",
    "Karaoke Nights",
    "Music Festivals"
  ],
  "Social & Lifestyle": [
    "Cocktail Nights",
    "Rooftop Parties",
    "Luxury Brand Launches",
    "Fashion Shows",
    "Food & Wine Tastings",
    "Sunday Brunches",
    "Pop-up Experiences",
    "High-Society Mixers"
  ],
  "Business & Networking": [
    "Corporate Conferences",
    "Startup Pitch Nights",
    "Tech & Innovation Summits",
    "Panel Discussions",
    "Industry Trade Shows",
    "B2B Networking Mixers",
    "Professional Workshops",
    "Masterclasses"
  ],
  "Wellness & Personal Growth": [
    "Yoga Retreats",
    "Sound Healing",
    "Meditation Circles",
    "Fitness Bootcamps",
    "Mindfulness Workshops",
    "Life Coaching Sessions",
    "Wellness Retreats",
    "Motivational Talks"
  ],
  "Sports & Outdoors": [
    "Football Matches",
    "Cricket Screenings",
    "Tennis Tournaments",
    "Golf Events",
    "Marathons & Runs",
    "Cycling Rallies",
    "Trekking & Hiking Trips",
    "Adventure Sports"
  ],
  "Education & Learning": [
    "Coding Bootcamps",
    "Tech Hackathons",
    "Academic Seminars",
    "Skill Development Classes",
    "Creative Writing Workshops",
    "Book Clubs",
    "Expert Panel Talks",
    "Student Fests"
  ],
  "Community & Causes": [
    "Charity Galas",
    "Fundraisers",
    "Volunteering Drives",
    "Blood Donation Camps",
    "Religious Gatherings",
    "Interfaith Events",
    "Cultural Festivals",
    "Awareness Campaigns"
  ],
  "Family & Kids": [
    "Kids Theatre",
    "Educational Fun Events",
    "Parenting Workshops",
    "Family Picnics",
    "Activity Camps",
    "Storytelling Sessions",
    "School Fairs",
    "Amusement Park Events"
  ],
  "Seasonal & Special": [
    "New Year's Eve Parties",
    "Holi/Diwali Festivals",
    "Christmas Carnivals",
    "Eid Celebrations",
    "Halloween Specials",
    "City Food Festivals",
    "National Holiday Events",
    "Annual City Fairs"
  ]
};

// Generate random event counts between 5-10 for each category
const getEventCount = (category: string) => {
  const seed = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.floor((seed % 6) + 5); // Ensures consistent random number between 5-10
};

interface ExploreAllProps {
  onBack: () => void;
  onCategorySelect: (category: string) => void;
}

export function ExploreAll({ onBack, onCategorySelect }: ExploreAllProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const genres = Object.keys(eventCategoriesData);
  
  const getFilteredCategories = () => {
    if (!selectedGenre) {
      // Return all categories with their genres
      return Object.entries(eventCategoriesData).flatMap(([genre, categories]) =>
        categories.map(category => ({
          category,
          genre,
          eventCount: getEventCount(category)
        }))
      );
    } else {
      // Return categories for selected genre only
      return eventCategoriesData[selectedGenre as keyof typeof eventCategoriesData].map(category => ({
        category,
        genre: selectedGenre,
        eventCount: getEventCount(category)
      }));
    }
  };

  const filteredCategories = getFilteredCategories();

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    setIsFilterOpen(false);
  };

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
        
        <h1 className="text-white">All Event Categories</h1>
        
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
              <Filter className="w-6 h-6 text-white" />
              {selectedGenre && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-white/10">
            <SheetHeader>
              <SheetTitle className="text-white">Filter by Genre</SheetTitle>
              <SheetDescription className="text-white/70">
                Select a genre to filter event categories, or choose "All Genres" to see everything.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-6">
              <Button
                variant={selectedGenre === null ? "default" : "outline"}
                onClick={() => handleGenreSelect(null)}
                className={`justify-start ${
                  selectedGenre === null 
                    ? 'gradient-primary text-white' 
                    : 'border-white/20 text-white hover:gradient-primary-hover'
                }`}
              >
                All Genres
              </Button>
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  onClick={() => handleGenreSelect(genre)}
                  className={`justify-start ${
                    selectedGenre === genre 
                      ? 'gradient-primary text-white' 
                      : 'border-white/20 text-white hover:gradient-primary-hover'
                  }`}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Selected Genre Display */}
      {selectedGenre && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">Filtered by:</span>
            <Badge className="gradient-primary text-white border-0">
              {selectedGenre}
            </Badge>
            <button 
              onClick={() => setSelectedGenre(null)}
              className="text-white/70 hover:text-white text-sm underline"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 safe-bottom">
        <div className="space-y-3">
          {filteredCategories.map((item, index) => (
            <button
              key={`${item.genre}-${item.category}-${index}`}
              onClick={() => onCategorySelect(item.category)}
              className="w-full p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-left">
                  <h3 className="text-white group-hover:text-primary transition-colors">
                    {item.category}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">{item.genre}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-sm">
                    {item.eventCount} events
                  </span>
                  <ArrowLeft className="w-4 h-4 text-white/50 rotate-180 group-hover:text-primary transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}