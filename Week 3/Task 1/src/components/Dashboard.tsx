

import { useMemo } from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { useWeather } from '../hooks/useWeather';
import { WeatherCharts } from './WeatherCharts';
import { AddLocationForm } from './AddLocationForm';

export function Dashboard() {
  const locations = useWeatherStore((state) => state.locations);
  const selectedLocationIndex = useWeatherStore(
    (state) => state.selectedLocationIndex
  );
  const selectLocation = useWeatherStore((state) => state.selectLocation);
  const removeLocation = useWeatherStore((state) => state.removeLocation);

  const selectedLocation = locations[selectedLocationIndex];

  // Fetch weather for selected location
  const { data: weatherData, isLoading, error } = useWeather(
    selectedLocation?.latitude ?? 0,
    selectedLocation?.longitude ?? 0
  );

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <header style={styles.header}>
        <h1>🌤️ Weather Dashboard</h1>
      </header>

      <div style={styles.container}>
        {/* Left Sidebar: Form + Location List */}
        <aside style={styles.sidebar}>
          <AddLocationForm />

          {/* Locations List */}
          {locations.length > 0 && (
            <div style={styles.locationsList}>
              <h3>Saved Locations</h3>
              {locations.map((location, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.locationItem,
                    backgroundColor:
                      index === selectedLocationIndex ? '#e3f2fd' : '#fff',
                    borderLeft:
                      index === selectedLocationIndex
                        ? '4px solid #007bff'
                        : 'none',
                  }}
                >
                  <div
                    onClick={() => selectLocation(index)}
                    style={styles.locationName}
                  >
                    {location.location}
                  </div>
                  <button
                    onClick={() => removeLocation(index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Main Content: Charts */}
        <main style={styles.main}>
          {!selectedLocation ? (
            <div style={styles.placeholder}>
              <p>Add a location to see weather data</p>
            </div>
          ) : isLoading ? (
            <div style={styles.placeholder}>
              <p>Loading weather data...</p>
            </div>
          ) : error ? (
            <div style={styles.error}>
              <p>Error: {error.message}</p>
            </div>
          ) : weatherData ? (
            <WeatherCharts data={weatherData} />
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
  container: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
  },
  locationsList: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  locationItem: {
    padding: '1rem',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ddd',
    transition: 'all 0.2s ease',
  },
  locationName: {
    flex: 1,
    cursor: 'pointer',
    fontWeight: 500,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
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