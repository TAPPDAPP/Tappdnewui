import { Badge } from "./ui/badge";

const categories = [
  "Date Night",
  "Pool Party", 
  "House Party",
  "Music Events",
  "Lowkey Sufi Events",
  "Clubbing",
  "Movie Night"
];

interface EventCategoriesProps {
  onCategorySelect?: (category: string) => void;
  onExploreAllClick?: () => void;
}

export function EventCategories({ onCategorySelect, onExploreAllClick }: EventCategoriesProps) {
  return (
    <div className="px-4 py-6">
      <h3 className="mb-4 text-white">Event Categories</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ touchAction: 'pan-x' }}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect?.(category)}
            className={`flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-all text-white text-sm whitespace-nowrap ${
              index === 2 
                ? 'gradient-primary shadow-lg' 
                : 'bg-white/10 hover:gradient-primary-hover border border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
        {/* Explore All button */}
        <button 
          onClick={() => onExploreAllClick?.()}
          className="flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-all text-white text-sm whitespace-nowrap border border-primary text-primary hover:gradient-primary hover:text-white"
        >
          Explore All
        </button>
      </div>
    </div>
  );
}