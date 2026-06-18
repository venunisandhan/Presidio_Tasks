

import { useQuery } from '@tanstack/react-query';
import type { WeatherApiResponse, WeatherData } from '../types';


async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  url.searchParams.append('hourly', 'temperature_2m,precipitation');
  url.searchParams.append('timezone', 'auto');
  
  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }
  
  const data = (await response.json()) as WeatherApiResponse;
  
  return {
    location: `${latitude}, ${longitude}`,
    latitude,
    longitude,
    temperatures: data.hourly.temperature_2m,
    precipitation: data.hourly.precipitation,
    times: data.hourly.time,
    fetchedAt: new Date(),
  };
}

/**
 * React Hook: useWeather
 * 
 * @param latitude - Location latitude
 * @param longitude - Location longitude
 * @returns Object with: data, isLoading, error
 */
export function useWeather(latitude: number, longitude: number) {

  return useQuery({

    queryKey: ['weather', latitude, longitude],
    
    queryFn: () => fetchWeather(latitude, longitude),
    
    enabled: latitude !== 0 && longitude !== 0,
  });
}

