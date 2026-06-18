
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWeather } from '../hooks/useWeather';
import { useWeatherStore } from '../store/weatherStore';
import { useState } from 'react';

const locationSchema = z.object({
  locationName: z.string()
    .min(2, 'Location name must be at least 2 characters')
    .max(50, 'Location name must be less than 50 characters'),
  latitude: z.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

type LocationFormData = z.infer<typeof locationSchema>;

export function AddLocationForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const addLocation = useWeatherStore((state) => state.addLocation);

  
  const {
    register,    
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,         
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      locationName: '',
      latitude: 0,
      longitude: 0,
    },
  });

 
  async function onSubmit(formData: LocationFormData) {
    setSubmitError(null);

    try {
     
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${formData.latitude}&longitude=${formData.longitude}&hourly=temperature_2m,precipitation&timezone=auto`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      addLocation({
        location: formData.locationName,
        latitude: formData.latitude,
        longitude: formData.longitude,
        temperatures: data.hourly.temperature_2m,
        precipitation: data.hourly.precipitation,
        times: data.hourly.time,
        fetchedAt: new Date(),
      });

      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2>Add New Location</h2>

      {/* Location Name Input */}
      <div style={styles.formGroup}>
        <label htmlFor="locationName">Location Name *</label>
        <input
          id="locationName"
          type="text"
          placeholder="e.g., New York, London, Tokyo"
          {...register('locationName')} // Connect to React Hook Form
          style={{
            ...styles.input,
            borderColor: errors.locationName ? 'red' : '#ccc',
          }}
        />
        {/* Show error if validation failed */}
        {errors.locationName && (
          <span style={styles.error}>{errors.locationName.message}</span>
        )}
      </div>

      {/* Latitude Input */}
      <div style={styles.formGroup}>
        <label htmlFor="latitude">Latitude *</label>
        <input
          id="latitude"
          type="number"
          placeholder="-90 to 90"
          step="0.01"
          {...register('latitude', { valueAsNumber: true })}
          style={{
            ...styles.input,
            borderColor: errors.latitude ? 'red' : '#ccc',
          }}
        />
        {errors.latitude && (
          <span style={styles.error}>{errors.latitude.message}</span>
        )}
      </div>

      {/* Longitude Input */}
      <div style={styles.formGroup}>
        <label htmlFor="longitude">Longitude *</label>
        <input
          id="longitude"
          type="number"
          placeholder="-180 to 180"
          step="0.01"
          {...register('longitude', { valueAsNumber: true })}
          style={{
            ...styles.input,
            borderColor: errors.longitude ? 'red' : '#ccc',
          }}
        />
        {errors.longitude && (
          <span style={styles.error}>{errors.longitude.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          ...styles.button,
          opacity: isSubmitting ? 0.6 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? 'Adding...' : 'Add Location'}
      </button>

      {/* Submit Error */}
      {submitError && (
        <div style={styles.submitError}>{submitError}</div>
      )}
    </form>
  );
}


const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
  },
  formGroup: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '100%',
  },
  submitError: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem',
  },
} as const;