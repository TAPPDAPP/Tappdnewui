import { useState } from "react";
import { Plus, Heart, MessageCircle, Share, MoreHorizontal, Play, Music } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { StoryPostModal } from "./StoryPostModal";
import { CommentSection } from "./CommentSection";
import { StoryViewer } from "./StoryViewer";

interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  preview: string;
  isViewed: boolean;
}

interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  music?: {
    name: string;
    artist: string;
    preview: string;
  };
}

const mockStories: Story[] = [
  {
    id: '1',
    userName: 'Emma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b833?auto=format&fit=crop&w=100&h=100',
    preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400',
    isViewed: false
  },
  {
    id: '2',
    userName: 'Michael',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
    preview: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&h=400',
    isViewed: true
  },
  {
    id: '3',
    userName: 'Sarah',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
    preview: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&w=300&h=400',
    isViewed: false
  },
  {
    id: '4',
    userName: 'David',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
    preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400',
    isViewed: true
  },
  {
    id: '5',
    userName: 'Lisa',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100',
    preview: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=300&h=400',
    isViewed: false
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    userName: 'Emma Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b833?auto=format&fit=crop&w=100&h=100',
    caption: 'Amazing jazz performance tonight! The energy in this room is incredible 🎷✨ #JazzNight #LiveMusic',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&h=400',
    likes: 127,
    comments: 23,
    shares: 8,
    timestamp: '2h ago',
    isLiked: true,
    music: {
      name: 'Smooth Operator',
      artist: 'Sade',
      preview: 'https://sample-music.com/smooth-operator'
    }
  },
  {
    id: '2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
    caption: 'Met some incredible musicians tonight! Nothing beats live jazz music 🎵',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&h=400',
    likes: 89,
    comments: 15,
    shares: 4,
    timestamp: '3h ago',
    isLiked: false
  },
  {
    id: '3',
    userName: 'Sarah Williams',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
    caption: 'The venue is absolutely stunning tonight! Perfect atmosphere for jazz 🌟',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&h=400',
    likes: 156,
    comments: 31,
    shares: 12,
    timestamp: '4h ago',
    isLiked: true,
    music: {
      name: 'Take Five',
      artist: 'Dave Brubeck',
      preview: 'https://sample-music.com/take-five'
    }
  },
  {
    id: '4',
    userName: 'David Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100',
    caption: 'Backstage vibes before the show! Ready to bring some smooth jazz to you all 🎹',
    image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&w=500&h=400',
    likes: 203,
    comments: 42,
    shares: 18,
    timestamp: '5h ago',
    isLiked: false
  }
];

// Sample story content for viewer
const mockStoryContent = [
  {
    id: '1',
    userName: 'Emma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b812b833?auto=format&fit=crop&w=100&h=100',
    content: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400',
    caption: 'Jazz night vibes! 🎷✨',
    timestamp: '2h ago',
    isViewed: false
  },
  {
    id: '2',
    userName: 'Michael',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
    content: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&h=400',
    caption: 'Meeting amazing musicians tonight! 🎵',
    timestamp: '3h ago',
    isViewed: true
  },
  {
    id: '3',
    userName: 'Sarah',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100',
    content: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&w=300&h=400',
    caption: 'Perfect venue for jazz! 🌟',
    timestamp: '4h ago',
    isViewed: false
  }
];

export function EventInteractionSection() {
  const [posts, setPosts] = useState(mockPosts);
  const [stories, setStories] = useState(mockStories);
  const [userStories, setUserStories] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [showAddComment, setShowAddComment] = useState<Record<string, boolean>>({});

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleStoryClick = (storyIndex: number) => {
    setSelectedStoryIndex(storyIndex);
    setShowStoryViewer(true);
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handlePublishStory = (storyData: { image: string; caption?: string }) => {
    const newStory = {
      id: `user-story-${Date.now()}`,
      userName: 'Harsh Arora',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
      preview: storyData.image,
      isViewed: false
    };
    
    setUserStories(prev => [newStory, ...prev]);
    setShowCreateModal(false);
  };

  const handlePublishPost = (postData: { image: string; caption: string; music?: { name: string; artist: string; preview: string } }) => {
    const newPost = {
      id: `user-post-${Date.now()}`,
      userName: 'Harsh Arora',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100',
      caption: postData.caption,
      image: postData.image,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'now',
      isLiked: false,
      music: postData.music
    };
    
    setPosts(prev => [newPost, ...prev]);
    setShowCreateModal(false);
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleAddComment = (postId: string) => {
    setShowAddComment(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const StoryItem = ({ story, index, isUserStory = false }: { story: Story; index: number; isUserStory?: boolean }) => {
    return (
      <div 
        className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer"
        onClick={() => handleStoryClick(index)}
      >
        <div className="relative">
          <div className={`w-16 h-16 rounded-full p-0.5 ${
            story.isViewed ? 'bg-white/30' : 'bg-gradient-to-r from-pink-500 to-purple-500'
          }`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-background">
              <img
                src={story.preview}
                alt={story.userName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
            <Play className="h-3 w-3 text-white" />
          </div>
        </div>
        <span className="text-white text-xs text-center w-16 truncate">{story.userName}</span>
      </div>
    );
  };

  const AddStoryItem = () => (
    <div 
      className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer"
      onClick={handleCreateClick}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center hover:border-primary/50 transition-colors">
          <Plus className="h-6 w-6 text-white/70" />
        </div>
      </div>
      <span className="text-white/70 text-xs text-center w-16 truncate">Add Story</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-white font-medium text-center">Event Interaction</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6 safe-bottom">
          {/* Stories Section */}
          <div className="px-4 py-4">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              <AddStoryItem />
              {userStories.map((story, index) => (
                <StoryItem key={story.id} story={story} index={index} isUserStory />
              ))}
              {mockStories.map((story, index) => (
                <StoryItem key={story.id} story={story} index={userStories.length + index} />
              ))}
            </div>
          </div>

          {/* Posts Section */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="bg-transparent border-none shadow-none">
                <div className="space-y-3">
                  {/* Post Header */}
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <img src={post.userAvatar} alt={post.userName} className="rounded-full" />
                      </Avatar>
                      <div>
                        <p className="text-white font-medium text-sm">{post.userName}</p>
                        <p className="text-white/60 text-xs">{post.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 hover:bg-white/10">
                      <MoreHorizontal className="h-5 w-5 text-white/70" />
                    </Button>
                  </div>

                  {/* Post Image */}
                  <div className="w-full">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full aspect-square object-cover"
                    />
                  </div>

                  {/* Music Badge */}
                  {post.music && (
                    <div className="px-4">
                      <Badge className="bg-primary/20 text-primary border-primary/20">
                        <Music className="h-3 w-3 mr-1" />
                        {post.music.name} - {post.music.artist}
                      </Badge>
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="px-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="p-0 hover:bg-transparent"
                        >
                          <Heart
                            className={`h-6 w-6 ${
                              post.isLiked ? 'text-red-500 fill-red-500' : 'text-white'
                            }`}
                          />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 hover:bg-transparent"
                          onClick={() => toggleAddComment(post.id)}
                        >
                          <MessageCircle className="h-6 w-6 text-white" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                          <Share className="h-6 w-6 text-white" />
                        </Button>
                      </div>
                    </div>

                    {/* Likes and Comments Count */}
                    <div className="space-y-1">
                      <p className="text-white text-sm font-medium">{post.likes} likes</p>
                      <div className="space-y-1">
                        <p className="text-white text-sm">
                          <span className="font-medium">{post.userName}</span> {post.caption}
                        </p>
                        {post.comments > 0 && (
                          <button 
                            className="text-white/60 text-sm hover:text-white"
                            onClick={() => toggleComments(post.id)}
                          >
                            View all {post.comments} comments
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Comment Section */}
                    <CommentSection 
                      postId={post.id}
                      isVisible={showComments[post.id] || showAddComment[post.id] || false}
                      onClose={() => {
                        setShowComments(prev => ({ ...prev, [post.id]: false }));
                        setShowAddComment(prev => ({ ...prev, [post.id]: false }));
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Modals */}
      <StoryPostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPublishStory={handlePublishStory}
        onPublishPost={handlePublishPost}
      />

      <StoryViewer
        isOpen={showStoryViewer}
        onClose={() => setShowStoryViewer(false)}
        stories={[...userStories, ...mockStoryContent]}
        initialStoryIndex={selectedStoryIndex}
      />
    </div>
  );
}