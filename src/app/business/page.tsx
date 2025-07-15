// File: src/app/business/page.tsx

"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function BusinessPage() {
  return (
    <div className="bg-[#EFEFEF] text-[#0A0A0A]">
      <Header />

      {/* Hero Section */}
      <section className="py-24 md:py-36 text-center bg-[#0A0A0A] text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Scalable AI Solutions for Modern Teams
          </h1>
          <p className="text-lg md:text-xl text-[#CCCCCC] max-w-3xl mx-auto mb-8">
            AI Methods helps businesses deploy and scale AI with expert-crafted prompts,
            automation blueprints, and strategic enablement, fast.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            <Link
  href="/prompts"
  className="bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200"
>
  Explore Prompt Library
</Link>



            <Link href="/contact" className="bg-[#0A0A0A] border border-white text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#555555]">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Data Intelligence */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="container mx-auto px-6 md:grid md:grid-cols-2 md:gap-16 items-center">
          <div className="text-center md:text-left mb-10 md:mb-0">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock Insights from Complex Data
            </h2>
            <p className="text-lg text-[#333333] leading-relaxed mb-6">
              Streamline analytics workflows. AI Methods turns dense, noisy datasets into
              clean, insight-driven outputs using precision prompt pipelines, no SQL wizardry required.
            </p>
            <Link href="/prompts" className="bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#555555]">
              See Data Prompts →
            </Link>
          </div>
          <div className="bg-[#F8F8F8] p-8 rounded-lg shadow-lg border border-[#E0E0E0] text-center">
            <div className="w-full h-64 bg-[#FFFFFF] rounded-md flex items-center justify-center text-[#666666] text-sm">
              [Data workflow visualization or dashboard output]
            </div>
          </div>
        </div>
      </section>

      {/* Section: Content Automation */}
      <section className="py-20 bg-[#EFEFEF] border-t border-[#E0E0E0]">
        <div className="container mx-auto px-6 md:grid md:grid-cols-2 md:gap-16 items-center">
          <div className="order-2 text-center md:text-left mb-10 md:mb-0">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Accelerate Content Without Losing Brand Voice
            </h2>
            <p className="text-lg text-[#333333] leading-relaxed mb-6">
              Generate high-quality copy, campaign ideas, social posts, and internal docs in minutes.
              Our prompt systems retain tone and clarity across every channel.
            </p>
            <Link href="/prompts" className="bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#555555]">
              Try Content Prompts →
            </Link>
          </div>
          <div className="order-1 bg-[#FFFFFF] p-8 rounded-lg shadow-lg border border-[#E0E0E0] text-center">
            <div className="w-full h-64 bg-[#F8F8F8] rounded-md flex items-center justify-center text-[#666666] text-sm">
              [Content automation UI / side-by-side prompt comparison]
            </div>
          </div>
        </div>
      </section>

      {/* Section: Training + Strategy */}
      <section className="py-20 bg-[#FFFFFF] border-t border-[#E0E0E0]">
        <div className="container mx-auto px-6 md:grid md:grid-cols-2 md:gap-16 items-center">
          <div className="text-center md:text-left mb-10 md:mb-0">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upskill Your Team and Align on AI Strategy
            </h2>
            <p className="text-lg text-[#333333] leading-relaxed mb-6">
              We offer fast onboarding sessions, AI compliance training, and prompt
              engineering bootcamps to make sure your team isn’t just using AI, they’re using it right.
            </p>
            <Link href="/contact" className="bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#555555]">
              Schedule a Session →
            </Link>
          </div>
          <div className="bg-[#EFEFEF] p-8 rounded-lg shadow-lg border border-[#E0E0E0] text-center">
            <div className="w-full h-64 bg-[#FFFFFF] rounded-md flex items-center justify-center text-[#666666] text-sm">
              [Training flow or team workshop visual]
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A0A0A] text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Operationalize AI?
          </h2>
          <p className="text-lg text-[#CCCCCC] mb-8">
            Let’s design prompts, tools, and workflows around what your business actually needs.
            Custom-built. No hype. All signal.
          </p>
          <Link
            href="/contact"
            className="bg-[#FFFFFF] text-[#0A0A0A] px-6 py-3 rounded-full font-semibold shadow hover:bg-[#E0E0E0]"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
