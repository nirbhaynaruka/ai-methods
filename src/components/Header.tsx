// File: src/components/Header.tsx

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close mobile menu on link click
  useEffect(() => {
    const close = () => {
      setMenuOpen(false)
      document.body.style.overflow = ''
    }
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => close()
  }, [menuOpen])

  return (
    <>
      <header className="bg-gray-800 text-white sticky top-0 z-50 shadow-lg border-b border-gray-700">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-white hover:text-blue-300">
            <Image
              src="/images/app_icon_512_transparent.png"
              alt="AiMethods Logo"
              width={32}
              height={32}
            />
            <span>AiMethods</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link text-white">Home</Link>
            <Link href="/products" className="nav-link text-white">Products</Link>
            <Link href="/contact" className="nav-link text-white">Contact</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col justify-center items-center">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white text-4xl">&times;</button>
          <nav className="flex flex-col items-center space-y-6 text-white text-2xl">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </>
  )
}
