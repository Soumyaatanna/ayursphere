
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getTags } from '@/services/dataService';
import { Tag } from '@/models/types';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const allTags = getTags();
        setTags(allTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTags();
  }, []);

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
              Ayurvedic Tags
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mb-8">
              Browse our collection of remedies by specific tags to find exactly what you're looking for in the world of Ayurveda.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="ayur-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                Array(10).fill(0).map((_, index) => (
                  <div key={index} className="h-28 bg-muted animate-pulse rounded-lg"></div>
                ))
              ) : (
                tags.map(tag => (
                  <Link key={tag.id} to={`/tags/${tag.slug}`}>
                    <Card className="h-full hover:border-ayur-green/50 transition-colors hover:shadow-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-serif">{tag.name}</CardTitle>
                          <TagIcon className="h-4 w-4 text-ayur-green" />
                        </div>
                        <CardDescription>
                          Browse related remedies
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tags;
