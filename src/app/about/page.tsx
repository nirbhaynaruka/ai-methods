"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#EFEFEF] text-[#0A0A0A]">
      <Header />

      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white py-32 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 tracking-tight">
          We Build Useful AI.
        </h1>
        <p className="text-xl text-[#BBBBBB] max-w-3xl mx-auto">
          AIMethods creates AI systems that solve real problems. No hype. Just working tools for builders, operators, and analysts.
        </p>
      </section>

      {/* What We Do */}
      <section className="bg-white py-28 px-6 border-t border-[#DDD]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">What We Actually Do</h2>
            <p className="text-lg text-[#222] leading-relaxed mb-4">
              We build AI tools, models, and agents that actually work in real-world business setups.
            </p>
            <p className="text-lg text-[#444]">
              AIMethods is a home for practical GenAI. We ship useful, reliable, and safe systems fast.
            </p>
          </div>
          <div className="bg-[#F6F6F6] p-8 rounded-xl border border-[#E0E0E0]">
            <ul className="space-y-3 text-left text-[#0A0A0A] text-base">
              <li>✅ AI solutions for operations</li>
              <li>✅ Custom agents for business use</li>
              <li>✅ Model integration and training</li>
              <li>✅ Consulting for teams using GenAI smartly</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why AIMethods */}
      <section className="bg-[#F8F8F8] py-28 px-6 border-t border-[#DDD] text-center">
        <h2 className="text-4xl font-bold mb-12">Why AIMethods Exists</h2>
        <div className="max-w-5xl mx-auto text-lg text-[#222]">
          <p className="mb-6">
            Started by one engineer tired of bloated, overhyped AI tools. Everything we build is tested in real environments — not demos.
          </p>
          <p className="text-[#444]">
            We think GenAI should be boringly useful, not flashy. AIMethods builds tools that save time, improve workflows, and get adopted — not just admired.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-white py-24 px-6 border-t border-[#DDD]">
        <h2 className="text-3xl font-bold mb-12 text-center">How We Think</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-left">
          {["Speed over polish", "Tools over templates", "Human + AI", "Own your infra", "Ethics = defaults", "No lock-in"]
            .map((title, i) => (
              <div
                key={i}
                className="bg-[#F8F8F8] p-6 border border-[#E0E0E0] rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-[#444]">
                  {title === "Speed over polish" && "We ship fast so you can test faster."}
                  {title === "Tools over templates" && "No gimmicks. Just workflows that work."}
                  {title === "Human + AI" && "Augment. Don’t automate blindly."}
                  {title === "Own your infra" && "No black boxes. You control what runs."}
                  {title === "Ethics = defaults" && "Bias logging and safety included — not extra."}
                  {title === "No lock-in" && "We don’t trap you. You can leave, export, own it all."}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Real Work */}
      <section className="bg-[#F8F8F8] py-28 px-6 border-t border-[#DDD]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Work That Speaks</h2>
          <p className="text-lg text-[#222] mb-12">
            We've helped clients build internal GPT tools, automate research reports, and cut time-to-insight by over 50%.
          </p>
          <p className="text-sm text-[#666]">More case studies coming soon. Real ones.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0A0A0A] text-white py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Want AI That Actually Works?</h2>
        <p className="text-lg text-[#BBBBBB] max-w-2xl mx-auto mb-8">
          We build agents, prompt systems, and full-stack infra. Want to try something real?
        </p>
        <Link
          href="/contact"
          className="bg-white text-[#0A0A0A] px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition"
        >
          Talk to Us
        </Link>
      </section>

      <Footer />
    </div>
  );
}
