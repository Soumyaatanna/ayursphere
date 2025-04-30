
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { getCategoryBySlug, getPostsByCategory, getRemediesByCategory } from '@/services/dataService';
import { Category, Post, Remedy } from '@/models/types';
import { ArrowLeft, Heart, Star, VerifiedIcon } from 'lucide-react';
import PostCard from '@/components/PostCard';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [expertRemedies, setExpertRemedies] = useState<Remedy[]>([]);
  const [userRemedies, setUserRemedies] = useState<Remedy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const categoryData = getCategoryBySlug(slug);
        if (categoryData) {
          setCategory(categoryData);
          
          const categoryPosts = getPostsByCategory(categoryData.id);
          setPosts(categoryPosts);
          
          const categoryRemedies = getRemediesByCategory(categoryData.id);
          setRemedies(categoryRemedies);
          
          // Split remedies by expert and user contributions
          setExpertRemedies(categoryRemedies.filter(remedy => remedy.isExpertVerified));
          setUserRemedies(categoryRemedies.filter(remedy => !remedy.isExpertVerified));
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [slug]);

  const renderRemedyCard = (remedy: Remedy) => (
    <Card key={remedy.id} className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="font-serif text-lg">{remedy.title}</CardTitle>
          {remedy.isExpertVerified && (
            <Badge variant="outline" className="bg-ayur-sage/20 text-ayur-green flex items-center gap-1">
              <VerifiedIcon className="h-3 w-3" />
              Expert Verified
            </Badge>
          )}
        </div>
        <CardDescription>{remedy.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div>
          <h4 className="font-medium mb-2 text-sm text-ayur-brown">Ingredients:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {remedy.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2 text-sm text-ayur-brown">Instructions:</h4>
          <ol className="list-decimal list-inside text-sm text-muted-foreground">
            {remedy.instructions.map((step, index) => (
              <li key={index} className="mb-1">{step}</li>
            ))}
          </ol>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={remedy.authorAvatar} />
            <AvatarFallback>{remedy.authorName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{remedy.authorName}</span>
        </div>
        <div className="flex items-center space-x-3 text-muted-foreground text-xs">
          <span className="flex items-center">
            <Heart className="h-3 w-3 mr-1" />
            {remedy.likes}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(remedy.createdAt), { addSuffix: true })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-ayur-cream/30 p-8">
          <div className="ayur-container">
            <div className="h-8 bg-muted animate-pulse rounded-lg w-1/4 mb-6"></div>
            <div className="h-16 bg-muted animate-pulse rounded-lg w-3/4 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-ayur-cream/30 p-8">
          <div className="ayur-container text-center py-16">
            <h1 className="font-serif text-3xl font-bold text-ayur-green mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">The category you're looking for doesn't seem to exist.</p>
            <Button asChild variant="default">
              <Link to="/categories">View All Categories</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-ayur-cream/30">
        <section 
          className="bg-gradient-to-br from-ayur-cream to-ayur-sage/20 py-16 relative"
          style={{
            backgroundImage: category.imageUrl ? `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${category.imageUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="ayur-container">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/categories" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Link>
            </Button>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ayur-green mb-6">
              {category.name}
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mb-4">
              {category.description || `Explore traditional Ayurvedic remedies and community contributions for ${category.name.toLowerCase()}.`}
            </p>
            <Button asChild className="bg-ayur-green hover:bg-ayur-green/90">
              <Link to="/create-post">Share Your Remedy</Link>
            </Button>
          </div>
        </section>
        
        <section className="py-12">
          <div className="ayur-container">
            <Tabs defaultValue="expert-remedies" className="w-full">
              <div className="flex justify-between items-center border-b mb-6">
                <TabsList>
                  <TabsTrigger value="expert-remedies" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Expert Remedies
                  </TabsTrigger>
                  <TabsTrigger value="community-remedies" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Community Remedies
                  </TabsTrigger>
                  <TabsTrigger value="related-articles">Related Articles</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="expert-remedies" className="mt-0">
                {expertRemedies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {expertRemedies.map(remedy => renderRemedyCard(remedy))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No expert remedies available for this category yet. Check back soon!
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="community-remedies" className="mt-0">
                {userRemedies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userRemedies.map(remedy => renderRemedyCard(remedy))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No community remedies have been shared yet for this category.
                    </p>
                    <Button asChild className="mt-4 bg-ayur-green hover:bg-ayur-green/90">
                      <Link to="/create-post">Be the first to share a remedy</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="related-articles" className="mt-0">
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No articles available for this category yet. Check back soon!
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
