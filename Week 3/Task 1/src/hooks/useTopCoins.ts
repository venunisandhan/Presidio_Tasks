import { useQuery } from '@tanstack/react-query';
import type { TopCoin } from '../types';

async function fetchTopCoins(): Promise<TopCoin[]> {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`CoinGecko Top Coins API error: ${response.status}`);
  }
  
  return response.json();
}

export function useTopCoins() {
  return useQuery({
    queryKey: ['topCoins'],
    queryFn: fetchTopCoins,
    staleTime: 5 * 60 * 1000,
  });
}
