// File: src/app/page.tsx
"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AiAdvantage from "@/components/AiAdvantage";
import ClientOnly from "@/components/ClientOnly";

import Link from "next/link";

export default function Home() {
  return (
    
    <div className="bg-[#F8F8F8] text-[#0A0A0A]">
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0A0A0A] leading-tight">
            Empower Your Workflows with AI Methods
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#666666] max-w-3xl mx-auto">
            Unlock the full potential of Generative AI for your business with expertly crafted
            prompts, custom solutions, and strategic insights. Transform complex challenges into
            intelligent, automated workflows.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/prompts"
              className="bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200"
            >
              Explore Premium Prompts
            </Link>
            <Link
              href="/comingsoon"
              className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#555555]"
            >
              Get Custom Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-[#EFEFEF]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A]">
              Our Solutions for Modern Workflows
            </h2>
            <p className="mt-4 text-lg text-[#666666] max-w-3xl mx-auto">
              We bridge the gap between powerful AI models and practical business applications.
              Discover how AI Methods can streamline your operations and elevate your output.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#E0E0E0]">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                Premium Prompt Library
              </h3>
              <p className="text-[#666666] mb-4">
                Access a curated collection of high-value AI prompts designed to automate complex
                tasks for data analysts, content creators, and business builders.
              </p>
              <Link
                href="/prompts"
                className="bg-[#0A0A0A] text-white px-4 py-2 rounded-md font-medium hover:bg-[#555555]"
              >
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#E0E0E0]">
              <div className="text-5xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">Custom AI Solutions</h3>
              <p className="text-[#666666] mb-4">
                Tailored AI integration and workflow automation services to address your unique
                business challenges with precision and efficiency.
              </p>
              <Link
                href="/comingsoon"
                className="bg-[#0A0A0A] text-white px-4 py-2 rounded-md font-medium hover:bg-[#555555]"
              >
                Discover Solutions →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#E0E0E0]">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                AI Training & Consulting
              </h3>
              <p className="text-[#666666] mb-4">
                Expert-led training and strategic consulting to help your team master AI tools and
                integrate them effectively into your operations.
              </p>
              <Link
                href="/comingsoon"
                className="bg-[#0A0A0A] text-white px-4 py-2 rounded-md font-medium hover:bg-[#555555]"
              >
                Explore Training →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Advantage Section */}
      <section id="ai-advantage" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            ✨ Find Your AI Advantage ✨
          </h2>
          <p className="text-lg text-[#666666] max-w-3xl mx-auto mb-8">
            Describe your role or a key business challenge, and let our AI suggest how specialized
            prompts and AI Methods solutions can streamline your workflow and drive results.
          </p>

<ClientOnly>
  <AiAdvantage />
</ClientOnly>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#EFEFEF] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[#666666] mb-8">
            Join our waitlist for exclusive updates on new prompt packages, early access
            opportunities, and provide your valuable input on our upcoming offerings!
          </p>
          <Link
            href="/waitlist"
            className="bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200"
          >
            Join Our Waitlist Today!
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
