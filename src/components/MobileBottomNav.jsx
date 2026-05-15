import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiGrid, FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi'
import { useState } from 'react'
import CartDrawer from './CartDrawer'
import { useCart } from '../context/CartContext'

export default function MobileBottomNav() {
  const { cartCount } = useCart()
  const location = useLocation()
  const [cartOpen, setCartOpen] = useState(false)

  const navItems = [
    {
      label: 'Home',
      icon: FiHome,
      href: '/',
      active: location.pathname === '/'
    },
    {
      label: 'Shop',
      icon: FiGrid,
      href: '/products',
      active: location.pathname === '/products' || location.pathname.startsWith('/product/')
    },
    {
      label: 'Cart',
      icon: FiShoppingBag,
      href: '#',
      onClick: (e) => {
        e.preventDefault()
        setCartOpen(true)
      },
      badge: cartCount
    },
    {
      label: 'Account',
      icon: FiUser,
      href: '/dashboard',
      active: location.pathname === '/dashboard' || location.pathname === '/signin' || location.pathname === '/signup'
    }
  ]

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile/tablet */}
      <nav className="m-1  rounded-xl fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-[0_-2px_10px_rgba(0,0,0,0.05)] lg:hidden safe-area-inset-bottom">
        <div className="grid grid-cols-4 h-16 pb-safe">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = item.active

            return (
              <button
                key={index}
                onClick={item.onClick}
                className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive
                    ? 'text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {item.href && !item.onClick ? (
                  <Link
                    to={item.href}
                    className={`w-full h-full flex flex-col items-center justify-center gap-1 ${
                      isActive ? 'text-neutral-900' : 'text-neutral-500'
                    }`}
                  >
                    <div className="relative">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] text-white flex items-center justify-center font-semibold">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <>
                    <div className="relative">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] text-white flex items-center justify-center font-semibold">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {item.label}
                    </span>
                  </>
                )}
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute rounded-full  top-0 left-0 right-0 h-0.5 bg-neutral-900" />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Add bottom padding to main content on mobile to prevent content from being hidden behind nav */}
      <style>{`
        @media (max-width: 1023px) {
          #root > div {
            padding-bottom: 64px;
          }
        }
        .safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}




