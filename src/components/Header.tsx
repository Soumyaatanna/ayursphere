
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search, Menu, User, FileText, LogOut, Settings, Flower, Bot } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white border-b border-ayur-sage/30 sticky top-0 z-50">
      <div className="ayur-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="mr-2 w-8 h-8 bg-ayur-green rounded-full flex items-center justify-center">
                <Flower className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold text-ayur-green">Ayur<span className="text-ayur-brown">Sphere</span></span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-ayur-green transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-foreground hover:text-ayur-green transition-colors">
              Categories
            </Link>
            <Link to="/consultations" className="text-foreground hover:text-ayur-green transition-colors">
              Consultations
            </Link>
            <Link to="/remedies" className="text-foreground hover:text-ayur-green transition-colors">
              Remedies
            </Link>
            <Link to="/tags" className="text-foreground hover:text-ayur-green transition-colors">
              Tags
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search remedies..."
                className="w-48 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>

            {currentUser ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/create-post">
                    <FileText className="mr-2 h-4 w-4" />
                    New Post
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                      <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    
                    {currentUser.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-center">
                  <div className="mr-2 w-7 h-7 bg-ayur-green rounded-full flex items-center justify-center">
                    <Flower className="h-4 w-4 text-white" />
                  </div>
                  <span>AyurSphere</span>
                </SheetTitle>
                <SheetDescription>
                  Share & Explore Ayurvedic Wisdom
                </SheetDescription>
              </SheetHeader>
              
              <form onSubmit={handleSearch} className="relative mt-6">
                <Input
                  type="search"
                  placeholder="Search remedies..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Button type="submit" className="mt-2 w-full">Search</Button>
              </form>
              
              <div className="flex flex-col space-y-3 mt-6">
                <Link to="/" className="text-foreground hover:text-ayur-green transition-colors">
                  Home
                </Link>
                <Link to="/categories" className="text-foreground hover:text-ayur-green transition-colors">
                  Categories
                </Link>
                <Link to="/consultations" className="text-foreground hover:text-ayur-green transition-colors">
                  Consultations
                </Link>
                <Link to="/remedies" className="text-foreground hover:text-ayur-green transition-colors">
                  Remedies
                </Link>
                <Link to="/tags" className="text-foreground hover:text-ayur-green transition-colors">
                  Tags
                </Link>
                <Link to="/chatbot" className="text-foreground hover:text-ayur-green transition-colors flex items-center">
                  <Bot className="h-4 w-4 mr-1" /> Chat with AyurBot
                </Link>
                <Link to="/about" className="text-foreground hover:text-ayur-green transition-colors">
                  About
                </Link>
              </div>
              
              <div className="flex flex-col space-y-2 mt-6">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar>
                        <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                        <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{currentUser.username}</p>
                        <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" asChild className="justify-start">
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    
                    <Button variant="outline" asChild className="justify-start">
                      <Link to="/create-post">
                        <FileText className="mr-2 h-4 w-4" />
                        New Post
                      </Link>
                    </Button>
                    
                    {currentUser.role === 'admin' && (
                      <Button variant="outline" asChild className="justify-start">
                        <Link to="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </Button>
                    )}
                    
                    <Button variant="outline" className="justify-start" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
