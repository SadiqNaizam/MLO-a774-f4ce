import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">StockApp</h3>
            <p className="text-sm text-muted-foreground">Your modern platform for stock market insights.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/watchlist" className="text-sm text-foreground hover:text-primary">Watchlist</Link></li>
              <li><Link to="/about" className="text-sm text-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
             <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Follow Us</h3>
             <div className="flex space-x-4">
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></a>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin className="h-5 w-5" /></a>
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><span className="sr-only">GitHub</span><Github className="h-5 w-5" /></a>
             </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} StockApp. All rights reserved. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;