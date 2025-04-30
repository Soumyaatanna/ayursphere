
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Remedy, Category } from '@/models/types';
import { getRemedies, getCategories } from '@/services/dataService';
import { Link } from 'react-router-dom';
import { Heart, Search, Plus, Filter, VerifiedIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const Remedies = () => {
  const { currentUser } = useAuth();
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const allRemedies = getRemedies();
        const allCategories = getCategories();
        
        setRemedies(allRemedies);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching remedies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredRemedies = remedies.filter(remedy => {
    const matchesCategory = activeCategory === 'all' || remedy.categoryId === activeCategory;
    const matchesSearch = remedy.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         remedy.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryNameById = (id: string): string => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-ayur-cream/30 py-10">
        <div className="ayur-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-ayur-green mb-2">
                Ayurvedic Remedies
              </h1>
              <p className="text-muted-foreground">
                Explore traditional remedies for common ailments curated by our community
              </p>
            </div>
            
            <Button asChild className="bg-ayur-green hover:bg-ayur-green/90 self-start">
              <Link to="/create-post" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Share Remedy
              </Link>
            </Button>
          </div>
          
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-3">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <CardTitle>Find Remedies</CardTitle>
                </div>
                <CardDescription>
                  Search for specific remedies or browse by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="search" className="sr-only">Search</Label>
                      <Input 
                        id="search"
                        placeholder="Search remedies..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Label>Category:</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-1">
                <Button
                  variant={activeCategory === 'all' ? 'default' : 'ghost'} 
                  className="justify-start h-auto py-1.5"
                  onClick={() => setActiveCategory('all')}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'ghost'} 
                    className="justify-start h-auto py-1.5"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-80">
                  <CardHeader className="animate-pulse bg-muted/50 h-20" />
                  <CardContent className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredRemedies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-ayur-green/40 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">No Remedies Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any remedies matching your search criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRemedies.map((remedy) => (
                <Card key={remedy.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="font-serif text-lg">{remedy.title}</CardTitle>
                      {remedy.isExpertVerified && (
                        <div className="bg-ayur-sage-light text-ayur-green-dark text-xs px-2 py-1 rounded-full flex items-center">
                          <VerifiedIcon className="h-3 w-3 mr-1" />
                          Expert Verified
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-sm">{remedy.description}</CardDescription>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-ayur-brown">
                        {getCategoryNameById(remedy.categoryId)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm text-ayur-brown">Ingredients:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {remedy.ingredients.slice(0, 3).map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                        {remedy.ingredients.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{remedy.ingredients.length - 3} more
                          </li>
                        )}
                      </ul>
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
                      <span>
                        {formatDistanceToNow(new Date(remedy.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Remedies;
