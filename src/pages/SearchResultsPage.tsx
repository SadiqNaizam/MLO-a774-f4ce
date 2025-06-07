import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import StockListItem from '@/components/StockListItem';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


interface SearchResultItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  linkTo: string;
}

const allPossibleResults: SearchResultItem[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 1.12, changePercent: 0.66, linkTo: '/stock/AAPL' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.11, change: -2.05, changePercent: -0.49, linkTo: '/stock/MSFT' },
    { symbol: 'GOOGL', name: 'Alphabet Inc. Class A', price: 155.78, change: 0.90, changePercent: 0.58, linkTo: '/stock/GOOGL' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 180.22, change: 1.50, changePercent: 0.84, linkTo: '/stock/AMZN' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 180.75, change: 8.10, changePercent: 4.69, linkTo: '/stock/TSLA' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 900.50, change: 45.20, changePercent: 5.30, linkTo: '/stock/NVDA' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', price: 500.00, change: -5.00, changePercent: -0.99, linkTo: '/stock/META' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 200.10, change: 0.75, changePercent: 0.38, linkTo: '/stock/JPM' },
    { symbol: 'V', name: 'Visa Inc.', price: 280.60, change: 1.20, changePercent: 0.43, linkTo: '/stock/V' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 150.45, change: -0.50, changePercent: -0.33, linkTo: '/stock/JNJ' },
];

const ITEMS_PER_PAGE = 5;

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [currentSearchTerm, setCurrentSearchTerm] = useState(query);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(`SearchResultsPage loaded for query: ${query}`);
    if (query) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredResults = allPossibleResults.filter(
          item => item.symbol.toLowerCase().includes(query.toLowerCase()) ||
                  item.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setCurrentPage(1); // Reset to first page on new search
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSearchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(currentSearchTerm.trim())}`);
    }
  };

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex mb-4">
            <Input
              type="search"
              placeholder="Search stocks (e.g., AAPL, Microsoft)"
              className="text-lg p-4 rounded-r-none"
              value={currentSearchTerm}
              onChange={(e) => setCurrentSearchTerm(e.target.value)}
              aria-label="Search stocks"
            />
            <Button type="submit" size="lg" className="rounded-l-none" aria-label="Search">
              <Search className="h-6 w-6" />
            </Button>
          </form>
          {query && (
            <h1 className="text-2xl font-semibold text-foreground text-center">
              Search Results for "{query}"
            </h1>
          )}
        </section>

        {isLoading ? (
            <div className="text-center text-muted-foreground">Loading results...</div>
        ) : results.length === 0 && query ? (
            <Card className="text-center">
                <CardHeader><CardTitle>No Results Found</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        We couldn't find any stocks matching "{query}". Please try a different search term.
                    </p>
                     <img src="https://via.placeholder.com/300x200.png?text=No+Results" alt="No results illustration" className="mx-auto mt-4 opacity-50" />
                </CardContent>
            </Card>
        ) : paginatedResults.length > 0 ? (
          <>
            <section className="space-y-4 mb-8">
              {paginatedResults.map(stock => (
                <StockListItem key={stock.symbol} {...stock} />
              ))}
            </section>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} 
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => {
                     // Basic logic to show limited page numbers
                    if (totalPages <= 5 || i === 0 || i === totalPages - 1 || Math.abs(i - (currentPage - 1)) <= 1) {
                       return (
                        <PaginationItem key={i}>
                            <PaginationLink 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                                isActive={currentPage === i + 1}
                            >
                            {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                        );
                    } else if (Math.abs(i - (currentPage-1)) === 2) { // Show ellipsis
                        return <PaginationEllipsis key={`ellipsis-${i}`} />;
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          !query && <p className="text-center text-muted-foreground">Please enter a search term to find stocks.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;