import { useState } from "react";
import { Send, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { EmojiPicker } from "./EmojiPicker";

interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  postId: string;
  isVisible: boolean;
  onClose: () => void;
}

// Mock comments data
const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1-1',
      userName: 'Alex Rivera',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
      content: 'This is absolutely incredible! 🎷✨',
      timestamp: '1h ago',
      likes: 12,
      isLiked: false
    },
    {
      id: 'c1-2',
      userName: 'Maya Singh',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b833?auto=format&fit=crop&w=100&h=100',
      content: 'The saxophone solo gave me chills! Amazing performance 🎵',
      timestamp: '45m ago',
      likes: 8,
      isLiked: true
    },
    {
      id: 'c1-3',
      userName: 'Carlos Martinez',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
      content: 'Been following this band for years, they never disappoint! 🔥',
      timestamp: '30m ago',
      likes: 15,
      isLiked: false
    },
    {
      id: 'c1-4',
      userName: 'Luna Park',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
      content: 'Wish I could be there! The atmosphere looks amazing 😍',
      timestamp: '20m ago',
      likes: 6,
      isLiked: true
    },
    {
      id: 'c1-5',
      userName: 'Jordan Kim',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100',
      content: 'Jazz nights like this remind me why I love live music so much 💙',
      timestamp: '15m ago',
      likes: 9,
      isLiked: false
    }
  ],
  '2': [
    {
      id: 'c2-1',
      userName: 'Sophie Chen',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100',
      content: 'The talent here tonight is unreal! 🎹',
      timestamp: '2h ago',
      likes: 18,
      isLiked: true
    },
    {
      id: 'c2-2',
      userName: 'Ryan Torres',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
      content: 'Meeting musicians at jazz events is always such a vibe 🎷',
      timestamp: '1h ago',
      likes: 7,
      isLiked: false
    },
    {
      id: 'c2-3',
      userName: 'Emma Wilson',
      userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&h=100',
      content: 'Love how the jazz community comes together like this! ❤️',
      timestamp: '45m ago',
      likes: 11,
      isLiked: true
    }
  ],
  '3': [
    {
      id: 'c3-1',
      userName: 'David Park',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
      content: 'This venue is absolutely gorgeous! Perfect for jazz 🌟',
      timestamp: '3h ago',
      likes: 22,
      isLiked: false
    },
    {
      id: 'c3-2',
      userName: 'Nina Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b833?auto=format&fit=crop&w=100&h=100',
      content: 'The lighting and ambiance are on point tonight! ✨',
      timestamp: '2h ago',
      likes: 16,
      isLiked: true
    },
    {
      id: 'c3-3',
      userName: 'Marcus Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100',
      content: 'Every detail of this place screams elegance 🥂',
      timestamp: '1h ago',
      likes: 13,
      isLiked: false
    },
    {
      id: 'c3-4',
      userName: 'Zoe Tang',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
      content: 'Already planning my next visit here! The acoustics are incredible 🎵',
      timestamp: '30m ago',
      likes: 8,
      isLiked: true
    }
  ],
  '4': [
    {
      id: 'c4-1',
      userName: 'Mia Foster',
      userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&h=100',
      content: 'Backstage energy is always so electric! Break a leg! 🎹✨',
      timestamp: '4h ago',
      likes: 25,
      isLiked: true
    },
    {
      id: 'c4-2',
      userName: 'Tyler Brooks',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
      content: 'Can\'t wait to hear those smooth jazz vibes! 🎷',
      timestamp: '3h ago',
      likes: 19,
      isLiked: false
    },
    {
      id: 'c4-3',
      userName: 'Aria Patel',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100',
      content: 'The preparation behind great performances is so inspiring! 🌟',
      timestamp: '2h ago',
      likes: 14,
      isLiked: true
    }
  ]
};

export function CommentSection({ postId, isVisible, onClose }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments[postId] || []);
  const [newComment, setNewComment] = useState('');

  const handleLikeComment = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      )
    );
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `new-${Date.now()}`,
        userName: 'Harsh Arora',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
        content: newComment.trim(),
        timestamp: 'now',
        likes: 0,
        isLiked: false
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewComment(prev => prev + emoji);
  };

  if (!isVisible) return null;

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      {/* Add Comment Input */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100" 
            alt="You" 
            className="rounded-full" 
          />
        </Avatar>
        <div className="flex-1 relative">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-20"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            <Button
              size="sm"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="p-1 h-8 w-8 gradient-primary text-white border-0 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/50 text-sm">No comments yet</p>
            <p className="text-white/30 text-xs">Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <img src={comment.userAvatar} alt={comment.userName} className="rounded-full" />
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="bg-white/5 rounded-2xl px-3 py-2">
                  <p className="text-white font-medium text-sm">{comment.userName}</p>
                  <p className="text-white/90 text-sm leading-relaxed">{comment.content}</p>
                </div>
                
                <div className="flex items-center gap-4 mt-1 ml-1">
                  <span className="text-white/50 text-xs">{comment.timestamp}</span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    className="p-0 h-auto hover:bg-transparent text-white/50 hover:text-white"
                  >
                    <Heart 
                      className={`h-3 w-3 mr-1 ${
                        comment.isLiked ? 'text-red-500 fill-red-500' : ''
                      }`} 
                    />
                    <span className="text-xs">{comment.likes > 0 ? comment.likes : ''}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent text-white/50 hover:text-white text-xs"
                  >
                    Reply
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <MoreHorizontal className="h-3 w-3 text-white/50 hover:text-white" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
