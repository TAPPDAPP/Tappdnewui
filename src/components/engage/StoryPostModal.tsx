import { useState, useRef } from "react";
import { X, Upload, Camera, Music, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Badge } from "../ui/badge";
import { EmojiPicker } from "./EmojiPicker";

interface StoryPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishStory: (story: { image: string; caption?: string }) => void;
  onPublishPost: (post: { image: string; caption: string; music?: { name: string; artist: string; preview: string } }) => void;
}

type ModalStep = 'upload' | 'choose-type' | 'story' | 'post';

// Mock Spotify tracks for demo
const mockSpotifyTracks = [
  { id: '1', name: 'Smooth Operator', artist: 'Sade', preview: 'https://sample-music.com/smooth-operator' },
  { id: '2', name: 'Summertime', artist: 'Ella Fitzgerald', preview: 'https://sample-music.com/summertime' },
  { id: '3', name: 'Blue Train', artist: 'John Coltrane', preview: 'https://sample-music.com/blue-train' },
  { id: '4', name: 'Kind of Blue', artist: 'Miles Davis', preview: 'https://sample-music.com/kind-of-blue' },
  { id: '5', name: 'Take Five', artist: 'Dave Brubeck', preview: 'https://sample-music.com/take-five' }
];

export function StoryPostModal({ isOpen, onClose, onPublishStory, onPublishPost }: StoryPostModalProps) {
  const [step, setStep] = useState<ModalStep>('upload');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [selectedMusic, setSelectedMusic] = useState<typeof mockSpotifyTracks[0] | null>(null);
  const [showMusicPicker, setShowMusicPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setStep('choose-type');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setCaption(prev => prev + emoji);
  };

  const handlePublishStory = () => {
    if (selectedImage) {
      onPublishStory({
        image: selectedImage,
        caption: caption || undefined
      });
      handleClose();
    }
  };

  const handlePublishPost = () => {
    if (selectedImage && caption.trim()) {
      onPublishPost({
        image: selectedImage,
        caption: caption.trim(),
        music: selectedMusic || undefined
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setStep('upload');
    setSelectedImage('');
    setCaption('');
    setSelectedMusic(null);
    setShowMusicPicker(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-white/10 p-0 overflow-hidden">
        <VisuallyHidden.Root>
          <DialogTitle>
            {step === 'upload' && 'Upload Content'}
            {step === 'choose-type' && 'Choose Type'}
            {step === 'story' && 'Create Story'}
            {step === 'post' && 'Create Post'}
          </DialogTitle>
          <DialogDescription>
            {step === 'upload' && 'Upload a photo or video to create your story or post'}
            {step === 'choose-type' && 'Choose whether to create a story or a post'}
            {step === 'story' && 'Customize and publish your story'}
            {step === 'post' && 'Write a caption and publish your post'}
          </DialogDescription>
        </VisuallyHidden.Root>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-white font-medium">
            {step === 'upload' && 'Upload Content'}
            {step === 'choose-type' && 'Choose Type'}
            {step === 'story' && 'Create Story'}
            {step === 'post' && 'Create Post'}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="p-1 hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white/70" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {step === 'upload' && (
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70 mb-2">Click to upload a photo</p>
                <p className="text-white/50 text-sm">or drag and drop</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Gallery
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {step === 'choose-type' && selectedImage && (
            <div className="space-y-4">
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-black">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="gradient-primary text-white border-0 h-12"
                  onClick={() => setStep('story')}
                >
                  Create Story
                </Button>
                <Button
                  className="gradient-primary text-white border-0 h-12"
                  onClick={() => setStep('post')}
                >
                  Create Post
                </Button>
              </div>
            </div>
          )}

          {step === 'story' && selectedImage && (
            <div className="space-y-4">
              <div className="aspect-[9/16] w-full max-w-xs mx-auto rounded-lg overflow-hidden bg-black">
                <img 
                  src={selectedImage} 
                  alt="Story Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    placeholder="Add a caption (optional)..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-12"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                  </div>
                </div>
                
                <Button
                  className="w-full gradient-primary text-white border-0"
                  onClick={handlePublishStory}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Story
                </Button>
              </div>
            </div>
          )}

          {step === 'post' && selectedImage && (
            <div className="space-y-4">
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-black">
                <img 
                  src={selectedImage} 
                  alt="Post Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <Textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-20 pr-12 resize-none"
                    required
                  />
                  <div className="absolute right-2 top-2">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                  </div>
                </div>
                
                {/* Music Selection */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                    onClick={() => setShowMusicPicker(!showMusicPicker)}
                  >
                    <Music className="h-4 w-4 mr-2" />
                    {selectedMusic ? `${selectedMusic.name} - ${selectedMusic.artist}` : 'Add Music'}
                  </Button>
                  
                  {showMusicPicker && (
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <p className="text-white/70 text-sm mb-3">Popular tracks</p>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {mockSpotifyTracks.map((track) => (
                          <button
                            key={track.id}
                            className={`w-full text-left p-2 rounded hover:bg-white/10 transition-colors ${
                              selectedMusic?.id === track.id ? 'bg-primary/20' : ''
                            }`}
                            onClick={() => {
                              setSelectedMusic(track);
                              setShowMusicPicker(false);
                            }}
                          >
                            <div className="text-white text-sm font-medium">{track.name}</div>
                            <div className="text-white/60 text-xs">{track.artist}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedMusic && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/20">
                        <Music className="h-3 w-3 mr-1" />
                        {selectedMusic.name}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMusic(null)}
                        className="p-1 hover:bg-white/10"
                      >
                        <X className="h-3 w-3 text-white/50" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <Button
                  className="w-full gradient-primary text-white border-0"
                  onClick={handlePublishPost}
                  disabled={!caption.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Publish Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}