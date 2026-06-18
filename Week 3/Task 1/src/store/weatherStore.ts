

import { create } from 'zustand';
import type { WeatherData } from '../types';


interface WeatherStore {

  locations: WeatherData[];
  selectedLocationIndex: number;
  

  addLocation: (location: WeatherData) => void;
  removeLocation: (index: number) => void;
  selectLocation: (index: number) => void;
}


export const useWeatherStore = create<WeatherStore>((set) => ({
  locations: [],
  selectedLocationIndex: 0,
  
  
  addLocation: (location: WeatherData) => 
    set((state) => ({
      // Return new state
      locations: [...state.locations, location],
    })),
  
  
  removeLocation: (index: number) =>
    set((state) => ({
      locations: state.locations.filter((_, i) => i !== index),
      selectedLocationIndex: 
        index === state.selectedLocationIndex ? 0 : state.selectedLocationIndex,
    })),
  
  selectLocation: (index: number) =>
    set({ selectedLocationIndex: index }),
}));

