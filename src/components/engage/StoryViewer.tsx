import { useState, useEffect } from "react";
import { X, Heart, Send, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Avatar } from "../ui/avatar";
import { EmojiPicker } from "./EmojiPicker";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  caption?: string;
  timestamp: string;
  isViewed: boolean;
}

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex: number;
}

export function StoryViewer({ isOpen, onClose, stories, initialStoryIndex }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [replyText, setReplyText] = useState('');

  const currentStory = stories[currentIndex];
  const storyDuration = 5000; // 5 seconds per story

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next story
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            return 0;
          } else {
            // End of stories
            onClose();
            return 0;
          }
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, currentIndex, stories.length, onClose]);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
    }
  }, [currentIndex, isOpen]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleResume = () => {
    setIsPlaying(true);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply
      console.log(`Reply to ${currentStory?.userName}: ${replyText}`);
      setReplyText('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setReplyText(prev => prev + emoji);
  };

  if (!isOpen || !currentStory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-full bg-black border-0 p-0 m-0 rounded-none overflow-hidden">
        <VisuallyHidden.Root>
          <DialogTitle>{currentStory.userName}'s Story</DialogTitle>
          <DialogDescription>
            Viewing story from {currentStory.userName}. Swipe or click arrows to navigate between stories.
          </DialogDescription>
        </VisuallyHidden.Root>
        
        <div className="relative h-full flex flex-col">
          {/* Progress Bars */}
          <div className="flex gap-1 p-4 pb-2">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width: index < currentIndex ? '100%' : 
                           index === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <img src={currentStory.userAvatar} alt={currentStory.userName} className="rounded-full" />
              </Avatar>
              <div>
                <p className="text-white text-sm font-medium">{currentStory.userName}</p>
                <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={isPlaying ? handlePause : handleResume}
                className="p-1 hover:bg-white/10"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 hover:bg-white/10"
              >
                <MoreHorizontal className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 hover:bg-white/10"
              >
                <X className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>

          {/* Story Content */}
          <div className="flex-1 relative">
            <img 
              src={currentStory.content} 
              alt="Story content" 
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Areas */}
            <button 
              className="absolute left-0 top-0 w-1/3 h-full"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            />
            <button 
              className="absolute right-0 top-0 w-1/3 h-full"
              onClick={handleNext}
            />
            
            {/* Navigation Buttons (visible on hover) */}
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 opacity-0 hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </Button>
            )}
            
            {currentIndex < stories.length - 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 opacity-0 hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </Button>
            )}

            {/* Caption */}
            {currentStory.caption && (
              <div className="absolute bottom-20 left-0 right-0 px-4">
                <p className="text-white text-sm bg-black/50 rounded-lg px-3 py-2">
                  {currentStory.caption}
                </p>
              </div>
            )}
          </div>

          {/* Reply Section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  placeholder={`Reply to ${currentStory.userName}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-20"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                  <Button
                    size="sm"
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="p-1 h-8 w-8 gradient-primary text-white border-0 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-white/10"
              >
                <Heart className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}