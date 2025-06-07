import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoscroll from 'embla-carousel-auto-scroll'; // Correct import path for the plugin
import { cn } from '@/lib/utils';

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockTickerTapeProps {
  items: TickerItem[];
  speed?: number; // Control scroll speed
}

const StockTickerTape: React.FC<StockTickerTapeProps> = ({ items, speed = 1 }) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, containScroll: 'trimSnaps' },
    [Autoscroll({ playOnInit: true, stopOnInteraction: false, speed: speed })]
  );

  console.log("Rendering StockTickerTape with items:", items.length);

  if (!items || items.length === 0) {
    return <div className="bg-secondary text-secondary-foreground p-2 text-center text-sm">Loading ticker data...</div>;
  }

  // Duplicate items for seamless looping if not enough items
  const displayItems = items.length < 10 ? [...items, ...items, ...items] : items;


  return (
    <div className="embla-ticker bg-secondary text-secondary-foreground overflow-hidden py-2 whitespace-nowrap">
      <div className="embla-ticker__viewport" ref={emblaRef}>
        <div className="embla-ticker__container flex">
          {displayItems.map((item, index) => (
            <div key={index} className="embla-ticker__slide px-4 text-sm">
              <span className="font-semibold">{item.symbol}</span>
              <span className="ml-2">${item.price.toFixed(2)}</span>
              <span
                className={cn(
                  "ml-2",
                  item.change >= 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockTickerTape;