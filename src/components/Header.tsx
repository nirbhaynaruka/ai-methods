'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const navLinks = [
    // !isHome && { label: 'Home', href: '/' },
    { label: 'For Business', href: '/business' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ].filter(Boolean)

  return (
    <>
      <header className="bg-[#0A0A0A] text-white sticky top-0 z-50 shadow-lg border-b border-[#666666]">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-2xl font-bold text-white hover:text-[#CCCCCC]"
          >
            <Image
              src="/images/app_icon_512_transparent.png"
              alt="AI Methods Logo"
              width={32}
              height={32}
            />
            <span>{isHome ? 'AI Methods' : 'Home'}</span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="text-white hover:text-[#CCCCCC]">
                {label}
              </Link>
            ))}
            <Link
              href="/waitlist"
              className="ml-4 px-4 py-2 bg-white text-[#0A0A0A] rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Join Waitlist
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 bg-[#0A0A0A] bg-opacity-95 z-50 flex flex-col justify-center items-center">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white text-4xl">&times;</button>
          <nav className="flex flex-col items-center space-y-6 text-white text-2xl">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#CCCCCC]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/waitlist"
              onClick={() => setMenuOpen(false)}
              className="bg-white text-[#0A0A0A] px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
