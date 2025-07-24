"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function BusinessPage() {
  const solutions = [
    {
      title: "AI Ethics & Responsible Usage",
      problem: "Teams misuse or underuse AI tools, risking leaks and inefficiency.",
      solution: "Compliance-grade AI onboarding + training that scales with your team.",
      features: [
        "Notion playbook (free)",
        "LMS integration",
        "Certificate-based learning"
      ],
      audience: "HR, L&D, CTOs",
      cta: "Start with Free Playbook"
    },
    {
      title: "Prompt & Doc Tagging System",
      problem: "Chaos in prompt reuse and document workflows.",
      solution: "LLM-powered tagging and retrieval built for Notion, Slack, and docs.",
      features: [
        "Auto-tag prompts, notes, and files",
        "Hierarchies by team, topic, sensitivity",
        "API + Chrome extension"
      ],
      audience: "Prompt ops teams, data leads",
      cta: "Request Early Access"
    },
    {
      title: "AI Agents for Teams",
      problem: "Repetitive workflows drain your team’s time.",
      solution: "Custom AI agents that run tasks inside your stack.",
      features: [
        "Customer support triage",
        "Meeting summaries + tasks",
        "Data → Insight generators"
      ],
      audience: "Ops leads, Product teams, BI managers",
      cta: "Build Your First Agent"
    },
    {
      title: "Premium Prompts (Org-Specific)",
      problem: "Teams waste time with bad prompting.",
      solution: "Expert-crafted prompt packs by role and workflow.",
      features: [
        "Curated prompt libraries",
        "Custom tuning service",
        "Team onboarding support"
      ],
      audience: "Sales, analysts, marketers, content teams",
      cta: "Explore the Prompt Library"
    },
    {
      title: "Custom AI Solutions",
      problem: "Off-the-shelf tools don’t fit your workflows.",
      solution: "Done-for-you LLM integration, automation, and tooling.",
      features: [
        "Internal AI tools",
        "Business intelligence automations",
        "Custom plug-ins + workflows"
      ],
      audience: "CTOs, Heads of Ops, BI leads",
      cta: "Book a Scoping Call"
    }
  ];

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
            <Link
              href="/contact"
              className="bg-[#0A0A0A] border border-white text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#555555]"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-[#EFEFEF]">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#333333] mb-12">
            Our AI Solutions
          </h2>

          <div className="grid gap-8">
            {solutions.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-[#E0E0E0] p-6 rounded-md shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-[#333333] mb-2">{item.title}</h3>
                <p><strong>Problem:</strong> {item.problem}</p>
                <p className="mt-2"><strong>Solution:</strong> {item.solution}</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                  {item.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-[#666666]"><strong>For:</strong> {item.audience}</p>
                <button className="mt-4 bg-[#0A0A0A] text-white px-4 py-2 rounded hover:bg-[#555555]">
                  {item.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FFFFFF] text-center py-16 border-t border-[#E0E0E0]">
        <h2 className="text-2xl font-bold text-[#333333]">Not sure where to start?</h2>
        <p className="mt-2 text-[#222222] max-w-xl mx-auto">
          Tell us your workflow. We’ll show you how to automate or enhance it with AI — fast and securely.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block bg-[#0A0A0A] text-white px-6 py-3 rounded hover:bg-[#555555]"
        >
          Talk to an Expert
        </Link>
      </section>

      <Footer />
    </div>
  );
}
