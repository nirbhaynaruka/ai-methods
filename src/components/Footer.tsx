// File: src/components/Footer.tsx

import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-[#CCCCCC] py-12 border-t border-[#666666]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-8">
        <div className="col-span-full md:col-span-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-4">AiMethods</h3>
          <p className="text-sm leading-relaxed">
            Empowering professionals with indispensable AI tools and expert-crafted prompts to elevate their work.
          </p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-semibold text-white mb-3 text-lg">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/prompts" className="hover:text-white transition-colors">Premium Prompts</Link></li>
            <li><Link href="/comingsoon" className="hover:text-white transition-colors">Custom AI Solutions</Link></li>
            <li><Link href="/comingsoon" className="hover:text-white transition-colors">AI Training</Link></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-semibold text-white mb-3 text-lg">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-8 border-t border-[#666666] text-center text-sm">
        &copy; 2025 AiMethods. All rights reserved.
      </div>
    </footer>
  )
}
