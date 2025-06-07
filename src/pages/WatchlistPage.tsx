import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import StockListItem from '@/components/StockListItem';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  linkTo: string;
}

const initialWatchlistItems: WatchlistItem[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 1.12, changePercent: 0.66, linkTo: '/stock/AAPL' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.11, change: -2.05, changePercent: -0.49, linkTo: '/stock/MSFT' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 155.78, change: 0.90, changePercent: 0.58, linkTo: '/stock/GOOGL' },
];

const WatchlistPage: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [newStockSymbol, setNewStockSymbol] = useState('');

  useEffect(() => {
    console.log('WatchlistPage loaded');
    // Simulate fetching watchlist from storage/API
    setWatchlist(initialWatchlistItems);
  }, []);

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStockSymbol.trim() === '') return;

    // Simulate fetching stock data and adding to watchlist
    const mockStockData = {
      symbol: newStockSymbol.toUpperCase(),
      name: `${newStockSymbol.toUpperCase()} Company`, // Placeholder name
      price: parseFloat((Math.random() * 500 + 20).toFixed(2)),
      change: parseFloat(((Math.random() - 0.5) * 10).toFixed(2)),
      changePercent: parseFloat(((Math.random() - 0.5) * 5).toFixed(2)),
      linkTo: `/stock/${newStockSymbol.toUpperCase()}`
    };

    if (!watchlist.find(item => item.symbol === mockStockData.symbol)) {
      setWatchlist(prev => [...prev, mockStockData]);
    }
    setNewStockSymbol('');
    console.log(`Attempted to add ${newStockSymbol.toUpperCase()} to watchlist.`);
  };

  const handleRemoveStock = (symbolToRemove: string) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbolToRemove));
    console.log(`Removed ${symbolToRemove} from watchlist.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Watchlist</h1>
        </header>

        <section className="mb-8">
          <form onSubmit={handleAddStock} className="flex gap-2 max-w-md mb-4">
            <Input
              type="text"
              placeholder="Enter stock symbol (e.g., TSLA)"
              value={newStockSymbol}
              onChange={(e) => setNewStockSymbol(e.target.value)}
              aria-label="Add stock to watchlist"
            />
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Stock
            </Button>
          </form>
        </section>

        {watchlist.length === 0 ? (
          <Card className="text-center">
            <CardHeader>
                <CardTitle>Your Watchlist is Empty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Add stocks using the form above to start tracking.</p>
              <img src="https://via.placeholder.com/300x200.png?text=Empty+Watchlist" alt="Empty watchlist illustration" className="mx-auto mt-4 opacity-50" />
            </CardContent>
          </Card>
        ) : (
          <section className="space-y-4">
            {watchlist.map(stock => (
              <div key={stock.symbol} className="flex items-center gap-2">
                <div className="flex-grow">
                    <StockListItem {...stock} />
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveStock(stock.symbol)} aria-label={`Remove ${stock.symbol} from watchlist`}>
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default WatchlistPage;