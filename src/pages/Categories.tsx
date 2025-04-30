
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/services/dataService';
import { Category } from '@/models/types';
import { ArrowLeft } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const allCategories = getCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
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
              Ayurvedic Categories
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mb-8">
              Explore our collection of Ayurvedic remedies organized by health categories. Each category contains traditional wisdom for specific health concerns.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="ayur-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <div key={index} className="h-64 bg-muted animate-pulse rounded-lg"></div>
                ))
              ) : (
                categories.map(category => (
                  <CategoryCard key={category.id} category={category} />
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

export default Categories;
