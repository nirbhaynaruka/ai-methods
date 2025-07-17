'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Link from 'next/link';
import PremiumPromptGenerator from '@/components/PremiumPromptGenerator';

type ChecklistItem = {
  criterion: string;
  description: string;
  techniques: string[];
};

type Technique = {
  description: string;
  benefit: string;
  visual?: string; // <--- ADD THIS LINE
};


type TechniquesMap = {
  [name: string]: Technique;
};

type PromptItem = {
  content: string;
  value: string;
  category: string;
  techniques: string[];
};

type PromptMap = {
  [title: string]: PromptItem;
};

// ===== COMPONENT =====
export default function PromptsPage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [techniques, setTechniques] = useState<TechniquesMap>({});
  const [prompts, setPrompts] = useState<PromptMap>({});
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    import('@/data/promptsData').then((mod) => {
      setChecklist(mod.checklistData);
      setTechniques(mod.techData);
      setPrompts(mod.promptData);
      setSelectedTech(Object.keys(mod.techData)[0]);
      setSelectedPrompt(Object.keys(mod.promptData)[0]);
    });
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'value', 'toolkit', 'library', 'sparkle-prompt'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#F8F8F8] text-[#0A0A0A]">
      <Header />
      <nav className="bg-[#FFFFFF]/80 backdrop-blur-md top-[68px] z-40 shadow-sm border-b border-[#E0E0E0] sticky">
        <div className="md:hidden px-4 py-2">
          <select
            className="w-full border rounded px-3 py-2"
            value={activeSection}
            onChange={e => {
              const id = e.target.value;
              setActiveSection(id);
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {[
              { id: 'hero', label: 'Prompts Overview' },
              { id: 'value', label: 'Anatomy' },
              { id: 'toolkit', label: 'Toolkit' },
              { id: 'library', label: 'Library' },
              { id: 'sparkle-prompt', label: 'Sparkle Prompt' },
            ].map(({ id, label }) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        </div>
        <div className="container mx-auto px-6 py-3 hidden  md:flex justify-center md:justify-start space-x-6 md:space-x-8 text-sm font-medium">
          {[
            { id: 'hero', label: 'Prompts Overview' },
            { id: 'value', label: 'Anatomy' },
            { id: 'toolkit', label: 'Toolkit' },
            { id: 'library', label: 'Library' },
            { id: 'sparkle-prompt', label: 'Sparkle Prompt' },
          ].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`hover:text-[#555555] transition-colors ${activeSection === id ? 'text-[#0A0A0A] font-semibold' : 'text-[#666666]'
                }`}
            >
              {label}
            </a>
          ))}
        </div>

      </nav>

      {/* Hero */}
      <section id="hero" className="py-20 text-center bg-[#FFFFFF]">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0A0A0A]">
            Architecting Your Premium AI Prompts
          </h1>
          <p className="mt-4 text-lg text-[#666666] max-w-3xl mx-auto">
            This is a preview of our premium, expert-crafted AI prompts. Moving beyond simple
            queries, our specialized prompt packages engineer high-value instructions that deliver
            unparalleled results for analysts, creators, and builders.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/waitlist" className="bg-[#0A0A0A] text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#222222]">
              Join Our Waitlist
            </Link>
            <Link href="#value" className="bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200">
              Learn More
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-[#0A0A0A]">
            <div className="bg-[#EFEFEF] p-6 rounded-lg shadow-md">
              <p className="text-4xl font-bold text-[#2563EB]">$6,533.87 B</p>
              <p className="text-sm mt-2">Projected Prompt Engineering Market by 2034</p>
            </div>
            <div className="bg-[#EFEFEF] p-6 rounded-lg shadow-md">
              <p className="text-4xl font-bold text-[#2563EB]">32.90%</p>
              <p className="text-sm mt-2">Compound Annual Growth Rate (CAGR)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value */}
      <section id="value" className="py-20 bg-[#EFEFEF]">
  <div className="container mx-auto px-6 max-w-3xl">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A0A0A]">
      The Anatomy of a Premium Prompt
    </h2>
    <div className="space-y-4">
      {checklist.map((item, i) => (
        <Disclosure key={i}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full rounded-lg bg-white px-6 py-4 text-left text-md font-medium text-[#0A0A0A] shadow hover:bg-[#F8F8F8] focus:outline-none focus-visible:ring focus-visible:ring-[#AAAAAA] focus-visible:ring-opacity-75">
                <span>{item.criterion}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-[#666666]`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-6 pt-2 pb-4 text-sm text-[#666666] bg-white rounded-lg border border-t-0 border-[#E0E0E0]">
                <p className="mb-2">{item.description}</p>
                <p className="text-[#333333] text-sm">
                  <strong>Key Techniques:</strong> <span className="text-[#2563EB]">{item.techniques.join(", ")}</span>
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  </div>
</section>

      {/* Toolkit */}
      <section id="toolkit" className="py-20 bg-[#FFFFFF]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A0A0A]">
            The Prompt Architect Toolkit
          </h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            <div className="md:w-1/3 space-y-2">
              {Object.keys(techniques).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTech(key)}
                  className={`tech-btn w-full text-left p-3 rounded-md  ${selectedTech === key
                      ? 'bg-[#666666] text-[white] font-semibold'
                      : 'bg-[#FFFFFF] text-[#333333]'
                    }`}
                >
                  {key}
                </button>
              ))}
            </div>
                       <div className="md:w-2/3 bg-[#EFEFEF] p-6 rounded-lg">
              {selectedTech && (
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#0A0A0A]">{selectedTech}</h3>
                  <p className="text-sm text-[#666666] mb-4 text-left">
                    {techniques[selectedTech].description}
                  </p>
                  <p className="text-sm font-semibold mb-1 text-left text-[#0A0A0A]">Primary Benefit:</p>
                  <p className="text-sm text-[#333333] text-left mb-4">{techniques[selectedTech].benefit}</p>
                  {/* Render the visual representation using dangerouslySetInnerHTML */}
                  {techniques[selectedTech].visual && ( // <--- ADD THIS BLOCK STARTING HERE
                    <>
                      <p className="text-sm font-semibold mb-1 text-left text-[#0A0A0A]">Visual Aid:</p>
                      <div
                        className="bg-white p-4 rounded-md border border-[#E0E0E0] flex justify-center items-center"
                        dangerouslySetInnerHTML={{ __html: techniques[selectedTech].visual }}
                      />
                    </>
                  )} {/* <--- END OF THE BLOCK TO ADD */}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Prompt Library */}
      <section id="library" className="py-20 bg-[#EFEFEF]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A0A0A]">
            The Premium Prompt Library
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.keys(prompts).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedPrompt(key)}
                className={`tab-btn px-4 py-2 rounded-full border font-medium ${selectedPrompt === key
                    ? 'bg-[#0A0A0A] text-white'
                    : 'border-[#CCCCCC] text-[#0A0A0A] hover:bg-[#E0E0E0]'
                  }`}
              >
                {key}
              </button>
            ))}
          </div>
          {selectedPrompt && (
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-md text-left max-w-5xl mx-auto border border-[#E0E0E0]">
              <h3 className="text-2xl font-bold mb-1 text-[#0A0A0A]">{selectedPrompt}</h3>
              <p className="text-sm text-[#2563EB] font-semibold uppercase">
                {prompts[selectedPrompt].category}
              </p>
              <p className="text-[#333333] mt-2 mb-4">{prompts[selectedPrompt].value}</p>
              <div className="mb-4">
                <strong>Techniques:</strong>
                {prompts[selectedPrompt].techniques.map((tech) => (
                  <span
                    key={tech}
                    className="ml-2 inline-block bg-[#white] ring-[#1E40AF] ring-2 text-[#1E40AF] text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h4 className="font-semibold text-lg mb-2 text-[#0A0A0A]">Prompt Template:</h4>
              <pre className="code-block whitespace-pre-wrap bg-[#0A0A0A] text-white p-4 rounded-md text-sm overflow-x-auto">
                <code>{prompts[selectedPrompt].content}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
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

      {/* Premium Prompt Generator */}
      <section id="sparkle-prompt" className="py-20 md:py-32 text-center bg-[#FFFFFF]">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0A0A0A] leading-tight">
            ✨ Try a Premium Prompt ✨
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#666666] max-w-3xl mx-auto">
            See the power of a meticulously crafted prompt! Enter a basic idea, and our AI will
            transform it into a professional, high-value prompt using the techniques outlined in
            our toolkit.
          </p>
          <PremiumPromptGenerator />
        </div>
      </section>

      <Footer />
    </div>
  );
}
