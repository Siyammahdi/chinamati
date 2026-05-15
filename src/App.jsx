import './App.css'
import Footer from './components/Footer'
import TopBar from './components/Home/TopBar'
import Navbar from './components/Navbar'
import MobileBottomNav from './components/MobileBottomNav'
import SmoothScroll from './components/SmoothScroll'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-neutral-500">Loading...</div>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/signin" replace />
  return children
}

function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <LoadingScreen />
  
  const isAdmin = profile?.role === 'admin'
  
  if (!user) return <Navigate to="/signin" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />
  
  return children
}

function AppRoutes() {
  const { user, profile, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  return (
    <div>
      <TopBar />
      <Navbar />
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route 
          path="/signup" 
          element={user ? <Navigate to={profile?.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <SignUp />} 
        />
        <Route 
          path="/signin" 
          element={user ? <Navigate to={profile?.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <SignIn />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
