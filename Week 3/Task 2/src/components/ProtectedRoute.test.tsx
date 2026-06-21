import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';


vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

describe('ProtectedRoute Component', () => {
  it('redirects unauthenticated users to the login page', () => {
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

  it('INTENTIONAL FAILURE: shows protected content for unauthenticated users', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page Redirected</div>} />
        </Routes>
      </MemoryRouter>
    );

    // This assertion is intentionally incorrect and should fail
    expect(queryByText('Protected Content')).toBeInTheDocument();
  });
});
