import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiLoader } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
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
      const { data, error: signInError } = await signIn(formData.email, formData.password)
      
      if (signInError) throw signInError

      if (data?.user) {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-3">
            Welcome back
          </h1>
          <p className="text-base text-neutral-700 mb-8">
            Sign in to your account to continue shopping and access exclusive offers.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-lg">
                {error}
              </div>
            )}
            <div>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-neutral-300" />
                <span className="text-neutral-600">Remember me</span>
              </label>
              <a href="#" className="text-neutral-900 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FiLoader className="h-5 w-5 animate-spin" />
                  SIGNING IN...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="text-sm text-neutral-500">or</span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="block w-full border-2 border-neutral-900 text-neutral-900 py-3 px-6 rounded-lg font-semibold text-center hover:bg-neutral-50 transition-colors"
          >
            CREATE ACCOUNT
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-50 to-blue-50 items-center justify-center p-8">
        <div className="w-full h-full max-w-2xl rounded-2xl overflow-hidden bg-neutral-200">
          {/* Placeholder for image - in production, use actual image */}
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-lg">Welcome back!</p>
            </div>
          </div>
          {/* In production, replace with: <img src="/signin-image.jpg" alt="Welcome" className="w-full h-full object-cover" /> */}
        </div>
      </div>
    </div>
  )
}

