import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Leaf, ShieldPlus } from 'lucide-react';
import { getApprovedPosts, getCategories } from '@/services/dataService';
import { Post, Category } from '@/models/types';

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const posts = getApprovedPosts();
        const allCategories = getCategories();
        
        // Sort posts by date (newest first)
        const sortedByDate = [...posts].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        // Sort posts by views (most viewed first)
        const sortedByViews = [...posts].sort((a, b) => b.views - a.views);
        
        setFeaturedPosts(sortedByViews.slice(0, 1));
        setRecentPosts(sortedByDate.slice(0, 6));
        setPopularPosts(sortedByViews.slice(0, 4));
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-ayur-cream to-ayur-sage/20 py-16">
          <div className="ayur-container">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ayur-green mb-4 leading-tight">
                Share & Explore Ayurvedic Wisdom
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8">
                Join our community dedicated to preserving and sharing traditional Ayurvedic remedies and practices for holistic wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/categories">Explore Remedies</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/register">Join Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Post Section */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="ayur-container">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold">
                  Featured Remedy
                </h2>
                <Button variant="ghost" asChild>
                  <Link to="/remedies" className="flex items-center">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {isLoading ? (
                  <div className="h-96 bg-muted animate-pulse rounded-lg"></div>
                ) : (
                  featuredPosts.map(post => (
                    <PostCard key={post.id} post={post} layout="large" />
                  ))
                )}
              </div>
            </div>
          </section>
        )}
        
        {/* Benefits Section */}
        <section className="py-16 bg-ayur-cream/50">
          <div className="ayur-container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Why Share Ayurvedic Knowledge?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ayurveda is a 5000-year-old system of natural healing that has its origins in the Vedic culture of India. Our community aims to preserve and share this ancient wisdom.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="w-12 h-12 bg-ayur-green/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-ayur-green" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Natural Remedies</h3>
                <p className="text-muted-foreground">
                  Discover plant-based, natural approaches to health that have been refined over thousands of years.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="w-12 h-12 bg-ayur-green/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldPlus className="h-6 w-6 text-ayur-green" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Preventative Approach</h3>
                <p className="text-muted-foreground">
                  Learn how Ayurveda focuses on preventing illness and maintaining health through lifestyle and diet.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="w-12 h-12 bg-ayur-green/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-ayur-green" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Ancient Wisdom</h3>
                <p className="text-muted-foreground">
                  Connect with traditional knowledge passed down through generations, backed by modern research.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent Posts Section */}
        <section className="py-16 bg-white">
          <div className="ayur-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">
                Recent Remedies
              </h2>
              <Button variant="ghost" asChild>
                <Link to="/remedies" className="flex items-center">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="h-80 bg-muted animate-pulse rounded-lg"></div>
                ))
              ) : (
                recentPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-ayur-sage/10">
          <div className="ayur-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">
                Browse by Category
              </h2>
              <Button variant="ghost" asChild>
                <Link to="/categories" className="flex items-center">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="h-60 bg-muted animate-pulse rounded-lg"></div>
                ))
              ) : (
                categories.slice(0, 3).map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))
              )}
            </div>
          </div>
        </section>
        
        {/* Popular Posts and Call to Action Section */}
        <section className="py-16 bg-white">
          <div className="ayur-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-serif text-2xl font-bold">
                    Popular Remedies
                  </h2>
                  <Button variant="ghost" asChild size="sm">
                    <Link to="/remedies">View all</Link>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {isLoading ? (
                    Array(4).fill(0).map((_, index) => (
                      <div key={index} className="h-24 bg-muted animate-pulse rounded-lg"></div>
                    ))
                  ) : (
                    popularPosts.map(post => (
                      <PostCard key={post.id} post={post} layout="compact" />
                    ))
                  )}
                </div>
              </div>
              
              <div className="bg-ayur-green/10 p-8 rounded-lg">
                <h2 className="font-serif text-2xl font-bold mb-4">
                  Share Your Knowledge
                </h2>
                <p className="text-muted-foreground mb-6">
                  Have a traditional remedy or Ayurvedic practice to share? Join our community and contribute to our collective wisdom.
                </p>
                <Button asChild>
                  <Link to="/register">Join the Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
