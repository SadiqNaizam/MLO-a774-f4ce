import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Menu, Search, X } from 'lucide-react'; // Icons

const NavigationMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  console.log("Rendering NavigationMenu");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Navigating to search results for:", searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input after navigation
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/watchlist', label: 'Watchlist' },
    // Add more links as needed
  ];

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Nav Links */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 font-bold text-xl text-primary">
              StockApp
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs ml-4">
            <form onSubmit={handleSearch} className="w-full flex">
              <Input
                type="search"
                placeholder="Search stocks (e.g., AAPL)"
                className="rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search stocks"
              />
              <Button type="submit" variant="default" className="rounded-l-none" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Auth Buttons & Mobile Menu Toggle */}
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-2 ml-4">
              {/* Placeholder for Login/Signup or User Profile */}
              <Link to="/auth">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="default">Sign Up</Button>
              </Link>
            </div>
            <div className="md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
             <form onSubmit={handleSearch} className="w-full flex px-4 mb-2">
              <Input
                type="search"
                placeholder="Search (e.g., AAPL)"
                className="rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search stocks mobile"
              />
              <Button type="submit" variant="default" className="rounded-l-none" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            <div className="px-4 flex justify-around">
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">Login</Button>
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavigationMenu;