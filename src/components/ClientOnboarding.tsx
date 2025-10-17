'use client'; // This directive must be at the very top!

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClientData } from '@/lib/onboardingKeys'; // Import ClientData interface/type

// === 1. Client Entry Component ===
// This component manages the overall state (authenticated or not) and handles the client-server boundary.
export default function ClientOnboardingContent({ clientData }: { clientData: ClientData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const clientSlug = clientData.slug;

  // Check authentication status on initial load using a client-side hook
  useEffect(() => {
    // Check session storage for an existing authentication flag
    if (typeof window !== 'undefined') {
      const storedAuth = sessionStorage.getItem(`onboarding-auth-${clientSlug}`);
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, [clientSlug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-[#F8F8F8]">
        <p className="text-[#666666]">Loading client portal...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#EFEFEF] text-[#0A0A0A] min-h-screen flex flex-col">
      {/* Note: Header/Footer are often Server Components, but imported here 
          to be included inside the top-level client boundary for layout consistency */}
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        {isAuthenticated ? (
          <OnboardingForm clientName={clientData.name} />
        ) : (
          <PasswordGate clientData={clientData} onAuthenticated={() => setIsAuthenticated(true)} />
        )}
      </main>
      <Footer />
    </div>
  );
}


// --- Client Sub-Components ---

// 1.1 Password Protection Component
function PasswordGate({ clientData, onAuthenticated }: { clientData: ClientData; onAuthenticated: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === clientData.key) {
      onAuthenticated();
      // Store a simple auth flag in sessionStorage (session only, not persistent)
      sessionStorage.setItem(`onboarding-auth-${clientData.slug}`, 'true');
    } else {
      setError('Incorrect access code. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl border border-[#E0E0E0] mt-16">
      <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Secure Access Required</h2>
      <p className="text-[#666666] mb-6">
        Please enter the unique access code provided by AI Methods for **{clientData.name}**.
      </p>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          className="w-full px-4 py-3 border border-[#CCCCCC] rounded-md text-[#333333] focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all duration-200"
          placeholder="Enter Access Code"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="cta-button cta-button-primary w-full"
        >
          Unlock Onboarding
        </button>
      </form>
    </div>
  );
}

// 1.2 Main Onboarding Form Component (Client Intake)
function OnboardingForm({ clientName }: { clientName: string }) {
    const [form, setForm] = useState({
        name: '',
        title: '',
        goal1: '',
        goal2: '',
        goal3: '',
        bottleneck: '',
        techStack: '',
        dataStorage: '',
        communicationBottleneck: '',
        adminTime: '',
        uiAssets: '',
        aiFeaturePriority1: '',
        aiFeaturePriority2: '',
        aiFeaturePriority3: '',
        dataSharing: '',
        budget: '',
        targetDate: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', success: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ text: '', success: false });

        // IMPORTANT: Use your actual Formspree endpoint or a Firebase Cloud Function for submission
        const FORM_SUBMISSION_ENDPOINT = 'https://formspree.io/f/mdkzlkvv';

        const submissionData = {
          ...form,
          'Client Name': clientName,
          'Form Type': 'Client Onboarding Intake',
        };

        try {
            const response = await fetch(FORM_SUBMISSION_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                setMessage({ text: 'Success! Your onboarding brief has been submitted. Check your email for a link to schedule your Strategy Kickoff Call.', success: true });
                // Reset form state only to basic fields to ensure no personal data is retained unnecessarily
                setForm({ ...form, name: '', title: '', goal1: '', goal2: '', goal3: '' }); 
            } else {
                setMessage({ text: 'Submission failed. Please check all required fields.', success: false });
            }
        } catch (error) {
            setMessage({ text: 'Network error. Please try again.', success: false });
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = "w-full px-4 py-3 border border-[#E0E0E0] rounded-md text-[#333333] focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all duration-200";
    const labelClass = "block text-sm font-semibold mb-2 text-[#0A0A0A] mt-4";

    return (
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-[#E0E0E0] my-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-2">
                AI Transformation Onboarding: {clientName}
            </h1>
            <p className="text-xl text-[#666666] mb-8">
                Your roadmap to AI-driven growth starts here.
            </p>

            <div className="bg-[#EFEFEF] p-4 rounded-md mb-8 text-sm text-[#333333]">
                <h2 className="font-bold mb-2">Process Alignment</h2>
                <p>This intake form ensures our strategy session is focused on delivering the fastest, highest-impact AI solution.</p>
                <p className="mt-2"><strong>Next Step:</strong> Upon submission, you will receive a link to schedule your Strategy Kickoff Call.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* SECTION 1: Strategic Alignment */}
                <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 mb-4">1. Strategic Alignment</h2>
                
                <label className={labelClass} htmlFor="name">Primary Contact Name</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Your Full Name" />
                
                <label className={labelClass} htmlFor="title">Your Role/Title</label>
                <input id="title" name="title" type="text" required value={form.title} onChange={handleChange} className={inputClass} placeholder="e.g., Head of Operations, Founder" />

                <label className={labelClass} htmlFor="goal1">Top 3 Business Goals (Next 12-18 Months)</label>
                <input id="goal1" name="goal1" type="text" required value={form.goal1} onChange={handleChange} className={inputClass} placeholder="Goal 1: e.g., Increase member retention by 15%." />
                <input name="goal2" type="text" required value={form.goal2} onChange={handleChange} className={inputClass} placeholder="Goal 2: e.g., Reduce customer support costs by 20%." />
                <input name="goal3" type="text" required value={form.goal3} onChange={handleChange} className={inputClass} placeholder="Goal 3: e.g., Launch new digital product line." />

                {/* SECTION 2: Workflows & Pain Points */}
                <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 pt-8 mb-4">2. Existing Workflows & Pain Points</h2>

                <label className={labelClass} htmlFor="bottleneck">What is your #1 operational bottleneck today?</label>
                <textarea id="bottleneck" name="bottleneck" rows={3} required value={form.bottleneck} onChange={handleChange} className={inputClass} placeholder="Describe the single biggest time sink or error source in your current workflow (e.g., manual posture review, complex diet plan updates)." />

                <label className={labelClass} htmlFor="techStack">Current Tech Stack for Core Operations (Live Sessions, CRM, ERP)</label>
                <input id="techStack" name="techStack" type="text" required value={form.techStack} onChange={handleChange} className={inputClass} placeholder="e.g., Zoom/Google Meet for classes, Zoho CRM, custom billing." />

                <label className={labelClass} htmlFor="dataStorage">Data Storage Locations (Important for AI Training)</label>
                <input id="dataStorage" name="dataStorage" type="text" required value={form.dataStorage} onChange={handleChange} className={inputClass} placeholder="e.g., AWS S3 for videos, MongoDB for member profiles, Excel for progress logs." />

                <label className={labelClass} htmlFor="adminTime">Estimated % of Staff Time Spent on Administrative/Repetitive Tasks (0-100)</label>
                <input id="adminTime" name="adminTime" type="number" min="0" max="100" required value={form.adminTime} onChange={handleChange} className={inputClass} placeholder="e.g., 40" />

                <label className={labelClass} htmlFor="uiAssets">Do you have existing UI/UX or brand assets for a new application?</label>
                <select id="uiAssets" name="uiAssets" required value={form.uiAssets} onChange={handleChange} className={inputClass}>
                    <option value="">Select an option</option>
                    <option value="Yes - Link Provided">Yes (We have assets and a style guide)</option>
                    <option value="No - Needs Design Support">No (AI Methods will need to provide design support)</option>
                    <option value="Basic Brand - Needs UI">Basic Brand (We have a logo/colors, need UI/UX)</option>
                </select>

                {/* SECTION 3: AI Requirements & Investment */}
                <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 pt-8 mb-4">3. AI Requirements & Investment</h2>

                <label className={labelClass}>Top 3 Priority AI Features</label>
                <input name="aiFeaturePriority1" type="text" required value={form.aiFeaturePriority1} onChange={handleChange} className={inputClass} placeholder="Priority 1: e.g., Real-time Yoga Pose Correction" />
                <input name="aiFeaturePriority2" type="text" required value={form.aiFeaturePriority2} onChange={handleChange} className={inputClass} placeholder="Priority 2: e.g., Automated Lead Qualification Chatbot" />
                <input name="aiFeaturePriority3" type="text" required value={form.aiFeaturePriority3} onChange={handleChange} className={inputClass} placeholder="Priority 3: e.g., Progress-based Course Recommendation Engine" />

                <label className={labelClass} htmlFor="dataSharing">Data Readiness: Can we get anonymized access to historical data (e.g., past 6 months) for model validation and training?</label>
                <select id="dataSharing" name="dataSharing" required value={form.dataSharing} onChange={handleChange} className={inputClass}>
                    <option value="">Select readiness level</option>
                    <option value="Yes - Full Access with NDA">Yes, immediately upon signing NDA.</option>
                    <option value="Need to Scope Data Access">We need to scope this carefully; access is restricted.</option>
                    <option value="No - Data Unavailable">No, data cannot be shared.</option>
                </select>

                <label className={labelClass} htmlFor="budget">Preliminary Budget Allocation for MVP Phase (initial 3-month project)</label>
                <select id="budget" name="budget" required value={form.budget} onChange={handleChange} className={inputClass}>
                    <option value="">Select Budget Range</option>
                    <option value="Under $10,000 USD">Under $10,000 USD</option>
                    <option value="$10,000 - $30,000 USD">$10,000 - $30,000 USD</option>
                    <option value="$30,000 - $50,000 USD">$30,000 - $50,000 USD</option>
                    <option value="Above $50,000 USD">Above $50,000 USD</option>
                </select>
                
                <label className={labelClass} htmlFor="targetDate">Target MVP Go-Live Date (Month/Year)</label>
                <input id="targetDate" name="targetDate" type="text" required value={form.targetDate} onChange={handleChange} className={inputClass} placeholder="e.g., January 2026 or Q1 2026" />


                <button
                    type="submit"
                    disabled={submitting}
                    className="cta-button cta-button-primary w-full mt-10 disabled:opacity-50"
                >
                    {submitting ? 'Submitting Brief...' : 'Submit Onboarding Brief'}
                </button>
            </form>

            {message.text && (
                <div className={`mt-4 p-3 rounded-md text-center text-sm ${message.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}
