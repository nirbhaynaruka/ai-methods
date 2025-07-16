"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import HumanizeText from "@/components/humanizetext";

export default function Page() {
  return (
    <div className="bg-[#F8F8F8] text-[#0A0A0A] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Humanize Your Text using AI Methods
          </h1>
          <p className="text-lg text-[#666666] mb-8 text-center">
            Paste your text below and click <b>Humanize</b> to rewrite it for clarity and readability.<br />
          </p>
          <HumanizeText />
        </div>
      </main>
      <Footer />
    </div>
  );
}