

// This is what the API returns
export interface WeatherApiResponse {
  hourly: {
    time: string[];                    
    temperature_2m: number[];        
    precipitation: number[];          
  };
  latitude: number;
  longitude: number;
  timezone: string;
}

// This is what we store in our app
export interface WeatherData {
  location: string;
  latitude: number;
  longitude: number;
  temperatures: number[];
  precipitation: number[];
  times: string[];
  fetchedAt: Date;
}

// Form data when user adds a new location
export interface LocationFormData {
  locationName: string;
  latitude: number;
  longitude: number;
}

// Chart data format (what Chart.js expects)
export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
}