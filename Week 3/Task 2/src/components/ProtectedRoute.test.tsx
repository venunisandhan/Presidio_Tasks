import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Mock the useAuth hook to return unauthenticated
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

describe('ProtectedRoute Component', () => {
  it('redirects unauthenticated users to the login page', () => {
    let testLocation: Location | undefined;

    // We use a component that captures the current location for verification
    const LocationCapture = () => {
      // In MemoryRouter, we can just grab window.location or use useLocation
      // But it's easier to verify the rendered text of the route we landed on
      return null;
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page Redirected</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Should NOT see protected content
    expect(() => getByText('Protected Content')).toThrow();
    
    // Should see the login page content, proving redirect happened
    expect(getByText('Login Page Redirected')).toBeInTheDocument();
  });
});
