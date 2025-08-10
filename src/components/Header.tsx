'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

// A simple chevron icon component for the dropdown indicator
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
)

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault()
      router.replace('/') // Or: window.location.reload();
    }
  }
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  // Updated navLinks to include 'Industries' with children for the dropdown
  const navLinks = [
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'AI Consulting & Strategy', href: '/services/consulting' },
      { label: 'Custom AI & ML Development', href: '/services/custom-ml' },
      { label: 'Generative AI Solutions', href: '/services/genai' },
      { label: 'Data Engineering & MLOps', href: '/services/data-mlops' },
      { label: 'Computer Vision & NLP', href: '/services/cv-nlp' },
      { label: 'AI Workflow Automation', href: '/services/automation' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Churn Prediction', href: '/solutions/churn' },
      { label: 'AI Customer Support Agent', href: '/solutions/cust-agent' },
      { label: 'Lead Generation Scoring', href: '/solutions/lead-gen' },
      { label: 'Computer Vision Quality Control', href: '/solutions/cv' },
      { label: 'Persona Generator Pro', href: '/solutions/persona-gen' },
      { label: 'Internal AI Knowledge Assistant', href: '/solutions/knowledge-assistant' },
      { label: 'Compliance & Audit AI', href: '/solutions/compliance' },
      { label: 'Multi-Role AI Agent Library', href: '/solutions/agent-library' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Healthcare & Pharma', href: '/industries/healthcare' },
      { label: 'Finance & FinTech', href: '/industries/fintech' },
      { label: 'Retail & E-Commerce', href: '/industries/ecommerce' },
      { label: 'Logistics & Supply Chain', href: '/industries/logistics' },
      { label: 'Manufacturing & Automotive', href: '/industries/manufacturing' },
      { label: 'Human Resources & Recruitment', href: '/industries/hr' },
      { label: 'Regulatory Compliance', href: '/industries/compliance' },
    ],
  },
  { label: 'Testimonials', href: '/success-stories' },
  { label: 'Blogs', href: '/blog' },
]

  return (
    <>
      <header className="bg-black text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" onClick={handleClick} className="flex items-center space-x-2 text-2xl font-bold">
            <Image
              src="/images/app_icon_512_transparent.png"
              alt="AI Methods Logo"
              width={32}
              height={32}
            />
            <span>AI Methods</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link href={link.href} className="flex items-center space-x-1 text-white hover:text-gray-300">
                  <span>{link.label}</span>
                  {/* Show dropdown icon if there are children */}
                  {link.children && <ChevronDownIcon />}
                </Link>

                {/* Dropdown Menu */}
                {link.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-max max-w-4xl p-6 bg-white text-black rounded-lg shadow-xl hidden group-hover:block">
                    <div className="grid grid-cols-3 gap-x-12 gap-y-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-gray-800 hover:text-blue-600 whitespace-nowrap"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-white-600 transition"
            >
              Contact Us
            </Link>
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white text-4xl">&times;</button>
          <nav className="flex flex-col items-center space-y-6 text-white text-2xl">
            {navLinks.map((link) => (
              <div key={link.href} className="text-center">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-300"
                >
                  {link.label}
                </Link>
                {/* Display child links in mobile menu */}
                {link.children && (
                  <div className="mt-2 flex flex-col space-y-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-lg text-gray-400 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
             <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}