import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';
import PostCard from '@/components/PostCard';
import FloatingChatButton from '@/components/FloatingChatButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Eye, Heart } from 'lucide-react';
import { getPostBySlug, getApprovedPosts, likePost } from '@/services/dataService';
import { Post as PostType } from '@/models/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import MarkdownPreview from '@/components/MarkdownPreview';

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentUser } = useAuth();
  const [post, setPost] = useState<PostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);

  // Function to get appropriate image based on post title
  const getImageForPost = (post: PostType) => {
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

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!slug) return;
        
        const fetchedPost = getPostBySlug(slug);
        if (!fetchedPost) {
          toast.error('Post not found');
          return;
        }
        
        const approved = getApprovedPosts();
        const related = approved
          .filter(p => 
            p.id !== fetchedPost.id && 
            (p.categoryId === fetchedPost.categoryId || 
             p.tags.some(t => fetchedPost.tags.some(pt => pt.id === t.id)))
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        setPost(fetchedPost);
        setRelatedPosts(related);
        
        // Check local storage to see if user has liked this post
        const likedPosts = JSON.parse(localStorage.getItem('ayursphere_liked_posts') || '[]');
        setHasLiked(likedPosts.includes(fetchedPost.id));
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  const handleLike = () => {
    if (!post) return;
    
    if (hasLiked) {
      toast.error('You have already liked this post');
      return;
    }
    
    const updatedPost = likePost(post.id);
    if (updatedPost) {
      setPost(updatedPost);
      setHasLiked(true);
      
      // Save to local storage
      const likedPosts = JSON.parse(localStorage.getItem('ayursphere_liked_posts') || '[]');
      likedPosts.push(post.id);
      localStorage.setItem('ayursphere_liked_posts', JSON.stringify(likedPosts));
      
      toast.success('Post liked!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-10">
          <div className="ayur-container">
            <div className="space-y-4">
              <div className="h-8 bg-muted animate-pulse rounded w-1/4"></div>
              <div className="h-16 bg-muted animate-pulse rounded"></div>
              <div className="h-8 bg-muted animate-pulse rounded w-1/2"></div>
              <div className="h-96 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </main>
        <FloatingChatButton />
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-10">
          <div className="ayur-container text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </main>
        <FloatingChatButton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Post Header */}
        <div className="w-full bg-ayur-sage/10 py-8">
          <div className="ayur-container">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link to={`/categories/${post.categoryName.toLowerCase()}`}>
                <Badge variant="outline" className="bg-white font-medium">
                  {post.categoryName}
                </Badge>
              </Link>
              
              {post.tags.map(tag => (
                <Link key={tag.id} to={`/tags/${tag.slug}`}>
                  <Badge variant="secondary" className="bg-white">
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                  <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.authorName}</p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {post.views} views
                </span>
                <button 
                  onClick={handleLike}
                  className={cn(
                    "flex items-center gap-1 hover:text-ayur-red transition-colors", 
                    hasLiked && "text-ayur-red"
                  )}
                >
                  <Heart className="mr-1 h-4 w-4" fill={hasLiked ? "currentColor" : "none"} />
                  {post.likes} likes
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="ayur-container py-8">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={getImageForPost(post)}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        </div>
        
        {/* Post Content */}
        <article className="ayur-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Use MarkdownPreview component instead of dangerouslySetInnerHTML */}
              <MarkdownPreview content={post.content} />
              
              <Separator className="my-10" />
              
              <CommentSection post={post} onCommentAdded={setPost} />
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-20">
                {/* Author Bio */}
                <div className="bg-white rounded-lg border border-border p-6 mb-8">
                  <h3 className="font-serif text-lg font-bold mb-4">About the Author</h3>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                      <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.authorName}</p>
                      <p className="text-xs text-muted-foreground">Ayurveda Enthusiast</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sharing authentic Ayurvedic wisdom and experiences to help others on their wellness journey.
                  </p>
                </div>
                
                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h3 className="font-serif text-lg font-bold mb-4">Related Remedies</h3>
                    <div className="space-y-4">
                      {relatedPosts.map(relatedPost => (
                        <PostCard key={relatedPost.id} post={relatedPost} layout="compact" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <FloatingChatButton />
      <Footer />
    </div>
  );
};

export default Post;
