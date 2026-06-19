import { useQuery } from '@tanstack/react-query';
import type { CryptoApiResponse, CryptoData } from '../types';

async function fetchCrypto(coinId: string): Promise<CryptoData> {
  const url = new URL(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`);
  url.searchParams.append('vs_currency', 'usd');
  url.searchParams.append('days', '30');
  
  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status} (Make sure the Coin ID is correct)`);
  }
  
  const data = (await response.json()) as CryptoApiResponse;
  
  return {
    coinId,
    prices: data.prices,
    total_volumes: data.total_volumes,
    fetchedAt: new Date(),
  };
}

export function useCrypto(coinId: string) {
  return useQuery({
    queryKey: ['crypto', coinId],
    queryFn: () => fetchCrypto(coinId),
    enabled: coinId !== '',
  });
}
