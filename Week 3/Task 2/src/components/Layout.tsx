import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, User, Shield } from 'lucide-react';

export const Layout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <Shield className="brand-icon" />
          <span>AuthDemo</span>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link"><Home size={18} /> Home</Link>
          {isAuthenticated && (
            <>
              {user?.role === 'admin' ? (
                 <Link to="/admin" className="nav-link"><Shield size={18} /> Admin</Link>
              ) : (
                 <Link to="/dashboard" className="nav-link"><User size={18} /> Dashboard</Link>
              )}
            </>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-badge">{user?.username} ({user?.role})</span>
              <button onClick={handleLogout} className="btn-logout">
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary-sm">Sign In</Link>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} AuthDemo. Task 2 implementation.</p>
      </footer>
    </div>
  );
};
