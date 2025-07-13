// File: src/app/comingsoon/page.tsx

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <main className="py-20 bg-gray-50 min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Coming Soon!</h1>
          <p className="text-lg text-gray-600 mb-8">
            We are hard at work creating something amazing for you. Stay tuned!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="cta-button cta-button-primary">Back to Homepage</Link>
            <Link href="/waitlist" className="cta-button cta-button-secondary">Join Our Waitlist</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
