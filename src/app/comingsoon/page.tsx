// File: src/app/comingsoon/page.tsx

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      <main className="py-20 bg-[#EFEFEF] min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-4">Coming Soon!</h1>
          <p className="text-lg text-[#666666] mb-8">
            We are hard at work creating something amazing for you. Stay tuned!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200"
            >
              Back to Homepage
            </Link>
            <Link
              href="/waitlist"
              className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#555555]"
            >
              Join Our Waitlist
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
