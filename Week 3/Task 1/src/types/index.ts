export type CoinGeckoDataPoint = [number, number];

export interface CryptoApiResponse {
  prices: CoinGeckoDataPoint[];
  market_caps: CoinGeckoDataPoint[];
  total_volumes: CoinGeckoDataPoint[];
}

export interface CryptoData {
  coinId: string;
  prices: CoinGeckoDataPoint[];
  total_volumes: CoinGeckoDataPoint[];
  fetchedAt: Date;
}

export interface CoinFormData {
  coinId: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
}

export interface TopCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap: number;
}