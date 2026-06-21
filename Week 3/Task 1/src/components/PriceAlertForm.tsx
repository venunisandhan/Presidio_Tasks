import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the Zod schema for validation
const alertSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  targetPrice: z.number({
    message: "Target price must be a valid number",
  }).positive('Target price must be greater than 0'),
});

type AlertFormValues = z.infer<typeof alertSchema>;

interface PriceAlertFormProps {
  coinId: string;
}

export function PriceAlertForm({ coinId }: PriceAlertFormProps) {
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AlertFormValues>({
    resolver: zodResolver(alertSchema),
  });

  const onSubmit = async (data: AlertFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Alert set for:', coinId, data);
    
    setSuccessMessage(`Success! We'll email ${data.email} when ${coinId.toUpperCase()} reaches $${data.targetPrice}.`);
    reset();
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Set a Price Alert for {coinId.toUpperCase()}</h3>
      <p style={styles.description}>Get notified instantly when the coin hits your target.</p>
      
      {successMessage && <div style={styles.successAlert}>{successMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label htmlFor="email" style={styles.label}>Email Address</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            style={{
              ...styles.input,
              borderColor: errors.email ? '#ef4444' : '#d1d5db',
            }}
            placeholder="you@example.com"
          />
          {errors.email && <span style={styles.errorText}>{errors.email.message}</span>}
        </div>

        <div style={styles.fieldGroup}>
          <label htmlFor="targetPrice" style={styles.label}>Target Price (USD)</label>
          <input
            id="targetPrice"
            type="number"
            step="any"
            {...register('targetPrice', { valueAsNumber: true })}
            style={{
              ...styles.input,
              borderColor: errors.targetPrice ? '#ef4444' : '#d1d5db',
            }}
            placeholder="e.g. 50000"
          />
          {errors.targetPrice && <span style={styles.errorText}>{errors.targetPrice.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{
            ...styles.button,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Setting Alert...' : 'Create Alert'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0,0,0,0.05)',
    marginTop: '2rem',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.25rem',
    color: '#334155',
    fontWeight: 600,
  },
  description: {
    color: '#64748b',
    margin: '0 0 1.5rem 0',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
    maxWidth: '400px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.35rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#334155',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '6px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    marginTop: '0.5rem',
    transition: 'background-color 0.2s',
  },
  successAlert: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #bbf7d0',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  }
} as const;
