import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import InteractiveStockChart from '@/components/InteractiveStockChart';
import Footer from '@/components/layout/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle, LineChart, Newspaper, Building2, Info } from 'lucide-react';

// Placeholder data generation functions
const generateStockData = (days: number) => {
  const data = [];
  let price = Math.random() * 200 + 50; // Start price
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    // Simulate daily price fluctuations more realistically
    const change = (Math.random() - 0.48) * (price * 0.03); // Max 3% change
    price += change;
    if (price < 5) price = 5; // Floor price

    const open = price - (Math.random() - 0.5) * (price * 0.01);
    const high = Math.max(price, open) + Math.random() * (price * 0.015);
    const low = Math.min(price, open) - Math.random() * (price * 0.015);
    const volume = Math.floor(Math.random() * 1000000) + 500000;
    
    data.push({
      date: date.getTime(),
      price: parseFloat(price.toFixed(2)),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume: volume
    });
  }
  return data;
};


const placeholderStockDetails = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 170.34,
  change: 1.12,
  changePercent: 0.66,
  marketCap: '2.6T',
  peRatio: 28.5,
  eps: 6.00,
  volume: '75M',
  avgVolume: '80M',
  high52Week: 199.62,
  low52Week: 164.08,
  dividendYield: '0.55%',
  beta: 1.29,
  companyProfile: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, and iPod touch. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store, that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts.",
};

const placeholderNews = [
  { id: 1, title: "Apple Unveils New iPhone Model", source: "Tech News Daily", date: "2024-09-10", summary: "Apple today announced its latest iPhone lineup with advanced features and improved performance.", link:"https://via.placeholder.com/150" },
  { id: 2, title: "Analysts Bullish on AAPL Ahead of Earnings", source: "MarketWatch", date: "2024-10-20", summary: "Several Wall Street analysts have upgraded Apple's stock rating, citing strong sales projections.", link:"https://via.placeholder.com/150" },
  { id: 3, title: "Apple Expands into New Service Sector", source: "Bloomberg", date: "2024-11-05", summary: "Sources report Apple is planning a major push into a new service category, potentially disrupting existing players.", link:"https://via.placeholder.com/150" },
];

const placeholderFinancials = [
    { metric: "Market Cap", value: "2.6T" },
    { metric: "P/E Ratio", value: "28.5" },
    { metric: "EPS (TTM)", value: "$6.00" },
    { metric: "Dividend Yield", value: "0.55%" },
    { metric: "Beta (5Y Monthly)", value: "1.29" },
    { metric: "52 Week High", value: "$199.62" },
    { metric: "52 Week Low", value: "$164.08" },
];

const StockDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [stockData, setStockData] = useState<any>(placeholderStockDetails);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`StockDetailPage loaded for symbol: ${symbol}`);
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, fetch data for `symbol`
      setStockData({ ...placeholderStockDetails, symbol: symbol || 'AAPL', name: `${symbol || 'Apple'} Inc.` });
      setChartData(generateStockData(365)); // Generate 1 year of data
      setIsInWatchlist(Math.random() > 0.5); // Randomly set if in watchlist
      setIsLoading(false);
    }, 1000);
  }, [symbol]);

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    console.log(`${symbol} ${!isInWatchlist ? 'added to' : 'removed from'} watchlist`);
  };

  if (isLoading) {
     return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <div className="flex-grow container mx-auto px-4 py-8 text-center">
          <p className="text-2xl text-muted-foreground">Loading stock data for {symbol}...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><RouterLink to="/">Home</RouterLink></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><RouterLink to="/search">Stocks</RouterLink></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{stockData.symbol}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground">{stockData.name} ({stockData.symbol})</h1>
              <div className="text-2xl font-semibold text-foreground mt-1">
                ${stockData.price?.toFixed(2)}
                <span className={`ml-2 text-lg ${stockData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stockData.change >= 0 ? '+' : ''}{stockData.change?.toFixed(2)} ({stockData.changePercent?.toFixed(2)}%)
                </span>
              </div>
            </div>
            <Button onClick={toggleWatchlist} variant={isInWatchlist ? "outline" : "default"} className="mt-4 sm:mt-0">
              {isInWatchlist ? <MinusCircle className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Button>
          </div>
        </header>
        
        <section className="mb-8">
          <InteractiveStockChart symbol={stockData.symbol} data={chartData} isLoading={isLoading} />
        </section>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="overview"><Info className="mr-2 h-4 w-4 inline-block"/>Overview</TabsTrigger>
            <TabsTrigger value="financials"><LineChart className="mr-2 h-4 w-4 inline-block"/>Financials</TabsTrigger>
            <TabsTrigger value="news"><Newspaper className="mr-2 h-4 w-4 inline-block"/>News</TabsTrigger>
            <TabsTrigger value="profile"><Building2 className="mr-2 h-4 w-4 inline-block"/>Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                  <div><strong>Market Cap:</strong> {stockData.marketCap}</div>
                  <div><strong>P/E Ratio (TTM):</strong> {stockData.peRatio}</div>
                  <div><strong>EPS (TTM):</strong> {stockData.eps}</div>
                  <div><strong>Volume:</strong> {stockData.volume}</div>
                  <div><strong>Avg. Volume:</strong> {stockData.avgVolume}</div>
                  <div><strong>52 Week High:</strong> ${stockData.high52Week}</div>
                  <div><strong>52 Week Low:</strong> ${stockData.low52Week}</div>
                  <div><strong>Dividend Yield:</strong> {stockData.dividendYield}</div>
                  <div><strong>Beta:</strong> {stockData.beta}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials">
            <Card>
              <CardHeader>
                <CardTitle>Financial Highlights</CardTitle>
                <CardDescription>Key financial metrics for {stockData.name}.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Metric</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {placeholderFinancials.map((item) => (
                      <TableRow key={item.metric}>
                        <TableCell className="font-medium">{item.metric}</TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {placeholderNews.map(newsItem => (
                  <Card key={newsItem.id}>
                    <CardHeader>
                      <CardTitle className="text-lg"><a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{newsItem.title}</a></CardTitle>
                      <CardDescription>{newsItem.source} - {newsItem.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{newsItem.summary}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{stockData.companyProfile}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default StockDetailPage;