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

      <main className="py-20 bg-[#EFEFEF] min-h-[calc(100vh-120px)]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-4">Contact AI Methods</h1>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Have a question, need a custom AI solution, or want to discuss a partnership? Choose how you'd like to connect with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form Section */}
            <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-xl border border-[#E0E0E0]">
              <div className="flex items-center mb-6">
                <svg className="w-8 h-8 text-[#0A0A0A] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">Send a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#0A0A0A]">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg text-[#333333] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 transition-all duration-200"
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
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg text-[#333333] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 transition-all duration-200"
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
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg text-[#333333] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 transition-all duration-200"
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
                    className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg text-[#333333] resize-y focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 transition-all duration-200"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0A0A0A] text-white px-8 py-4 rounded-xl font-semibold w-full hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

            {/* Calendly Section */}
            <div className="bg-[#F8F8F8] p-8 rounded-2xl shadow-xl border border-[#E0E0E0] flex flex-col justify-center">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <svg className="w-12 h-12 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Schedule a Call</h2>
                <p className="text-[#666666] mb-8 text-lg leading-relaxed">
                  Prefer a direct conversation? Book a personalized call with our AI experts. We'll dive deep into your needs and explore how AI can revolutionize your workflows.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0A0A0A] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#333333]">Free consultation</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0A0A0A] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#333333]">Tailored AI solutions</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0A0A0A] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#333333]">Expert guidance</span>
                  </div>
                </div>
                <a
                  href="https://calendly.com/aimethods-aimethods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#0A0A0A] text-white px-10 py-5 rounded-xl font-semibold hover:bg-[#333333] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book Your Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer /> {/* Reusable Footer Component */}
    </>
  );
}
