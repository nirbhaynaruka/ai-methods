'use client'
import Link from 'next/link'
import Image from 'next/image'

import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6'

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-[#CCCCCC] pt-8 pb-8 border-t border-[#666666]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
        {/* Brand + Socials */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src="/images/app_icon_512_transparent.png"
              alt="AI Methods Logo"
              width={32}
              height={32}
            />
            <h3 className="text-2xl font-bold text-white">AI Methods</h3>
          </div>

          <p className="text-sm leading-relaxed mb-4">
            We build AI that's enhanced by HI - Human Intelligence. Transform your business with cutting-edge artificial intelligence solutions.
          </p>
          <div className="flex space-x-4 text-white text-xl">
            <a href="https://github.com/aimethods" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/company/aimethods" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://x.com/aimethods" target="_blank" rel="noopener noreferrer" aria-label="X">
              <FaXTwitter />
            </a>
            <a href="mailto:hello@aimethods.co" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-lg">Business Solutions</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/prompts" className="hover:text-white">Prompt Library</Link></li>
            <li><Link href="/business#custom" className="hover:text-white">Custom AI</Link></li>
            <li><Link href="/business#training" className="hover:text-white">AI Training</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-lg">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/solutions" className="hover:text-white">Solutions</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-lg">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 border-[#666666] text-center text-sm text-[#CCCCCC]">
        <p>© 2025 AI Methods. All rights reserved. | Built in public. Inspired by humans. Powered by AI.</p>
      </div>
    </footer>
  )
}
