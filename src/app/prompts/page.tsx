// File: src/app/prompts/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import PremiumPromptGenerator from "@/components/PremiumPromptGenerator";

// import "@/styles/prompts.css";

export default function PromptsPage() {
  const [checklist, setChecklist] = useState([]);
  const [techniques, setTechniques] = useState({});
  const [prompts, setPrompts] = useState({});
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  useEffect(() => {
    import("@/data/promptsData").then((mod) => {
      setChecklist(mod.checklistData);
      setTechniques(mod.techData);
      setPrompts(mod.promptData);
      setSelectedTech(Object.keys(mod.techData)[0]);
      setSelectedPrompt(Object.keys(mod.promptData)[0]);
    });
  }, []);

  return (
    <div className="bg-[#F8F7F4] text-gray-900">
      <Header />
      <nav className="bg-white/80 backdrop-blur-md top-[68px] z-40 shadow-sm border-b border-gray-200 sticky">
        <div className="container mx-auto px-6 py-3 flex centerflex justify-center md:justify-start space-x-6 md:space-x-8 text-gray-700">
          <a href="#hero" className="nav-link-product font-semibold text-blue-600">Prompts Overview</a>
          <a href="#value" className="nav-link-product">Value</a>
          <a href="#toolkit" className="nav-link-product">Toolkit</a>
          <a href="#library" className="nav-link-product">Library</a>
          <a href="#sparkle-prompt" className="nav-link-product">Sparkle Prompt</a>
          <a href="#strategy" className="nav-link-product">Strategy</a>
        </div>
      </nav>

      <section id="hero" className="py-20 text-center bg-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold">Architecting Your Premium AI Prompts</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            This is a preview of our premium, expert-crafted AI prompts. Moving beyond simple
            queries, our specialized prompt packages engineer high-value instructions that deliver
            unparalleled results for analysts, creators, and builders.
          </p>
        </div>
      </section>

      <section id="value" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Anatomy of a Premium Prompt</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {checklist.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-lg shadow">
                <details className="p-4">
                  <summary className="cursor-pointer font-semibold">{item.criterion}</summary>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  <div className="mt-2 text-sm">
                    <strong>Key Techniques:</strong> {item.techniques.join(", ")}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="toolkit" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Prompt Architect's Toolkit</h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            <div className="md:w-1/3 space-y-2">
              {Object.keys(techniques).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTech(key)}
                  className={`tech-btn w-full text-left p-3 rounded-md border ${
                    selectedTech === key ? "bg-blue-100 text-blue-800 font-semibold" : "bg-white"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="md:w-2/3 bg-gray-50 p-6 rounded-lg">
              {selectedTech && (
                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedTech}</h3>
                  <p className="text-sm text-gray-600 mb-4">{techniques[selectedTech].description}</p>
                  <p className="text-sm font-semibold mb-1">Primary Benefit:</p>
                  <p className="text-sm text-gray-700">{techniques[selectedTech].benefit}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Prompt Library</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.keys(prompts).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedPrompt(key)}
                className={`tab-btn px-4 py-2 rounded-full border ${
                  selectedPrompt === key ? "bg-blue-600 text-white" : "border-blue-300 text-blue-600"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
          {selectedPrompt && (
            <div className="bg-white p-6 rounded-lg shadow-md text-left max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-1">{selectedPrompt}</h3>
              <p className="text-sm text-blue-600 font-semibold uppercase">
                {prompts[selectedPrompt].category}
              </p>
              <p className="text-gray-700 mt-2 mb-4">{prompts[selectedPrompt].value}</p>
              <div className="mb-4">
                <strong>Techniques:</strong>
                {prompts[selectedPrompt].techniques.map((tech: string) => (
                  <span
                    key={tech}
                    className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h4 className="font-semibold text-lg mb-2">Prompt Template:</h4>
              <pre className="code-block whitespace-pre-wrap bg-gray-900 text-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                <code>{prompts[selectedPrompt].content}</code>
              </pre>
            </div>
          )}
        </div>
      </section>
      <section className="py-20 bg-gray-50 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our waitlist for exclusive updates on new prompt packages, early access
            opportunities, and provide your valuable input on our upcoming offerings!
          </p>
          <Link href="/waitlist" className="cta-button cta-button-primary">
            Join Our Waitlist Today!
          </Link>
        </div>
      </section>
      <section className="py-20 md:py-32 text-center bg-white">
  <div className="container mx-auto px-6">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
      ✨ Try a Premium Prompt ✨
    </h1>
    <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            See the power of a meticulously crafted prompt! Enter a basic idea, and our AI will transform it into a professional, high-value prompt using the techniques outlined in our toolkit.
    </p>
    <PremiumPromptGenerator />
 
        </div>
      </section>

      <Footer />
    </div>
  );
}
