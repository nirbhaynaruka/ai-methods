"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" },
  } as const;

  const principles = [
    { title: "Speed over polish", body: "Ship fast. Learn faster." },
    { title: "Tools over templates", body: "Workflows that work in prod." },
    { title: "Human + AI", body: "Assist people. Don’t replace judgment." },
    { title: "Own your infra", body: "No black boxes. You control stack." },
    { title: "Ethics by default", body: "Safety, logging, approvals built-in." },
    { title: "No lock‑in", body: "Export anytime. Your data, your models." },
  ];

  const process = [
    { k: "Discover", v: "Map goals, risks, and constraints with stakeholders." },
    { k: "Design", v: "Prompts, data flows, guardrails, KPIs." },
    { k: "Deliver", v: "Launch a usable v1 into the real workflow." },
    { k: "Iterate", v: "Measure outcomes and cut friction." },
    { k: "Govern", v: "Access control, audit trails, fallbacks." },
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
    <div className="bg-[#EFEFEF] text-[#0A0A0A]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E0E0E0] bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <motion.h1
            {...fadeUp}
            className="text-center text-5xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            We build useful AI.
          </motion.h1>
          <motion.p
            {...fadeUp}
            className="mx-auto mt-4 max-w-3xl text-center text-xl text-[#CCCCCC]"
          >
            Practical systems for analysts, operators, and founders. No hype—just tools that ship and stick.
          </motion.p>

          {/* Stat strip */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { k: "Playbooks", v: "12" },
              { k: "Prompt systems", v: "30+" },
              { k: "Integrations", v: "8" },
              { k: "Clients", v: "—" },
            ].map((s) => (
              <motion.div
                key={s.k}
                {...fadeUp}
                className="rounded-2xl border border-[#666666]/30 bg-[#0A0A0A] p-4 text-center"
              >
                <div className="text-3xl font-semibold text-white">{s.v}</div>
                <div className="text-sm text-[#CCCCCC]">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-b border-[#E0E0E0] bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">What we actually do</h2>
            <p className="mt-4 text-lg text-[#333333]">
              We build AI tools, models, and agents that live inside your stack—docs, data, dashboards, products.
            </p>
            <p className="mt-3 text-lg text-[#333333]">We ship fast, prove value, then harden for production.</p>

            <div className="mt-8 grid gap-3">
              <FeatureRow label="AI & ML Development" href="/services/custom-ml" />
              <FeatureRow label="Generative AI & Agents" href="/services/genai" />
              <FeatureRow label="Big Data & Cloud" href="/services/data-mlops" />
              <FeatureRow label="Software Development" href="/services/automation" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E0E0E0] bg-[#F8F8F8] p-8">
            <ul className="space-y-3 text-[#0A0A0A]">
              <li>✅ AI for operations</li>
              <li>✅ Custom agents for teams</li>
              <li>✅ Model integration and training</li>
              <li>✅ Consulting for safe, sane GenAI</li>
            </ul>
            <div className="mt-6 text-sm text-[#666666]">
              Need something specific? <Link className="underline" href="/contact">Tell us what you’re building</Link>.
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-[#E0E0E0] bg-[#F8F8F8]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold">How we work</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[#333333]">Simple, repeatable, transparent.</p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-5">
            {process.map((p) => (
              <motion.div key={p.k} {...fadeUp} className="rounded-2xl border border-[#E0E0E0] bg-white p-4">
                <div className="font-medium text-[#0A0A0A]">{p.k}</div>
                <div className="mt-2 text-sm text-[#333333]">{p.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-[#E0E0E0] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold">How we think</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {principles.map((it) => (
              <motion.div key={it.title} {...fadeUp} className="rounded-2xl border border-[#E0E0E0] bg-[#F8F8F8] p-6">
                <div className="text-lg font-semibold text-[#0A0A0A]">{it.title}</div>
                <p className="mt-2 text-sm text-[#333333]">{it.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-b border-[#E0E0E0] bg-[#F8F8F8]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold">Who’s behind this</h2>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#E0E0E0] bg-white p-6">
            <div className="text-[#0A0A0A] font-medium">Nirbhay Singh Naruka</div>
            <p className="mt-2 text-sm text-[#333333]">
              Builder and analyst. Focused on AI systems that cut time to insight. Previously worked across data, ML, and product. Building AIMethods in public.
            </p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link href="https://www.linkedin.com/in/nnaruka" className="underline">LinkedIn</Link>
              <Link href="/contact" className="underline">Contact</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#E0E0E0] bg-white">
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
          <p className="mx-auto mt-3 max-w-2xl text-lg text-[#CCCCCC]">
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
      className="group flex items-center justify-between rounded-2xl border border-[#E0E0E0] bg-white px-4 py-3 transition hover:bg-[#F8F8F8]"
    >
      <span className="text-[#0A0A0A]">{label}</span>
      <span className="rounded-xl border border-[#E0E0E0] px-2 py-1 text-xs text-[#333333] transition group-hover:bg-[#EFEFEF]">
        Learn more
      </span>
    </Link>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#E0E0E0] bg-[#F8F8F8]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium text-[#0A0A0A]">{q}</span>
        <span className="text-[#666666]">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-[#333333]">{a}</div>}
    </div>
  );
}
