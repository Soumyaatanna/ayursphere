
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle, 
  Clock, 
  Eye, 
  FileText, 
  Search, 
  Shield, 
  Trash2, 
  Users, 
  XCircle,
  Utensils
} from 'lucide-react';
import { toast } from 'sonner';
import { Post, Remedy } from '@/models/types';
import { 
  getPendingPosts, 
  getApprovedPosts, 
  updatePostStatus,
  getPendingRemedies,
  updateRemedyApprovalStatus 
} from '@/services/dataService';
import { formatDistanceToNow } from 'date-fns';

const Admin = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<Post[]>([]);
  const [pendingRemedies, setPendingRemedies] = useState<Remedy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (currentUser.role !== 'admin') {
      toast.error('You do not have permission to access the admin panel');
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const pending = getPendingPosts();
        const approved = getApprovedPosts();
        const pendingRemeds = getPendingRemedies();
        
        setPendingPosts(pending);
        setApprovedPosts(approved);
        setPendingRemedies(pendingRemeds);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser, navigate]);

  const handleApprovePost = async (postId: string) => {
    try {
      const updatedPost = updatePostStatus(postId, 'approved');
      if (updatedPost) {
        setPendingPosts(pendingPosts.filter(post => post.id !== postId));
        setApprovedPosts([...approvedPosts, updatedPost]);
        toast.success('Post approved successfully');
      }
    } catch (error) {
      console.error('Error approving post:', error);
      toast.error('Failed to approve post');
    }
  };

  const handleRejectPost = async (postId: string) => {
    try {
      const updatedPost = updatePostStatus(postId, 'rejected');
      if (updatedPost) {
        setPendingPosts(pendingPosts.filter(post => post.id !== postId));
        toast.success('Post rejected successfully');
      }
    } catch (error) {
      console.error('Error rejecting post:', error);
      toast.error('Failed to reject post');
    }
  };

  const handleApproveRemedy = async (remedyId: string) => {
    try {
      const updatedRemedy = updateRemedyApprovalStatus(remedyId, 'approved');
      if (updatedRemedy) {
        setPendingRemedies(pendingRemedies.filter(remedy => remedy.id !== remedyId));
        toast.success('Remedy approved successfully');
      }
    } catch (error) {
      console.error('Error approving remedy:', error);
      toast.error('Failed to approve remedy');
    }
  };

  const handleRejectRemedy = async (remedyId: string) => {
    try {
      const updatedRemedy = updateRemedyApprovalStatus(remedyId, 'rejected');
      if (updatedRemedy) {
        setPendingRemedies(pendingRemedies.filter(remedy => remedy.id !== remedyId));
        toast.success('Remedy rejected successfully');
      }
    } catch (error) {
      console.error('Error rejecting remedy:', error);
      toast.error('Failed to reject remedy');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="ayur-container">
          <div className="flex items-center mb-8">
            <Shield className="h-8 w-8 text-ayur-green mr-3" />
            <h1 className="font-serif text-3xl font-bold">Admin Panel</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Posts</p>
                  <h2 className="font-serif text-3xl font-bold">{pendingPosts.length}</h2>
                </div>
                <div className="bg-ayur-cream rounded-full p-2">
                  <Clock className="h-6 w-6 text-ayur-brown" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Remedies</p>
                  <h2 className="font-serif text-3xl font-bold">{pendingRemedies.length}</h2>
                </div>
                <div className="bg-ayur-cream rounded-full p-2">
                  <Utensils className="h-6 w-6 text-ayur-brown" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Published Posts</p>
                  <h2 className="font-serif text-3xl font-bold">{approvedPosts.length}</h2>
                </div>
                <div className="bg-ayur-cream rounded-full p-2">
                  <FileText className="h-6 w-6 text-ayur-brown" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
            <Tabs defaultValue="pending-posts">
              <div className="px-6 pt-6">
                <TabsList className="grid grid-cols-3 w-[600px]">
                  <TabsTrigger value="pending-posts" className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Pending Posts
                  </TabsTrigger>
                  <TabsTrigger value="pending-remedies" className="flex items-center">
                    <Utensils className="h-4 w-4 mr-2" />
                    Pending Remedies
                  </TabsTrigger>
                  <TabsTrigger value="approved-posts" className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Published Posts
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="pending-posts" className="p-6">
                {isLoading ? (
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading posts...</p>
                  </div>
                ) : pendingPosts.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
                    <Clock className="h-10 w-10 mb-2 opacity-50" />
                    <p>No pending posts to approve</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Post</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingPosts.map(post => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {post.featuredImage && (
                                  <div className="h-10 w-10 rounded mr-3 overflow-hidden flex-shrink-0">
                                    <img 
                                      src={post.featuredImage} 
                                      alt={post.title}
                                      className="h-full w-full object-cover" 
                                    />
                                  </div>
                                )}
                                <div className="truncate max-w-xs">
                                  {post.title}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                                  <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {post.authorName}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{post.categoryName}</Badge>
                            </TableCell>
                            <TableCell>
                              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/posts/${post.slug}`)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleApprovePost(post.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleRejectPost(post.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending-remedies" className="p-6">
                {isLoading ? (
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading remedies...</p>
                  </div>
                ) : pendingRemedies.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
                    <Utensils className="h-10 w-10 mb-2 opacity-50" />
                    <p>No pending remedies to approve</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Remedy</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Ingredients</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingRemedies.map(remedy => (
                          <TableRow key={remedy.id}>
                            <TableCell className="font-medium">
                              <div className="truncate max-w-xs">
                                {remedy.title}
                                <div className="text-xs text-muted-foreground mt-1 truncate">
                                  {remedy.description}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={remedy.authorAvatar} alt={remedy.authorName} />
                                  <AvatarFallback>{remedy.authorName[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {remedy.authorName}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {remedy.ingredients.length} ingredients
                              </span>
                            </TableCell>
                            <TableCell>
                              {formatDistanceToNow(new Date(remedy.createdAt), { addSuffix: true })}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleApproveRemedy(remedy.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleRejectRemedy(remedy.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="approved-posts" className="p-6">
                {isLoading ? (
                  <div className="h-40 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading posts...</p>
                  </div>
                ) : approvedPosts.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-10 w-10 mb-2 opacity-50" />
                    <p>No published posts yet</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                          type="search"
                          placeholder="Search posts..."
                          className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-input bg-background"
                        />
                      </div>
                    </div>
                    
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Post</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {approvedPosts.map(post => (
                            <TableRow key={post.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  {post.featuredImage && (
                                    <div className="h-10 w-10 rounded mr-3 overflow-hidden flex-shrink-0">
                                      <img 
                                        src={post.featuredImage} 
                                        alt={post.title}
                                        className="h-full w-full object-cover" 
                                      />
                                    </div>
                                  )}
                                  <div className="truncate max-w-xs">
                                    {post.title}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                                    <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  {post.authorName}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{post.categoryName}</Badge>
                              </TableCell>
                              <TableCell>{post.views}</TableCell>
                              <TableCell>
                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => navigate(`/posts/${post.slug}`)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => {}}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
