
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Heart, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-ayur-sage/30 py-12">
      <div className="ayur-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-ayur-green">Ayur<span className="text-ayur-brown">Sphere</span></span>
            </Link>
            <p className="text-muted-foreground mb-4">
              A community platform for sharing and exploring traditional Ayurvedic wisdom, remedies, and health practices.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-ayur-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-ayur-green transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-ayur-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-ayur-green transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/tags" className="text-muted-foreground hover:text-ayur-green transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-ayur-green transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-ayur-green transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-ayur-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-ayur-green transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AyurSphere. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-ayur-red" /> for Ayurvedic wisdom
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
