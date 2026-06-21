import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to AuthDemo</h1>
        <p className="subtitle">A secure React Router implementation with role-based access control.</p>
        
        {!isAuthenticated ? (
          <div className="action-buttons">
            <Link to="/login" className="btn-primary">Sign In</Link>
          </div>
        ) : (
          <div className="welcome-banner">
            <p>Welcome back, <strong>{user?.username}</strong>! You are logged in as <strong>{user?.role}</strong>.</p>
            <div className="action-buttons">
              {user?.role === 'admin' ? (
                <Link to="/admin" className="btn-primary">Go to Admin Dashboard</Link>
              ) : (
                <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <Shield className="feature-icon" size={32} />
          <h3>Protected Routes</h3>
          <p>Secure specific application views requiring users to authenticate before access is granted.</p>
        </div>
        <div className="feature-card">
          <Users className="feature-icon" size={32} />
          <h3>Role-Based Access</h3>
          <p>Differentiate user capabilities by assigning roles like 'admin' and 'user' to control content visibility.</p>
        </div>
        <div className="feature-card">
          <LayoutDashboard className="feature-icon" size={32} />
          <h3>Dynamic Dashboards</h3>
          <p>Provide tailored experiences and tools based on the authenticated user's assigned role.</p>
        </div>
      </div>
    </div>
  );
};
