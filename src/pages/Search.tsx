
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchPosts } from '@/services/dataService';
import { getCategories } from '@/services/dataService';
import { Post, Category } from '@/models/types';
import { ArrowLeft, Search as SearchIcon, Tag } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    // Load categories on component mount
    const loadCategories = async () => {
      const allCategories = getCategories();
      setCategories(allCategories);
    };
    
    loadCategories();
    
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  const performSearch = (query: string) => {
    setIsSearching(true);
    
    try {
      // Simulating API delay
      setTimeout(() => {
        const searchResults = searchPosts(query);
        setResults(searchResults);
        setIsSearching(false);
        setSearched(true);
      }, 500);
    } catch (error) {
      console.error('Error searching posts:', error);
      setIsSearching(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    
    if (searchQuery.trim()) {
      // Update URL search params
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleCategorySelect = (categorySlug: string) => {
    // Navigate to category directly
    window.location.href = `/categories/${categorySlug}`;
  };

  const filteredCategories = searchQuery.trim() 
    ? categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-ayur-cream/30">
        <section className="bg-gradient-to-br from-ayur-cream to-ayur-sage/20 py-16">
          <div className="ayur-container">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ayur-green mb-6">
              Search Remedies
            </h1>
            
            <div className="max-w-2xl relative">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search for Ayurvedic remedies, herbs, conditions..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.length > 0) {
                          setShowSuggestions(true);
                        } else {
                          setShowSuggestions(false);
                        }
                      }}
                      onFocus={handleInputFocus}
                    />
                  </div>
                  <Button type="submit" disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </form>
              
              {showSuggestions && filteredCategories.length > 0 && (
                <div className="absolute z-10 w-full bg-white rounded-md border mt-1 shadow-lg">
                  <Command>
                    <CommandList>
                      <CommandGroup heading="Suggested Categories">
                        {filteredCategories.slice(0, 5).map(category => (
                          <CommandItem 
                            key={category.id} 
                            onSelect={() => handleCategorySelect(category.slug)}
                            className="flex items-center cursor-pointer"
                          >
                            <Tag className="mr-2 h-4 w-4" />
                            <HoverCard>
                              <HoverCardTrigger>
                                <span>{category.name}</span>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-1">
                                  <h4 className="text-sm font-semibold">{category.name}</h4>
                                  <p className="text-xs text-muted-foreground">{category.description}</p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </CommandItem>
                        ))}
                        {filteredCategories.length > 5 && (
                          <CommandItem 
                            className="text-sm text-muted-foreground italic" 
                            disabled
                          >
                            And {filteredCategories.length - 5} more categories...
                          </CommandItem>
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="ayur-container">
            {searched && (
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2">
                  {isSearching ? (
                    'Searching...'
                  ) : results.length > 0 ? (
                    `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${initialQuery}"`
                  ) : (
                    `No results found for "${initialQuery}"`
                  )}
                </h2>
                {!isSearching && results.length === 0 && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Try using different keywords or browsing our <Link to="/categories" className="text-ayur-green hover:underline">categories</Link>.
                    </p>
                    
                    {categories.length > 0 && (
                      <div className="pt-4">
                        <h3 className="text-lg font-medium mb-3">Explore these categories instead:</h3>
                        <div className="flex flex-wrap gap-2">
                          {categories.slice(0, 8).map(category => (
                            <Button 
                              key={category.id} 
                              variant="outline" 
                              size="sm" 
                              asChild
                            >
                              <Link to={`/categories/${category.slug}`}>
                                {category.name}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="h-80 bg-muted animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
            
            {!isSearching && searched && results.length > 0 && (
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Looking for something specific? Try refining your search or explore by category.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/categories">Browse by Category</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/tags">Browse by Tag</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
