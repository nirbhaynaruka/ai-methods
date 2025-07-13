// File: src/app/waitlist/page.tsx

'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function WaitlistPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: '',
    price_feedback: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ text: '', success: false })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage({ text: '', success: false })

    try {
      const response = await fetch('https://formspree.io/f/mdkzlkvv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        setMessage({ text: 'Thank you for joining our waitlist! We will be in touch soon.', success: true })
        setForm({ name: '', email: '', interest: '', price_feedback: '' })
      } 
             else {
        const errorData = await response.json()
        const errorText = errorData?.errors?.map((err: { message: string }) => err.message).join(', ') || 'Submission failed.'
        setMessage({ text: errorText, success: false })
      }
    } catch {
      setMessage({ text: 'Network error. Please try again.', success: false })
    }

      finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="py-20 bg-gray-50 min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl bg-white p-8 rounded-lg shadow-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Join Our Premium Prompts Waitlist</h1>
          <p className="text-lg text-gray-600 mb-8">
            Be the first to know when our expertly crafted AI prompt packages launch!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name</label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">Your Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-semibold mb-2">How do you plan to use AI prompts?</label>
              <textarea
                id="interest"
                name="interest"
                rows={4}
                value={form.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700"
                placeholder="e.g., For content, analysis, code..."
              />
            </div>
            <div>
              <label htmlFor="price_feedback" className="block text-sm font-semibold mb-2">Preferred Pricing Model</label>
              <input
                id="price_feedback"
                name="price_feedback"
                value={form.price_feedback}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700"
                placeholder="e.g., Subscription, bundles..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="cta-button cta-button-primary w-full"
            >
              {submitting ? 'Submitting...' : 'Join Waitlist'}
            </button>
          </form>

          {message.text && (
            <div className={`mt-4 text-sm ${message.success ? 'text-green-600' : 'text-red-600'}`}>{message.text}</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
