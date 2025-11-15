// File: src/components/AiAdvantage.tsx
"use client";

import { useEffect, useState } from "react";
import { remoteConfig, fetchAndActivate, getString } from "@/lib/firebaseClient";

export default function AiAdvantage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    fetchAndActivate(remoteConfig)
      .then(() => {
        const key = getString(remoteConfig, "GEMINI_API_KEY");
        setApiKey(key);
      })
      .catch((err: any) => {
        console.error("Remote config fetch failed", err);
      });
  }, []);

  const generate = async () => {
    if (!input.trim()) {
      setOutput("Please enter a challenge or role.");
      return;
    }

    if (!apiKey) {
      setOutput("Gemini API key not loaded.");
      return;
    }

    setLoading(true);
    setOutput("");

    const prompt = `As an expert in AI workflow optimization for businesses, analyze the following user input describing their role or a business challenge. Suggest brief, direct suggestions (3–5 concise paragraphs or bullet points) on how AI Methods (premium AI prompts and custom solutions) can help them, focusing on practical AI applications and benefits. Avoid markdown characters (*, #) in the output.

User Input: "${input}"

Suggestions:`;

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

      setOutput(text || "No suggestions returned. Try again.");
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
        className="w-full p-4 rounded-md border mb-4 resize-y min-h-[100px] text-[#333333] placeholder-[#CCCCCC]"
        placeholder="e.g., I'm a marketing manager struggling with content ideas..."
      ></textarea>
      <button
        onClick={generate}
        className="bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-semibold w-full md:w-auto hover:bg-[#555555] cursor-pointer"
      >
        {loading ? "Analyzing..." : "Suggest My AI Workflow"}
      </button>
      {output && (
        <pre className="mt-6 text-left text-[#333333] bg-[#EFEFEF] whitespace-pre-wrap p-4 rounded-md">
          {output}
        </pre>
      )}
    </div>
  );
}
