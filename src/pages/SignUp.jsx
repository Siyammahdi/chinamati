import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiLoader, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signUpError } = await signUp(formData.email, formData.password, {
        full_name: formData.full_name
      })

      if (signUpError) throw signUpError

      if (data?.user) {
        setSuccess(true)
        // Re-implement email validation: Don't redirect automatically
      }
    } catch (err) {
      setError(err.message || 'An error occurred during sign up.')
    } finally {
      setLoading(false)
    }
  }

  // Re-implement the check email UI
  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center">
              <FiCheckCircle className="h-10 w-10 text-emerald-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Check your email!</h1>
          <p className="text-neutral-600">
            We've sent a confirmation link to <span className="font-bold">{formData.email}</span>. 
            Please check your inbox to activate your account.
          </p>
          <button 
            onClick={() => navigate('/signin')}
            className="w-full bg-neutral-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
          >
            GO TO LOGIN
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-3">
            Sign up for free
          </h1>
          <p className="text-base text-neutral-700 mb-8">
            Please enter your details below to enjoy exclusive offers and 15% off your order!
          </p>

          {/* Incentive Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs sm:text-sm font-semibold">
              100 INSTANT POINTS
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs sm:text-sm font-semibold">
              15% OFF YOUR ORDER
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs sm:text-sm font-semibold">
              $1 = 10 POINTS
            </span>
          </div>

     {/* Form */}
<form onSubmit={handleSubmit} className="space-y-4">
  {error && (
    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-lg">
      {error}
    </div>
  )}

  <div>
    <input
      type="text"
      name="full_name"
      value={formData.full_name}
      onChange={handleChange}
      placeholder="Full Name"
      required
      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
    />
  </div>

  <div>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Email Address"
      required
      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
    />
  </div>

  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      required
      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent pr-12"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
    >
      {showPassword ? (
        <FiEyeOff className="h-5 w-5" />
      ) : (
        <FiEye className="h-5 w-5" />
      )}
    </button>
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-neutral-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
  >
    {loading ? (
      <>
        <FiLoader className="h-5 w-5 animate-spin" />
        CREATING ACCOUNT...
      </>
    ) : (
      'CREATE ACCOUNT'
    )}
  </button>
</form>

          {/* Disclaimer */}
          <p className="text-xs text-neutral-600 mt-4 text-center">
            By submitting this form you agree that we will keep you informed with promotional updates on a regular basis.
          </p>

          {/* Separator */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="text-sm text-neutral-500">or</span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          {/* Login Link */}
          <Link
            to="/signin"
            className="block w-full border-2 border-neutral-900 text-neutral-900 py-3 px-6 rounded-lg font-semibold text-center hover:bg-neutral-50 transition-colors"
          >
            LOGIN
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-50 to-blue-50 items-center justify-center p-8">
        <div className="w-full h-full max-w-2xl rounded-2xl overflow-hidden bg-neutral-200">
          {/* Placeholder for image - in production, use actual image */}
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <div className="text-center">
            <div className="text-6xl mb-4">🏊‍♀️</div>
            <p className="text-lg">Welcome to Chinamati</p>
          </div>
          </div>
          {/* In production, replace with: <img src="/signup-image.jpg" alt="Welcome" className="w-full h-full object-cover" /> */}
        </div>
      </div>
    </div>
  )
}

