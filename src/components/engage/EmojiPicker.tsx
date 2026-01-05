import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  trigger?: React.ReactNode;
}

const emojiCategories = {
  "Smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪"],
  "Hearts": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝"],
  "Gestures": ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👋", "🤚", "🖐️", "✋", "🖖", "👏", "🙌", "🤲"],
  "Objects": ["🎵", "🎶", "🎤", "🎧", "📱", "💻", "⌚", "📷", "🎬", "📺", "🎮", "🕹️", "🎲", "♠️", "♥️", "♦️", "♣️", "🃏", "🀄", "🎯"],
  "Food": ["🍕", "🍔", "🍟", "🌭", "🥪", "🌮", "🌯", "🥙", "🥚", "🍳", "🥘", "🍲", "🥗", "🍿", "🧈", "🍞", "🥖", "🥨", "🧀", "🥞"],
  "Activities": ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳"],
  "Nature": ["🌺", "🌸", "🌼", "🌻", "🌷", "⚘", "💐", "🌹", "🥀", "🌊", "💧", "🌀", "🌈", "☀️", "🌤️", "⛅", "🌦️", "🌧️", "⛈️", "🌩️"],
  "Symbols": ["💯", "💫", "⭐", "🌟", "✨", "⚡", "💥", "💢", "💨", "💦", "💤", "🕳️", "💣", "💔", "❣️", "💕", "💞", "💓", "💗", "💖"]
};

export function EmojiPicker({ onEmojiSelect, trigger }: EmojiPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState("Smileys");

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
      <Smile className="h-5 w-5 text-white/70" />
    </Button>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || defaultTrigger}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-background border-white/10" align="end">
        <div className="flex flex-col max-h-64">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide border-b border-white/10 p-2">
            {Object.keys(emojiCategories).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className={`flex-shrink-0 text-xs px-3 py-1 ${
                  selectedCategory === category 
                    ? "bg-primary text-white" 
                    : "text-white/70 hover:bg-white/10"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Emoji Grid */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-8 gap-2">
              {emojiCategories[selectedCategory as keyof typeof emojiCategories].map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="p-0 h-8 w-8 hover:bg-white/10 text-lg"
                  onClick={() => onEmojiSelect(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}