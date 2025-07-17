// File: src/app/contact/page.tsx
'use client'; // This is a client component

import { useState } from 'react';
import { Header } from '@/components/Header'; // Assuming Header.tsx is updated with grayscale palette
import { Footer } from '@/components/Footer'; // Assuming Footer.tsx is updated with grayscale palette

// Metadata export for SEO - This is a Server Component concept, but Next.js allows it here
// It will be handled by Next.js at build time.

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', success: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage({ text: '', success: false }); // Clear previous messages

    // IMPORTANT: Replace with your actual Formspree endpoint for the contact form
    const FORM_SUBMISSION_ENDPOINT = 'https://formspree.io/f/mdkzlkvv'; 

    try {
      const response = await fetch(FORM_SUBMISSION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setFormMessage({ text: 'Thank you for your message! We will get back to you soon.', success: true });
        setForm({ name: '', email: '', subject: '', message: '' }); // Clear the form
      } else {
        const errorData = await response.json();
        const errorText = errorData?.errors?.map((err: { message: string }) => err.message).join(', ') || 'Submission failed.';
        setFormMessage({ text: `Error: ${errorText}`, success: false });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormMessage({ text: 'An unexpected error occurred. Please check your internet connection and try again.', success: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header /> {/* Reusable Header Component */}

      <main className="py-20 bg-[#EFEFEF] min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl bg-[#FFFFFF] p-8 rounded-lg shadow-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">Contact AI Methods</h1>
          <p className="text-lg text-[#666666] mb-8">
            Have a question, need a custom AI solution, or want to discuss a partnership? Reach out to us!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#0A0A0A]">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-md text-[#333333] focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#0A0A0A]">Your Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-md text-[#333333] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-[#0A0A0A]">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-md text-[#333333]  focus:border-transparent"
                placeholder="Inquiry about..."
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[#0A0A0A]">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-md text-[#333333] resize-y focus:border-transparent"
                placeholder="Tell us how we can help..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl font-semibold w-full hover:bg-[#555555] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {submitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>

          {formMessage.text && (
            <div className={`mt-4 text-sm ${formMessage.success ? 'text-green-600' : 'text-red-600'}`}>
              {formMessage.text}
            </div>
          )}
        </div>
      </main>

      <Footer /> {/* Reusable Footer Component */}
    </>
  );
}
