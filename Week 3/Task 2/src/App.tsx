import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleRoute } from './components/RoleRoute';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            {/* Protected Routes (requires authentication) */}
            <Route element={<ProtectedRoute />}>
              
              {/* Role-based Route for Users */}
              <Route element={<RoleRoute requiredRole="user" />}>
                <Route path="dashboard" element={<UserDashboard />} />
              </Route>
              
              {/* Role-based Route for Admins */}
              <Route element={<RoleRoute requiredRole="admin" />}>
                <Route path="admin" element={<AdminDashboard />} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
