// File: src/components/PremiumPromptGenerator.tsx
"use client";

import { useEffect, useState } from "react";
import { remoteConfig } from "@/lib/firebaseClient";

export default function PremiumPromptGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    remoteConfig
      .fetchAndActivate()
      .then(() => {
        const key = remoteConfig.getString("GEMINI_API_KEY");
        setApiKey(key);
      })
      .catch((err) => {
        console.error("Remote config fetch failed", err);
      });
  }, []);

  const generate = async () => {
    if (!input.trim()) {
      setOutput("Please enter a basic idea to generate a premium prompt.");
      return;
    }

    if (!apiKey) {
      setOutput("Gemini API key not loaded.");
      return;
    }

    setLoading(true);
    setOutput("");

    const prompt = `You are an expert prompt engineer specializing in crafting highly effective, high-value prompts.
A user has provided a basic idea for a prompt. Your task is to transform this basic idea into a concise, premium-grade prompt suitable for professional use. Focus on clarity, directness, and value. Avoid markdown characters (*, #) in the output. Structure the output into brief, direct paragraphs.

Basic Idea: "${input}"

Premium Prompt:`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      setOutput(text || "Failed to generate prompt. Please try again.");
    } catch {
      setOutput("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#F8F8F8] p-6 rounded-lg shadow-md">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-4 rounded-md border border-[#CCCCCC] focus:ring-2 focus:ring-[#666666] focus:border-transparent mb-4 resize-y min-h-[120px] text-[#333333] placeholder-[#CCCCCC]"
        placeholder="e.g., Write a marketing email for a new software feature called 'AI Methods Pro'."
      ></textarea>
      <button
        onClick={generate}
        className="bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-semibold w-full md:w-auto hover:bg-[#555555] cursor-pointer"
      >
        {loading ? "Generating..." : "Generate Premium Prompt"}
      </button>
      {output && (
        <pre className="mt-6 text-left text-[#333333] bg-[#EFEFEF] whitespace-pre-wrap p-4 rounded-md">
          {output}
        </pre>
      )}
    </div>
  );
}
