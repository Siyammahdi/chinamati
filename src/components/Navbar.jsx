import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiUser, FiMenu, FiX, FiShoppingBag, FiLogOut } from 'react-icons/fi'
import CartDrawer from './CartDrawer'
import NavMegaDrawer from './NavMegaDrawer'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { cartCount, cartOpen, openCart, closeCart } = useCart()
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [hoverKey, setHoverKey] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Featured', href: '#' },
    { label: 'Wallet', href: '#' },
    { label: 'Watch', href: '#' },
    { label: 'Learn More', href: '#' }
  ]

  return (
    <header className="sticky top-0 z-50 h-[50px] my-auto bg-white" onMouseLeave={() => setMenuOpen(false)}>
              {/* Mega drawer (desktop) */}
              <div className="hidden lg:block">
          <NavMegaDrawer open={menuOpen} active={hoverKey} onClose={() => setMenuOpen(false)} />
        </div>
      <div className="mx-auto max-w-[1600] relative">
        <div className="flex items-center justify-between h-[50px] px-4 lg:px-16 my-auto">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-14">
            <div className="flex items-center ">
              <a className="block w-22 text-xl font-black text-neutral-900" href="/">Chinamati.</a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-14">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors font-medium" 
                  href={item.href}
                  onMouseEnter={() => { setHoverKey(item.label); setMenuOpen(true); }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/dashboard" className="h-9 w-9 grid place-content-center hover:bg-neutral-50 transition-colors">
                <FiUser className="h-6 w-6" />
              </Link>
              {user && (
                <button 
                  onClick={() => signOut()} 
                  className="h-9 w-9 grid place-content-center hover:bg-neutral-50 transition-colors text-rose-500"
                  title="Sign Out"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              )}
              <button className="h-9 w-9  grid place-content-center hover:bg-neutral-50 transition-colors">
                <FiSearch className="h-6 w-6" />
              </button>
              <button onClick={openCart} className="h-9 w-9 grid place-content-center hover:bg-neutral-50 transition-colors relative">
                <FiShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-xs text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setOpen(!open)} 
              className="lg:hidden h-10 w-10 grid place-content-center rounded-md border border-neutral-300 hover:bg-neutral-50 transition-colors"
            >
              <span className="sr-only">Toggle menu</span>
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>



        {/* Mobile menu with transition */}
        <div aria-hidden={!open} className={`lg:hidden bg-white transition-all duration-300 ease-out ${open ? 'opacity-100 translate-y-0 max-h-[480px] ' : 'opacity-0 -translate-y-2 max-h-0'} `}>
          <div className={`overflow-hidden border-t border-neutral-200 p-4 pb-4`}>
            <nav className="grid gap-2 text-sm text-neutral-700">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  className=" py-2 rounded-md hover:bg-neutral-50 font-medium" 
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <Link to="/dashboard" className="h-10 w-10 rounded-full border border-neutral-300 grid place-content-center hover:bg-neutral-50">
                <FiUser className="h-4 w-4" />
              </Link>
              {user && (
                <button 
                  onClick={() => { signOut(); setOpen(false); }} 
                  className="h-10 w-10 rounded-full border border-rose-200 grid place-content-center hover:bg-rose-50 text-rose-500 transition-colors"
                >
                  <FiLogOut className="h-4 w-4" />
                </button>
              )}
              <button className="h-10 w-10 rounded-full border border-neutral-300 grid place-content-center hover:bg-neutral-50">
                <FiSearch className="h-4 w-4" />
              </button>
              <button onClick={openCart} className="h-10 w-10 rounded-full border border-neutral-300 grid place-content-center hover:bg-neutral-50 relative">
                <FiShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-xs text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={closeCart} />
    </header>
  )
}