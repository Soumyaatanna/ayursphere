
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/models/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${category.slug}`} className="block">
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow group">
        <div className="aspect-video overflow-hidden">
          {category.imageUrl && (
            <img 
              src={category.imageUrl} 
              alt={category.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        <CardHeader>
          <CardTitle className="font-serif text-xl group-hover:text-ayur-green transition-colors">
            {category.name}
          </CardTitle>
          <CardDescription>
            {category.description || `Explore natural Ayurvedic remedies for ${category.name.toLowerCase()}`}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            View remedies and articles
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CategoryCard;
