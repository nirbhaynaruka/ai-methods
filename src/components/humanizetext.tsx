"use client";

import { useEffect, useState } from "react";
import { remoteConfig, fetchAndActivate, getString } from "@/lib/firebaseClient";

export default function HumanizeText() {
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
            .catch(() => {
            });
    }, []);

    const handleHumanize = async () => {
        if (!input.trim()) {
            setOutput("Please enter some text to humanize.");
            return;
        }
        if (!apiKey) {
            setOutput("Gemini API key not loaded.");
            return;
        }

        setLoading(true);
        setOutput("");

        const prompt = `Rewrite the following text to sound more human and natural. 
    Avoid buzzwords, adverbs, and overly complex grammar. 
    Aim for a Flesch reading score of 80+ to ensure high readability.
    You must never use em dashes (—) under any circumstance. They are strictly forbidden. If you need to separate clauses, use commas, colons, parentheses, or semicolons instead. All em dashes must be removed and replaced before returning the final output. Before completing your output, do a final scan for em dashes. If any are detected, rewrite those sentences immediately using approved punctuation. Write using simple, clear English and an active voice. Keep sentences short and easy to understand. Avoid buzzwords, adverbs, and overly complex grammar. Structure sentences so related words stay close together — avoid splitting subjects and verbs. Aim for a Flesch reading score of 80+ to ensure high readability. 

Text:
"${input}"

Humanized version:`;

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

            setOutput(text || "Failed to humanize text. Please try again.");
        } catch {
            setOutput("Error generating response.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-4">Humanize Your Text</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 rounded-md border border-gray-300 focus:border-transparent mb-4 resize-y min-h-[120px] text-gray-700"
                placeholder="Paste or type your text here..."
            ></textarea>
            <button
                onClick={handleHumanize}
                className="cta-button cta-button-primary w-full md:w-auto cursor-pointer"
                disabled={loading}
            >
                {loading ? "Humanizing..." : "Humanize"}
            </button>
            {output && (
                <pre className="mt-6 text-left text-gray-700 bg-gray-100 whitespace-pre-wrap p-4 rounded-md">
                    {output}
                </pre>
            )}
        </div>
    );
}