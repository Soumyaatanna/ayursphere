
import React, { useState } from 'react';
import { Tag } from '@/models/types';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';

interface PostTagSelectorProps {
  allTags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  maxTags?: number;
}

const PostTagSelector: React.FC<PostTagSelectorProps> = ({
  allTags,
  selectedTags,
  setSelectedTags,
  maxTags = 5
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTags = allTags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedTags.some(selected => selected.id === tag.id)
  );
  
  const handleSelectTag = (tag: Tag) => {
    if (selectedTags.length < maxTags) {
      setSelectedTags([...selectedTags, tag]);
      setSearchQuery('');
    }
  };
  
  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };
  
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tags selected</p>
        ) : (
          selectedTags.map(tag => (
            <Badge 
              key={tag.id} 
              variant="outline"
              className="flex items-center gap-1 bg-ayur-sage-light text-ayur-green-dark border-ayur-sage"
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-1 rounded-full hover:bg-ayur-sage p-1"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag.name} tag</span>
              </button>
            </Badge>
          ))
        )}
      </div>
      
      {selectedTags.length < maxTags && (
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for tags..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {searchQuery && filteredTags.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              <ul className="py-1">
                {filteredTags.slice(0, 5).map(tag => (
                  <li 
                    key={tag.id}
                    className="px-3 py-2 hover:bg-ayur-cream cursor-pointer"
                    onClick={() => handleSelectTag(tag)}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostTagSelector;
