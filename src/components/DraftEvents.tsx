import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Users, Trash2, Edit, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface DraftEvent {
  id: string;
  name: string;
  genre: string;
  category: string;
  date: string;
  time: string;
  location: string;
  maxOccupancy: number;
  description: string;
  tickets: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  createdAt: string;
  lastModified: string;
}

interface DraftEventsProps {
  onBack: () => void;
  onEditDraft: (draft: DraftEvent) => void;
}

// Mock draft events data
const mockDraftEvents: DraftEvent[] = [
  {
    id: "draft-1",
    name: "Summer Music Festival",
    genre: "Music & Nightlife",
    category: "Live Bands",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park Amphitheater",
    maxOccupancy: 500,
    description: "A vibrant summer music festival featuring local and international artists across multiple genres.",
    tickets: [
      { id: "t1", name: "General Admission", price: 1500 },
      { id: "t2", name: "VIP Pass", price: 3000 }
    ],
    createdAt: "2024-06-01",
    lastModified: "2024-06-15"
  },
  {
    id: "draft-2", 
    name: "Tech Innovation Conference",
    genre: "Business & Networking",
    category: "Corporate Conferences",
    date: "2024-08-20",
    time: "09:00",
    location: "Convention Center Hall A",
    maxOccupancy: 200,
    description: "Annual tech conference bringing together industry leaders and innovators.",
    tickets: [
      { id: "t3", name: "Standard Ticket", price: 2500 }
    ],
    createdAt: "2024-05-20",
    lastModified: "2024-06-10"
  },
  {
    id: "draft-3",
    name: "Yoga & Wellness Retreat",
    genre: "Wellness & Personal Growth", 
    category: "Yoga Retreats",
    date: "2024-09-05",
    time: "07:00",
    location: "Seaside Wellness Resort",
    maxOccupancy: 50,
    description: "A peaceful retreat focused on mindfulness, yoga, and holistic wellness practices.",
    tickets: [
      { id: "t4", name: "Weekend Pass", price: 4500 }
    ],
    createdAt: "2024-05-15",
    lastModified: "2024-06-05"
  }
];

export function DraftEvents({ onBack, onEditDraft }: DraftEventsProps) {
  const [drafts, setDrafts] = useState<DraftEvent[]>(mockDraftEvents);
  const [selectedDraft, setSelectedDraft] = useState<DraftEvent | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== draftId));
    setShowDeleteConfirm(null);
    if (selectedDraft?.id === draftId) {
      setSelectedDraft(null);
    }
  };

  const handlePublishDraft = (draft: DraftEvent) => {
    console.log('Publishing draft:', draft);
    // Implement publish logic
    setDrafts(prev => prev.filter(d => d.id !== draft.id));
    setSelectedDraft(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const DraftCard = ({ draft }: { draft: DraftEvent }) => (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer" 
          onClick={() => setSelectedDraft(draft)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-white mb-1 line-clamp-1">{draft.name}</h3>
            <p className="text-white/60 text-sm line-clamp-2">{draft.description}</p>
          </div>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 ml-2">
            Draft
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(draft.date)} at {draft.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{draft.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Up to {draft.maxOccupancy} people</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10">
          <div className="text-xs text-white/50">
            Modified {new Date(draft.lastModified).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white/70 hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                onEditDraft(draft);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(draft.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DraftDetailModal = ({ draft }: { draft: DraftEvent }) => (
    <Dialog open={!!draft} onOpenChange={() => setSelectedDraft(null)}>
      <DialogContent className="bg-background border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">{draft.name}</DialogTitle>
          <DialogDescription className="text-white/70">
            Draft event details and management options
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-2">
              {draft.genre}
            </Badge>
            <p className="text-white/70 text-sm">{draft.description}</p>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-white">{formatDate(draft.date)}</p>
                <p className="text-white/60 text-sm">{draft.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-white">{draft.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-white">Max {draft.maxOccupancy} attendees</p>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div>
            <h4 className="text-white mb-2">Ticket Types</h4>
            <div className="space-y-2">
              {draft.tickets.map((ticket) => (
                <div key={ticket.id} className="flex justify-between items-center p-2 bg-white/5 rounded">
                  <span className="text-white/80">{ticket.name}</span>
                  <span className="text-primary">₹{ticket.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={() => setShowDeleteConfirm(draft.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Draft
            </Button>
            <Button
              className="flex-1 gradient-primary"
              onClick={() => handlePublishDraft(draft)}
            >
              Publish Event
            </Button>
          </div>
        </div>
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
        <h1 className="text-white">Draft Events</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 safe-bottom">
        {drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Eye className="h-12 w-12 text-white/30 mb-4" />
            <h3 className="text-white/70 mb-2">No Draft Events</h3>
            <p className="text-white/50 text-sm">
              Your saved draft events will appear here
            </p>
          </div>
        ) : (
          drafts.map((draft) => (
            <DraftCard key={draft.id} draft={draft} />
          ))
        )}
      </div>

      {/* Draft Detail Modal */}
      {selectedDraft && <DraftDetailModal draft={selectedDraft} />}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent className="bg-background border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Draft Event?</DialogTitle>
            <DialogDescription className="text-white/70">
              This action cannot be undone. The draft event will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              onClick={() => setShowDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-destructive hover:bg-destructive/90"
              onClick={() => showDeleteConfirm && handleDeleteDraft(showDeleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}