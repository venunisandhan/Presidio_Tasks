import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircle, Settings, Activity, FileText } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Welcome back, {user?.username}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue"><Activity size={24} /></div>
          <div className="stat-content">
            <h3>Recent Activity</h3>
            <p className="stat-value">12 actions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green"><FileText size={24} /></div>
          <div className="stat-content">
            <h3>Documents</h3>
            <p className="stat-value">4 files</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-card">
          <h2>Profile Information</h2>
          <div className="profile-details">
            <div className="profile-avatar">
              <UserCircle size={64} />
            </div>
            <div className="profile-info">
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>Role:</strong> {user?.role}</p>
              <p><strong>User ID:</strong> {user?.id}</p>
            </div>
          </div>
        </div>
        
        <div className="content-card">
          <div className="card-header">
            <h2>Account Settings</h2>
            <Settings size={20} className="text-muted" />
          </div>
          <p className="text-muted">Standard user settings and preferences are accessible here.</p>
          <button className="btn-secondary mt-4">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};
