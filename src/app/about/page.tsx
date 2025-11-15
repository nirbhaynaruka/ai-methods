"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" },
  } as const;

  const principles = [
    { title: "Speed over polish", body: "Ship fast. Learn faster.", icon: "⚡" },
    { title: "Tools over templates", body: "Workflows that work in prod.", icon: "🔧" },
    { title: "Human + AI", body: "Assist people. Don't replace judgment.", icon: "🤝" },
    { title: "Own your infra", body: "No black boxes. You control stack.", icon: "🏗️" },
    { title: "Ethics by default", body: "Safety, logging, approvals built-in.", icon: "🛡️" },
    { title: "No lock-in", body: "Export anytime. Your data, your models.", icon: "🔓" },
  ];

  const process = [
    { k: "Discover", v: "Map goals, risks, and constraints with stakeholders.", icon: "🔍" },
    { k: "Design", v: "Prompts, data flows, guardrails, KPIs.", icon: "🎨" },
    { k: "Deliver", v: "Launch a usable v1 into the real workflow.", icon: "🚀" },
    { k: "Iterate", v: "Measure outcomes and cut friction.", icon: "🔄" },
    { k: "Govern", v: "Access control, audit trails, fallbacks.", icon: "👑" },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CTO, TechCorp", quote: "AI Methods transformed our operations overnight. Their approach is revolutionary." },
    { name: "Mike Johnson", role: "CEO, InnovateLabs", quote: "Finally, AI that works. Practical, ethical, and game-changing." },
    { name: "Dr. Emily Rodriguez", role: "Head of Research, MedTech", quote: "Their human-AI synergy is the future of intelligent systems." },
  ];

  const faqs = [
    {
      q: "What do you actually build?",
      a: "AI agents, prompt systems, and ML features that plug into your current tools—CRMs, docs, dashboards, or internal apps.",
    },
    {
      q: "How fast can we start?",
      a: "A discovery session in week 1, a scoped v1 in 2–3 weeks for most projects, then iteration. Timelines vary by complexity.",
    },
    {
      q: "Do you use our data?",
      a: "Yes, securely. We prefer running models where you are—cloud of your choice, with least‑privilege and audit logs.",
    },
    {
      q: "Why AIMethods over a generic agency?",
      a: "We optimize for production outcomes, not demos. Simple stack, measurable wins, and a path to ownership for your team.",
    },
  ];

  return (
    <div className="bg-white text-black">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E0E0E0] bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="mx-auto max-w-6xl px-6 py-32 relative z-10">
          <motion.h1
            {...fadeUp}
            className="text-center text-6xl md:text-7xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
          >
            We build useful AI.
          </motion.h1>
          <motion.p
            {...fadeUp}
            className="mx-auto mt-6 max-w-4xl text-center text-xl md:text-2xl text-[#CCCCCC] leading-relaxed"
          >
            Practical systems for analysts, operators, and founders. No hype—just tools that ship and stick. We're the bridge between AI potential and real business impact.
          </motion.p>

          {/* Enhanced Stat strip */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: "Playbooks", v: "12", desc: "Proven frameworks" },
              { k: "Prompt systems", v: "30+", desc: "Production-ready" },
              { k: "Integrations", v: "8", desc: "Seamless connections" },
              { k: "Happy Clients", v: "Growing", desc: "Real results delivered" },
            ].map((s, index) => (
              <motion.div
                key={s.k}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.1 }}
                className="group relative rounded-3xl border border-[#666666]/30 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="text-4xl font-bold text-white mb-2">{s.v}</div>
                <div className="text-sm font-semibold text-[#CCCCCC] mb-1">{s.k}</div>
                <div className="text-xs text-[#999999]">{s.desc}</div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-b border-black bg-white text-black">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              What we actually do
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              We build AI tools, models, and agents that integrate seamlessly into your existing stack—docs, data, dashboards, products.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We ship fast, prove value, then scale for production. No more failed AI experiments—we deliver systems that work, integrate perfectly, and drive measurable ROI.
            </p>


          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative"
          >
            <div className="rounded-3xl border border-black bg-white p-10 shadow-2xl">
              <div className="text-6xl mb-6 text-center">🚀</div>
              <ul className="space-y-4 text-black">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-lg">AI for operations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-lg">Custom agents for teams</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-lg">Model integration and training</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-lg">Consulting for safe, sane GenAI</span>
                </li>
              </ul>
              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Let's Build Something Amazing
                </Link>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-black bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.h2
            {...fadeUp}
            className="text-center text-4xl md:text-5xl font-bold text-white"
          >
            How we work
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-300"
          >
            Simple, repeatable, transparent. Our proven methodology delivers results.
          </motion.p>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-5">
            {process.map((p, index) => (
              <motion.div
                key={p.k}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.1 }}
                className="rounded-3xl border border-black bg-white p-6 shadow-lg"
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <div className="font-bold text-black text-lg mb-2">{p.k}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{p.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-black bg-white text-black">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.h2
            {...fadeUp}
            className="text-center text-4xl md:text-5xl font-bold text-black mb-4"
          >
            Our Principles
          </motion.h2>
          <motion.p
            {...fadeUp}
            className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-600"
          >
            The foundation of everything we build. Ethics, transparency, and human-centric AI.
          </motion.p>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((it, index) => (
              <motion.div
                key={it.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.1 }}
                className="rounded-3xl border border-black bg-white p-8 shadow-lg"
              >
                <div className="text-4xl mb-4">{it.icon}</div>
                <div className="text-xl font-bold text-black mb-3">{it.title}</div>
                <p className="text-gray-600 leading-relaxed">{it.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Founder */}
      <section className="border-b border-black bg-black text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-red-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-32 relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4">
              Meet the Founder
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn about the team behind AIMethods
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image & Visual */}
            <motion.div
              {...fadeUp}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin opacity-75" style={{ animationDuration: '8s' }}></div>
                <div className="absolute inset-2 rounded-full bg-black"></div>
                {/* Profile Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden">
                  <Image
                    src="/Nirbhay.png"
                    alt="Nirbhay Singh Naruka"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-xl">⚡</span>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              {...fadeUp}
              className="space-y-8"
            >
              <div>
                <h3 className="text-4xl font-bold text-white mb-4">Nirbhay Singh Naruka</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  A builder and AI strategist focused on creating technology that amplifies human potential. With experience in data science, machine learning, and product development, Nirbhay founded AIMethods to bridge the gap between cutting-edge AI research and practical business applications.
                </p>
                <blockquote className="text-xl italic text-blue-200 border-l-4 border-blue-500 pl-6 mb-6">
                  "AI should enhance human decision-making, not dictate it. We're building tools that empower teams to work smarter, not harder."
                </blockquote>
              </div>

              {/* Achievements */}
              {/* <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "5+", label: "Years in AI/ML" },
                  { number: "50+", label: "Projects Delivered" },
                  { number: "12", label: "AI Playbooks Created" },
                  { number: "100%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500 transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div> */}

              {/* Social Links */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/nirbhay13"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fadeUp}
                  className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
                <motion.a
                  href="https://nirbhaynaruka.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fadeUp}
                  className="group flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                  </svg>
                  Website
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
                <motion.a
                  href="/contact"
                  {...fadeUp}
                  className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Contact
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-black bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold">FAQ</h2>
          <div className="mt-8 grid grid-cols-1 gap-4">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />)
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold">Want AI that actually works?</h2>
          <p className="mx-auto mt-3 max-w-4xl text-lg text-[#CCCCCC]">
            We build agents, prompt systems, and full‑stack infra. Want to try something real?
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="rounded-2xl border border-[#666666] bg-white px-6 py-3 font-semibold text-[#0A0A0A] transition hover:bg-gray-200"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureRow({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-black bg-white px-4 py-3 transition hover:bg-gray-50"
    >
      <span className="text-black">{label}</span>
      <span className="rounded-xl border border-black px-2 py-1 text-xs text-black transition group-hover:bg-gray-100">
        Learn more
      </span>
    </Link>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium text-black">{q}</span>
        <span className="text-black">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-black">{a}</div>}
    </div>
  );
}
