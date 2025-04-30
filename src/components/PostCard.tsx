import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/models/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Heart, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  layout?: 'large' | 'standard' | 'compact';
}

const PostCard: React.FC<PostCardProps> = ({ post, layout = 'standard' }) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  // Function to get appropriate image based on post title
  const getImageForPost = (post: Post) => {
    const title = post.title.toLowerCase();
    
    // Use specific images based on post title keywords
    if (title.includes('turmeric') || title.includes('golden milk')) {
      // Turmeric image for golden milk
      return 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5';
    } else if (title.includes('morning routine') || title.includes('morning practices')) {
      // Morning routine/meditation image
      return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773';
    } else if (title.includes('respiratory') || title.includes('breathing')) {
      // Respiratory/breathing image
      return 'https://images.unsplash.com/photo-1584636778269-c28dd94f96e9';
    } else if (title.includes('cat') || title.includes('pet') || title.includes('animal')) {
      return 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1';
    } else if (title.includes('flower') || title.includes('herb') || title.includes('plant')) {
      return 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07';
    }
    
    // Default to the post's featured image if no match
    return post.featuredImage;
  };
  
  const renderTags = () => {
    if (!post.tags.length) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {post.tags.slice(0, 3).map(tag => (
          <Link to={`/tags/${tag.slug}`} key={tag.id}>
            <Badge variant="secondary" className="text-xs">
              {tag.name}
            </Badge>
          </Link>
        ))}
        {post.tags.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{post.tags.length - 3} more
          </Badge>
        )}
      </div>
    );
  };
  
  if (layout === 'large') {
    return (
      <article className="group rounded-lg overflow-hidden bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[16/9] overflow-hidden">
          <Link to={`/posts/${post.slug}`}>
            <img 
              src={getImageForPost(post)} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <Link to={`/categories/${post.categoryName.toLowerCase()}`} className="text-xs font-medium text-ayur-brown hover:underline mb-2">
              {post.categoryName}
            </Link>
            <div className="flex items-center space-x-3 text-muted-foreground text-xs">
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {post.views}
              </span>
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {post.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {post.comments.length}
              </span>
            </div>
          </div>
          
          <h2 className="font-serif font-bold text-2xl mb-3 group-hover:text-ayur-green transition-colors">
            <Link to={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          
          {renderTags()}
          
          <div className="flex items-center space-x-3 mt-5 pt-4 border-t border-border">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{post.authorName}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
  
  if (layout === 'compact') {
    return (
      <article className="flex gap-4 items-start p-3 rounded-md hover:bg-muted/50 transition-colors">
        <div className="flex-shrink-0 rounded-md overflow-hidden w-16 h-16">
          <Link to={`/posts/${post.slug}`}>
            <img 
              src={getImageForPost(post)} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        
        <div className="flex-1 min-w-0">
          <Link to={`/categories/${post.categoryName.toLowerCase()}`} className="text-xs font-medium text-ayur-brown hover:underline">
            {post.categoryName}
          </Link>
          
          <h3 className="font-serif font-medium text-sm mb-1 truncate">
            <Link to={`/posts/${post.slug}`} className="hover:text-ayur-green transition-colors">
              {post.title}
            </Link>
          </h3>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>
        </div>
      </article>
    );
  }
  
  // Default: standard layout
  return (
    <article className="group rounded-lg overflow-hidden bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden">
        <Link to={`/posts/${post.slug}`}>
          <img 
            src={getImageForPost(post)} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      
      <div className="p-4">
        <Link to={`/categories/${post.categoryName.toLowerCase()}`} className="text-xs font-medium text-ayur-brown hover:underline mb-2 inline-block">
          {post.categoryName}
        </Link>
        
        <h2 className="font-serif font-bold text-lg mb-2 line-clamp-2 group-hover:text-ayur-green transition-colors">
          <Link to={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{post.authorName}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-muted-foreground text-xs">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {post.comments.length}
            </span>
          </div>
        </div>
        
        {renderTags()}
      </div>
    </article>
  );
};

export default PostCard;
