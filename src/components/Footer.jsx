import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Footer() {
  const { user } = useAuth()
  const isAdmin = user?.user_metadata?.is_admin === true

  return (
    <footer className="bg-white py-12 border-t border-neutral-200">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/"><h2 className='text-4xl font-semibold'>Chinamati.</h2></Link>
            <p className="text-sm text-neutral-500 max-w-xs">
              Redefining movement with minimalist design and maximum performance.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link className="hover:text-neutral-900" to="/products">Flavours</Link></li>
              <li><Link className="hover:text-neutral-900" to="/products">Bottles</Link></li>
              <li><Link className="hover:text-neutral-900" to="/products">Bundles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link className="hover:text-neutral-900" to="/about">About</Link></li>
              <li><Link className="hover:text-neutral-900" to="/sustainability">Sustainability</Link></li>
              {isAdmin && <li><Link className="hover:text-neutral-900" to="/admin">Admin Console</Link></li>}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-neutral-900">Newsletter</h4>
            <p className="mt-3 text-sm text-neutral-600">Get early access to drops and exclusive offers.</p>
            <form className="mt-4 flex flex-wrap gap-2">
              <input type="email" placeholder="you@example.com" className="h-10 flex-1 rounded-full border mb-1 border-neutral-300 px-4 focus:outline-none focus:ring-2 focus:ring-neutral-900" />
              <button className="h-10 rounded-full bg-neutral-900 px-5 text-white">Join</button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Chinamati. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-neutral-700">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-neutral-700">Terms</Link>
            <a href="#" className="hover:text-neutral-700">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
