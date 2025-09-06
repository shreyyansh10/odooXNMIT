import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <h1 className="nav-title">Hackathon Dashboard</h1>
          <div className="nav-actions">
            <span className="user-info">
              Welcome, {user?.firstName} {user?.lastName}
            </span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="welcome-section">
            <h2>Welcome to Your Dashboard!</h2>
            <p>You have successfully logged in to the hackathon authentication system.</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>User Information</h3>
              <div className="user-details">
                <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role || 'User'}</p>
                <p><strong>Status:</strong> <span className="status-active">Active</span></p>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-button primary">
                  Start New Project
                </button>
                <button className="action-button secondary">
                  View Profile
                </button>
                <button className="action-button secondary">
                  Settings
                </button>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">✅</span>
                  <span>Successfully logged in</span>
                  <span className="activity-time">Just now</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🔐</span>
                  <span>Account created</span>
                  <span className="activity-time">Today</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Security Status</h3>
              <div className="security-status">
                <div className="security-item">
                  <span className="security-icon">🛡️</span>
                  <span>JWT Authentication: Active</span>
                </div>
                <div className="security-item">
                  <span className="security-icon">🔒</span>
                  <span>Session: Secure</span>
                </div>
                <div className="security-item">
                  <span className="security-icon">✅</span>
                  <span>Password: Strong</span>
                </div>
              </div>
            </div>
          </div>

          <div className="integration-section">
            <h3>Ready for Integration</h3>
            <p>
              This authentication system is ready to be integrated into your hackathon project. 
              The JWT tokens are properly configured and the user context is available throughout your application.
            </p>
            <div className="integration-features">
              <div className="feature-item">
                <span className="feature-icon">🔑</span>
                <span>JWT Token Management</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span>Protected Routes</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👤</span>
                <span>User Context</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔄</span>
                <span>Auto Token Refresh</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
