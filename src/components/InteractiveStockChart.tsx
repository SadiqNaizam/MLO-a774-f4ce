import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { format, subDays, subMonths, subYears } from 'date-fns';

// Define the structure for a single data point in the chart
interface StockDataPoint {
  date: number; // Unix timestamp (milliseconds)
  price: number; // Closing price
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
}

interface InteractiveStockChartProps {
  data: StockDataPoint[]; // Array of data points for the chart
  symbol: string;
  isLoading?: boolean;
}

type TimeRange = '1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL';

const InteractiveStockChart: React.FC<InteractiveStockChartProps> = ({
  data,
  symbol,
  isLoading = false,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');

  console.log(`Rendering InteractiveStockChart for ${symbol}, time range: ${timeRange}, data points: ${data.length}`);

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '1D':
        startDate = subDays(now, 1);
        break;
      case '5D':
        startDate = subDays(now, 5);
        break;
      case '1M':
        startDate = subMonths(now, 1);
        break;
      case '6M':
        startDate = subMonths(now, 6);
        break;
      case '1Y':
        startDate = subYears(now, 1);
        break;
      case 'ALL':
      default:
        return data.sort((a, b) => a.date - b.date);
    }
    return data.filter(d => d.date >= startDate.getTime()).sort((a, b) => a.date - b.date);
  }, [data, timeRange]);

  const formatXAxisTick = (timestamp: number) => {
    if (timeRange === '1D') return format(new Date(timestamp), 'HH:mm');
    if (timeRange === '5D' || timeRange === '1M') return format(new Date(timestamp), 'MMM d');
    return format(new Date(timestamp), 'MMM yy');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as StockDataPoint;
      return (
        <div className="bg-background border p-3 shadow-lg rounded-md text-sm">
          <p className="font-semibold">{format(new Date(point.date), 'PPpp')}</p>
          <p className="text-primary">Price: ${point.price.toFixed(2)}</p>
          {point.open && <p>Open: ${point.open.toFixed(2)}</p>}
          {point.high && <p>High: ${point.high.toFixed(2)}</p>}
          {point.low && <p>Low: ${point.low.toFixed(2)}</p>}
          {point.volume && <p>Volume: {point.volume.toLocaleString()}</p>}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <div className="h-[400px] flex items-center justify-center bg-muted rounded-md text-muted-foreground">Loading chart data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="h-[400px] flex items-center justify-center bg-muted rounded-md text-muted-foreground">No data available for {symbol}.</div>;
  }
  
  const firstPrice = filteredData.length > 0 ? filteredData[0].price : 0;
  const lastPrice = filteredData.length > 0 ? filteredData[filteredData.length - 1].price : 0;
  const chartColor = lastPrice >= firstPrice ? '#22c55e' : '#ef4444'; // Green for up, Red for down

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-card p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">{symbol} Chart</h3>
        <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value: TimeRange) => { if (value) setTimeRange(value); }}
            aria-label="Time range"
            className="space-x-1"
            size="sm"
        >
            {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as TimeRange[]).map(range => (
                <ToggleGroupItem key={range} value={range} aria-label={range} className="px-3 py-1.5">
                    {range}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
      </div>
      {filteredData.length === 0 && !isLoading ? (
         <div className="h-[calc(100%-4rem)] flex items-center justify-center text-muted-foreground">
            No data available for the selected range.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={filteredData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.1}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
                dataKey="date"
                tickFormatter={formatXAxisTick}
                minTickGap={30}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                orientation="left"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                fillOpacity={1}
                fill="url(#chartGradient)"
                strokeWidth={2}
                name={symbol}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, fill: chartColor, stroke: 'hsl(var(--background))' }}
            />
            </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default InteractiveStockChart;