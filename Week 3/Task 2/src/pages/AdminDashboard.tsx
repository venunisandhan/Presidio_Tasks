import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Users, Database, Server } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container admin-theme">
      <div className="dashboard-header">
        <div className="flex-align-center">
          <ShieldAlert className="mr-2 text-primary" size={32} />
          <h1>Admin Portal</h1>
        </div>
        <p>System Overview & Management - Logged in as {user?.username}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-purple"><Users size={24} /></div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">1,248</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange"><Database size={24} /></div>
          <div className="stat-content">
            <h3>Database Load</h3>
            <p className="stat-value">42%</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-red"><Server size={24} /></div>
          <div className="stat-content">
            <h3>Server Status</h3>
            <p className="stat-value status-healthy">Healthy</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content full-width">
        <div className="content-card">
          <h2>System Logs</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Event</th>
                  <th>User ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2026-06-21 10:45:12</td>
                  <td>User Login</td>
                  <td>USR-892</td>
                  <td><span className="badge badge-success">Success</span></td>
                </tr>
                <tr>
                  <td>2026-06-21 10:42:05</td>
                  <td>Failed Login Attempt</td>
                  <td>UNKNOWN</td>
                  <td><span className="badge badge-error">Failed</span></td>
                </tr>
                <tr>
                  <td>2026-06-21 10:30:22</td>
                  <td>Role Updated</td>
                  <td>USR-115</td>
                  <td><span className="badge badge-info">Info</span></td>
                </tr>
                <tr>
                  <td>2026-06-21 10:15:00</td>
                  <td>System Backup</td>
                  <td>SYSTEM</td>
                  <td><span className="badge badge-success">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
