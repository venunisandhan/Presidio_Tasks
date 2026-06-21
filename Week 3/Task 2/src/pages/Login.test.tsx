import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login';
import { AuthProvider } from '../context/AuthContext';

// Mock the react-router-dom navigate function
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays an error message for invalid credentials', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    // Verify error message is not initially present
    expect(screen.queryByText(/Invalid username or password/i)).not.toBeInTheDocument();

    // Find inputs and button
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    // Type invalid credentials
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

    // Submit form
    fireEvent.click(submitButton);

    // Verify error message is displayed
    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
    
    // Verify navigate was NOT called
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
