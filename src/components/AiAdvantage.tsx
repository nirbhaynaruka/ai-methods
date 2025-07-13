// File: src/components/AiAdvantage.tsx
"use client";

import { useEffect, useState } from "react";
import { remoteConfig } from "@/lib/firebaseClient";

export default function AiAdvantage() {
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
      setOutput("Please enter a challenge or role.");
      return;
    }

    if (!apiKey) {
      setOutput("Gemini API key not loaded.");
      return;
    }

    setLoading(true);
    setOutput("");

    const prompt = `As an expert in AI workflow optimization for businesses, analyze the following user input describing their role or a business challenge. Suggest brief, direct suggestions (3–5 concise paragraphs or bullet points) on how AiMethods (premium AI prompts and custom solutions) can help them, focusing on practical AI applications and benefits. Avoid markdown characters (*, #) in the output.

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
    } catch (e) {
      setOutput("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 resize-y min-h-[100px] text-gray-700"
        placeholder="e.g., I'm a marketing manager struggling with content ideas..."
      ></textarea>
      <button
        onClick={generate}
        className="cta-button cta-button-primary w-full md:w-auto cursor-pointer"
      >
        {loading ? "Analyzing..." : "Suggest My AI Workflow"}
      </button>
      {output && (
        <pre className="mt-6 text-left text-gray-700 bg-gray-100 whitespace-pre-wrap p-4 rounded-md">
          {output}
        </pre>
      )}
    </div>
  );
}
