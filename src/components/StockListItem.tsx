import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockListItemProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string | number; // Optional
  marketCap?: string | number; // Optional
  linkTo?: string; // Optional link for the item
}

const StockListItem: React.FC<StockListItemProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  marketCap,
  linkTo,
}) => {
  console.log("Rendering StockListItem for:", symbol);
  const isPositiveChange = change >= 0;

  const content = (
    <div className="flex items-center justify-between p-4">
      <div className="flex-1 min-w-0">
        <p className="text-lg font-semibold text-foreground truncate">{symbol}</p>
        <p className="text-xs text-muted-foreground truncate">{name}</p>
      </div>
      <div className="text-right ml-4 flex-shrink-0">
        <p className="text-lg font-semibold text-foreground">${price.toFixed(2)}</p>
        <div className={cn("text-sm flex items-center justify-end", isPositiveChange ? "text-green-600" : "text-red-600")}>
          {isPositiveChange ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
          <span>{change.toFixed(2)} ({changePercent.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="block hover:no-underline">
        <Card className="hover:shadow-md transition-shadow duration-200">
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Card>
      {content}
    </Card>
  );
};
export default StockListItem;