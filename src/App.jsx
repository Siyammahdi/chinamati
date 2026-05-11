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
import SupabaseDemo from './pages/SupabaseDemo'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/signin" />
  return children
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  const isAdmin = user?.user_metadata?.is_admin === true
  if (!user || !isAdmin) return <Navigate to="/dashboard" />
  return children
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div>
            <TopBar />
            <Navbar />
            <SmoothScroll />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/supabase-demo" element={<SupabaseDemo />} />
            </Routes>
            <Footer />
            <MobileBottomNav />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
