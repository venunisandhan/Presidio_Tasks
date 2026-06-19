import { create } from 'zustand';

interface CryptoStore {
  selectedCoinId: string;
  setSelectedCoinId: (coinId: string) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  selectedCoinId: '',
  setSelectedCoinId: (coinId: string) => set({ selectedCoinId: coinId }),
}));
