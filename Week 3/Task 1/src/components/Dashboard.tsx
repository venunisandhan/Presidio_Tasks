import { useEffect } from 'react';
import { useCryptoStore } from '../store/cryptoStore';
import { useCrypto } from '../hooks/useCrypto';
import { useTopCoins } from '../hooks/useTopCoins';
import { CryptoCharts } from './CryptoCharts';
import { PriceAlertForm } from './PriceAlertForm';

export function Dashboard() {
  const selectedCoinId = useCryptoStore((state) => state.selectedCoinId);
  const setSelectedCoinId = useCryptoStore((state) => state.setSelectedCoinId);

  const { data: topCoins, isLoading: isLoadingTopCoins } = useTopCoins();

  useEffect(() => {
    if (topCoins && topCoins.length > 0 && !selectedCoinId) {
      setSelectedCoinId(topCoins[0].id);
    }
  }, [topCoins, selectedCoinId, setSelectedCoinId]);

  const { data: cryptoData, isLoading: isLoadingCrypto, error } = useCrypto(selectedCoinId);

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1>📈 Crypto Dashboard</h1>
          
          <div style={styles.selectorContainer}>
            <label htmlFor="coinSelector" style={styles.label}>Select Coin:</label>
            <select
              id="coinSelector"
              value={selectedCoinId}
              onChange={(e) => setSelectedCoinId(e.target.value)}
              disabled={isLoadingTopCoins}
              style={styles.select}
            >
              {isLoadingTopCoins ? (
                <option value="">Loading...</option>
              ) : (
                topCoins?.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </header>

      <div style={styles.container}>
        <main style={styles.main}>
          {!selectedCoinId ? (
            <div style={styles.placeholder}>
              <p>Select a coin to see market data</p>
            </div>
          ) : isLoadingCrypto ? (
            <div style={styles.placeholder}>
              <p>Loading {selectedCoinId} data...</p>
            </div>
          ) : error ? (
            <div style={styles.error}>
              <p>Error: {error.message}</p>
            </div>
          ) : cryptoData ? (
            <>
              <CryptoCharts data={cryptoData} />
              <PriceAlertForm coinId={selectedCoinId} />
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '1rem',
  },
  selectorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  label: {
    fontWeight: 600,
    color: '#334155',
  },
  select: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    minWidth: '200px',
  },
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  main: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  placeholder: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    color: '#999',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    padding: '1rem',
    borderRadius: '4px',
  },
} as const;