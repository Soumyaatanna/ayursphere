
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MarkdownPreview from '@/components/MarkdownPreview';
import PostTagSelector from '@/components/PostTagSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, FileText, EyeIcon } from 'lucide-react';
import { createPost, getCategories, getTags } from '@/services/dataService';
import { Category, Tag } from '@/models/types';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const CreatePost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Fetch categories and tags
    const fetchData = async () => {
      try {
        const fetchedCategories = getCategories();
        const fetchedTags = getTags();
        
        setCategories(fetchedCategories);
        setAllTags(fetchedTags);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load categories and tags',
          variant: 'destructive',
        });
      }
    };
    
    fetchData();
  }, [toast]);
  
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to submit a remedy',
        variant: 'destructive',
      });
      return;
    }
    
    if (!title || !content || !excerpt || !selectedCategory) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get selected category name
      const category = categories.find(cat => cat.id === selectedCategory);
      
      if (!category) {
        throw new Error('Selected category not found');
      }
      
      // Create post with required properties
      const newPost = createPost({
        title,
        content,  // This is now required
        slug: generateSlug(title),
        excerpt,
        featuredImage: featuredImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&h=500',
        authorId: currentUser.id,
        authorName: currentUser.username,
        authorAvatar: currentUser.avatar,
        categoryId: selectedCategory,
        categoryName: category.name,
        tags: selectedTags
      });
      
      toast({
        title: 'Success!',
        description: 'Your remedy has been submitted for review',
      });
      
      // Redirect to home page after success
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit remedy. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 ayur-container py-16">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="font-serif text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="mb-6">You need to be logged in to submit a remedy.</p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="ayur-container">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl font-bold mb-8 text-ayur-green">
              Share Your Ayurvedic Remedy
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    placeholder="Enter a descriptive title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Short Description</Label>
                  <Textarea 
                    id="excerpt"
                    placeholder="A brief summary of your remedy (1-2 sentences)"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Tags (up to 5)</Label>
                  <PostTagSelector 
                    allTags={allTags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                  />
                </div>
                
                <div>
                  <Label htmlFor="featuredImage">Featured Image URL (optional)</Label>
                  <Input 
                    id="featuredImage"
                    placeholder="https://example.com/image.jpg"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                  />
                </div>
                
                <div className="pt-4">
                  <Label htmlFor="content">Content</Label>
                  <div className="mt-2">
                    <Tabs defaultValue="write">
                      <TabsList className="mb-2">
                        <TabsTrigger value="write" className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Write
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="flex items-center">
                          <EyeIcon className="mr-2 h-4 w-4" />
                          Preview
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="write">
                        <Textarea 
                          id="content"
                          placeholder="Write your remedy content in Markdown format..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={15}
                          className="font-mono"
                          required
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          Supports Markdown formatting: **bold**, *italic*, # headings, - lists, etc.
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="preview" className="min-h-[200px] p-4 border rounded-md bg-background">
                        <MarkdownPreview content={content} />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit for Review'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatePost;
