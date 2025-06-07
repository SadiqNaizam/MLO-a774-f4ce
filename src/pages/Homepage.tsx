import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import StockTickerTape from '@/components/StockTickerTape';
import StockListItem from '@/components/StockListItem';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const placeholderTickerItems = [
  { symbol: 'DJIA', price: 39000.50, change: 150.25, changePercent: 0.39 },
  { symbol: 'S&P 500', price: 5200.75, change: -20.10, changePercent: -0.38 },
  { symbol: 'NASDAQ', price: 16500.00, change: 75.50, changePercent: 0.46 },
  { symbol: 'AAPL', price: 170.34, change: 1.12, changePercent: 0.66 },
  { symbol: 'MSFT', price: 420.11, change: -2.05, changePercent: -0.49 },
  { symbol: 'GOOGL', price: 155.78, change: 0.90, changePercent: 0.58 },
];

const placeholderTopGainers = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 900.50, change: 45.20, changePercent: 5.30, linkTo: '/stock/NVDA' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 180.75, change: 8.10, changePercent: 4.69, linkTo: '/stock/TSLA' },
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', price: 175.00, change: 7.50, changePercent: 4.48, linkTo: '/stock/AMD' },
];

const placeholderTopLosers = [
  { symbol: 'PFE', name: 'Pfizer Inc.', price: 25.50, change: -1.20, changePercent: -4.50, linkTo: '/stock/PFE' },
  { symbol: 'INTC', name: 'Intel Corporation', price: 30.15, change: -1.05, changePercent: -3.37, linkTo: '/stock/INTC' },
  { symbol: 'DIS', name: 'The Walt Disney Company', price: 100.80, change: -2.50, changePercent: -2.42, linkTo: '/stock/DIS' },
];

const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <StockTickerTape items={placeholderTickerItems} speed={1} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Prominent Search Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Find Your Next Investment</h1>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Search for stocks, ETFs, and more. Get real-time data and insights to make informed decisions.
          </p>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex">
            <Input
              type="search"
              placeholder="Search stocks (e.g., AAPL, Microsoft)"
              className="text-lg p-4 rounded-r-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search stocks"
            />
            <Button type="submit" size="lg" className="rounded-l-none" aria-label="Search">
              <Search className="h-6 w-6" />
            </Button>
          </form>
        </section>

        {/* Top Gainers and Losers Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Top Gainers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {placeholderTopGainers.map(stock => (
                <StockListItem key={stock.symbol} {...stock} />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Top Losers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {placeholderTopLosers.map(stock => (
                <StockListItem key={stock.symbol} {...stock} />
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Market News/Highlights (Placeholder) */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center text-foreground">Market Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <img src={`https://via.placeholder.com/400x200.png?text=Market+News+${index + 1}`} alt={`Market News ${index + 1}`} className="rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-2">Major Index Hits Record High</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Stocks rallied today as investors reacted positively to new economic data. The Dow Jones Industrial Average closed up 200 points...
                  </p>
                  <Button variant="link" className="p-0 mt-2">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;