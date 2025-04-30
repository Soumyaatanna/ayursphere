
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment, Post } from '@/models/types';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { addComment } from '@/services/dataService';
import { toast } from 'sonner';

interface CommentSectionProps {
  post: Post;
  onCommentAdded: (newPost: Post) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ post, onCommentAdded }) => {
  const { currentUser } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('You must be logged in to comment');
      return;
    }
    
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const commentData = {
        postId: post.id,
        userId: currentUser.id,
        username: currentUser.username,
        userAvatar: currentUser.avatar,
        content: commentText.trim()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newComment = addComment(post.id, commentData);
      
      if (newComment) {
        const updatedPost = { ...post };
        setCommentText('');
        onCommentAdded(updatedPost);
        toast.success('Comment added successfully');
      }
    } catch (error) {
      toast.error('Failed to add comment');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CommentItem = ({ comment }: { comment: Comment }) => {
    const formattedDate = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
    
    return (
      <div className="flex space-x-4 mb-6">
        <Avatar>
          <AvatarImage src={comment.userAvatar} alt={comment.username} />
          <AvatarFallback>{comment.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-baseline space-x-2 mb-1">
            <h4 className="font-medium">{comment.username}</h4>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          
          <div className="prose-sm prose-ayur max-w-none">
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-bold mb-6 flex items-center">
        <MessageSquare className="mr-2 h-5 w-5" />
        Comments ({post.comments.length})
      </h2>
      
      {currentUser ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
              <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts or experiences..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="mb-2 min-h-[100px]"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || !commentText.trim()}
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-muted p-4 rounded-lg mb-8 text-center">
          <p className="mb-3">You need to be logged in to comment</p>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      )}
      
      {post.comments.length > 0 ? (
        <div className="space-y-6">
          {post.comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
