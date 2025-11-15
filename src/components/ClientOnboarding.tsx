'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClientData } from '@/lib/onboardingKeys';
import { db } from '@/lib/firebaseClient';
import jsPDF from 'jspdf';
import {
  User,
  Target,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Calendar,
  Users,
  ChevronRight,
  BarChart3,
  Clock,
  Shield,
  Zap,
  BookOpen
} from 'lucide-react';

// ==========================
// Types
// ==========================

type OnboardingFormState = {
  name: string;
  title: string;
  goal1: string;
  goal2: string;
  goal3: string;
  bottleneck: string;
  techStack: string;
  dataStorage: string;
  adminTime: string; // 0-100
  uiAssets: string;
  aiFeaturePriority1: string;
  aiFeaturePriority2: string;
  aiFeaturePriority3: string;
  dataSharing: string;
  budget: string;
  targetDate: string;

  // NEW v2 fields
  kpis: string;
  integrations: string;
  cloud: string;
  securityCompliance: string;
  pastAIPilots: string;
  teamSkills: string;
  changeReadiness: string;
  preferredDelivery: string;
  pilotScope: string;
  dataOwners: string;
  ndaRequired: string;
  constraints: string;
};

// Heuristic AI Readiness score (0-10)
const computeReadiness = (f: OnboardingFormState) => {
  let score = 0;
  if (f.pastAIPilots.trim()) score += 2; // has prior AI exposure
  if (['Medium', 'High'].includes(f.changeReadiness)) score += f.changeReadiness === 'High' ? 2 : 1;
  if (['Basic', 'Advanced'].includes(f.teamSkills)) score += f.teamSkills === 'Advanced' ? 2 : 1;
  if (f.dataSharing.startsWith('Yes')) score += 2; // data shareable with NDA
  if (f.cloud && f.cloud !== 'None') score += 1; // some cloud baseline
  return Math.max(0, Math.min(10, score));
};

// ==========================
// 1. Client Entry Component
// ==========================
export default function ClientOnboardingContent({ clientData }: { clientData: ClientData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const clientSlug = clientData.slug;
  const clientName = clientData.name;

  // Initial auth + submission status
  useEffect(() => {
    const checkStatus = async () => {
      if (typeof window !== 'undefined') {
        const storedAuth = localStorage.getItem(`onboarding-auth-${clientSlug}`);
        if (storedAuth === 'true') {
          setIsAuthenticated(true);
        }
      }

      try {
        const { collection, doc, getDoc } = await import('firebase/firestore');
        // Use slug as canonical doc id
        const docRef = doc(collection(db, 'clientOnboardingSubmissions'), clientSlug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsSubmitted(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem(`onboarding-doc-id-${clientSlug}`, clientSlug);
            localStorage.setItem(`onboarding-submitted-${clientSlug}`, 'true');
          }
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
      }

      setIsLoading(false);
    };

    checkStatus();
  }, [clientSlug]);

  // Re-check submission status when authenticated (new session)
  useEffect(() => {
    if (isAuthenticated) {
      const checkSubmitted = async () => {
        try {
          const storedDocId = typeof window !== 'undefined'
            ? localStorage.getItem(`onboarding-doc-id-${clientSlug}`)
            : null;
          if (storedDocId) {
            const { collection, doc, getDoc } = await import('firebase/firestore');
            const docRef = doc(collection(db, 'clientOnboardingSubmissions'), storedDocId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setIsSubmitted(true);
              if (typeof window !== 'undefined') {
                localStorage.setItem(`onboarding-submitted-${clientSlug}`, 'true');
              }
            }
          }
        } catch (error) {
          console.error('Error checking submission status after auth:', error);
        }
      };
      checkSubmitted();
    }
  }, [isAuthenticated, clientSlug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-[#F8F8F8]">
        <p className="text-[#666666]">Loading client portal...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#EFEFEF] text-[#0A0A0A] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        {isAuthenticated ? (
          isSubmitted && !isEditing ? (
            <Dashboard clientName={clientName} clientSlug={clientSlug} onEdit={() => setIsEditing(true)} />
          ) : (
            <OnboardingForm
              clientName={clientName}
              clientSlug={clientSlug}
              isEditing={isEditing}
              onSubmitSuccess={() => {
                setIsSubmitted(true);
                setIsEditing(false);
              }}
            />
          )
        ) : (
          <PasswordGate clientData={clientData} onAuthenticated={() => setIsAuthenticated(true)} />
        )}
      </main>
      <Footer />
    </div>
  );
}

// ==========================
// Sub-components
// ==========================

const Dashboard = ({ clientName, clientSlug, onEdit }: { clientName: string; clientSlug: string; onEdit: () => void }) => {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [callScheduled, setCallScheduled] = useState(false);
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [submittedReview, setSubmittedReview] = useState<any>(null);
  const [editingReview, setEditingReview] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { collection, doc, getDoc } = await import('firebase/firestore');
        const docRef = doc(collection(db, 'clientOnboardingSubmissions'), clientSlug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const { timestamp, ...formFields } = data as any;
          setFormData(formFields);
          setCallScheduled(formFields.callScheduled || false);
        }

        // Load existing review
        const reviewDocRef = doc(collection(db, 'testimonials'), clientName);
        const reviewSnap = await getDoc(reviewDocRef);
        if (reviewSnap.exists()) {
          setSubmittedReview(reviewSnap.data());
        }
      } catch (error) {
        console.error('Error loading data from Firestore:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    // Check if call has been scheduled before
    if (typeof window !== 'undefined') {
      const scheduled = localStorage.getItem(`call-scheduled-${clientSlug}`);
      if (scheduled === 'true') {
        setCallScheduled(true);
      }
    }
  }, [clientSlug, clientName]);

  useEffect(() => {
    // Listen for Calendly events
    const handleCalendlyEvent = (e: any) => {
      if (e.data.event === 'calendly.event_scheduled') {
        const eventDetails = e.data.payload;
        setCallScheduled(true);
        setShowCalendlyModal(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`call-scheduled-${clientSlug}`, 'true');
          localStorage.setItem(`call-details-${clientSlug}`, JSON.stringify(eventDetails));
        }

        // Update Firestore
        const updateFirestore = async () => {
          try {
            const { doc, updateDoc, collection, setDoc, serverTimestamp } = await import('firebase/firestore');
            // Update existing onboarding submission doc
            const docRef = doc(collection(db, 'clientOnboardingSubmissions'), clientSlug);
            await updateDoc(docRef, {
              callScheduled: true,
              callScheduledAt: serverTimestamp(),
              callDetails: eventDetails
            });

            // Create/update progress_tracker collection
            const progressRef = doc(collection(db, 'progress_tracker'), clientSlug);
            await setDoc(progressRef, {
              clientSlug,
              formSubmitted: true,
              callScheduled: true,
              callScheduledAt: serverTimestamp(),
              callDetails: eventDetails,
              pilotInProgress: false,
              mvpLaunched: false
            }, { merge: true });
          } catch (error) {
            console.error('Error updating Firestore with call scheduling:', error);
          }
        };
        updateFirestore();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleCalendlyEvent);
      return () => window.removeEventListener('message', handleCalendlyEvent);
    }
  }, [clientSlug]);

  const handleScheduleCall = () => {
    setShowCalendlyModal(true);
  };

  const handleDownloadSummary = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`AI Transformation Onboarding Summary for ${clientName}`, 20, 20);
    doc.setFontSize(12);
    let y = 40;
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== 'timestamp') {
        doc.text(`${key}: ${value}`, 20, y);
        y += 10;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
    doc.save(`${clientSlug}-onboarding-summary.pdf`);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);

    try {
      const { collection, doc, setDoc, serverTimestamp } = await import('firebase/firestore');
      const reviewRef = doc(collection(db, 'testimonials'), clientName);
      await setDoc(reviewRef, {
        approved: false,
        createdAt: serverTimestamp(),
        name: formData.name,
        client:clientName,
        review: reviewComments,
        role: formData.title,
      });

      setReviewComments('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-[#666666]">Loading dashboard...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-[#E0E0E0] my-16">
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-4 flex items-center gap-3">
          <User className="w-10 h-10 text-[#0A0A0A]" />
          Dashboard: {clientName}
        </h1>
        <p className="text-[#666666] mb-8">No onboarding data found. Please submit the form first.</p>
        <button onClick={onEdit} className="cta-button cta-button-primary">Go to Form</button>
      </div>
    );
  }

  // Calculate progress based on submission date (simplified)
  const progressStage = 'Form Submitted'; // Could be dynamic based on time or status

  // Calculate months to target date (simplified)
  const targetDate = formData.targetDate || '';
  const monthsToLaunch = targetDate.includes('2026') ? '6-12 months' : 'TBD';

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-[#E0E0E0]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0A0A0A] mb-2 flex items-center gap-3">
          <User className="w-10 h-10 text-[#0A0A0A]" />
          Welcome back, {clientName}
        </h1>
        <p className="text-xl text-[#666666]">Your AI transformation journey is underway.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Progress Tracker Card */}
        <div className="bg-gradient-to-br from-[#0A0A0A] to-[#333333] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Progress Tracker</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm">Form Submitted</span>
            </div>
            {callScheduled ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Kickoff Call Scheduled</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 opacity-60">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Kickoff Call Pending</span>
              </div>
            )}
            <div className="flex items-center gap-2 opacity-40">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Pilot in Progress</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Summary Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Key Metrics</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#666666]">AI Readiness Score</p>
              <p className="text-2xl font-bold text-[#0A0A0A]">{formData['AI Readiness Score (0-10)'] ?? '—'}/10</p>
            </div>
            <div>
              <p className="text-sm text-[#666666]">Budget Range</p>
              <p className="text-lg font-semibold text-[#0A0A0A]">{formData.budget || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-[#666666]">Target Launch</p>
              <p className="text-lg font-semibold text-[#0A0A0A]">{formData.targetDate || '—'}</p>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-[#EFEFEF] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <ChevronRight className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Next Steps</h3>
          </div>
          <p className="text-sm text-[#666666] mb-4">
            {callScheduled
              ? "Your Strategy Kickoff Call is scheduled. Check your email for confirmation details."
              : "Check your email for a link to schedule your Strategy Kickoff Call."
            }
          </p>
          <button
            onClick={handleScheduleCall}
            disabled={callScheduled}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              callScheduled
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-[#0A0A0A] text-white hover:bg-[#333333]'
            }`}
          >
            {callScheduled ? 'Call Scheduled' : 'Schedule Call'}
          </button>
        </div>

        {/* Review Section */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-[#0A0A0A] mb-4">
            {submittedReview ? 'Your Review' : 'Submit Your Review'}
          </h3>
          {submittedReview && !editingReview ? (
            <div className="space-y-4">
              <p className="text-sm text-[#666666]">{submittedReview.review}</p>
              <button
                onClick={() => {
                  setEditingReview(true);
                  setReviewComments(submittedReview.review);
                }}
                className="cta-button cta-button-secondary"
              >
                Edit Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0A0A0A]">Comments</label>
                <textarea
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E0E0E0] rounded-md text-[#333333] focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all duration-200"
                  placeholder="Share your feedback..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submittingReview}
                className="cta-button cta-button-primary disabled:opacity-50"
              >
                {submittingReview ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Information Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Contact Info</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm"><strong>Name:</strong> {formData.name}</p>
            <p className="text-sm"><strong>Title:</strong> {formData.title}</p>
          </div>
        </div>

        {/* Business Goals Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Business Goals</h3>
          </div>
          <ul className="space-y-1 text-sm">
            {[formData.goal1, formData.goal2, formData.goal3].filter(Boolean).map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Challenges Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Key Challenges</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Bottleneck:</strong> {formData.bottleneck}</p>
            <p><strong>Admin Time:</strong> {formData.adminTime}%</p>
          </div>
        </div>

        {/* AI Priorities Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">AI Priorities</h3>
          </div>
          <ol className="space-y-1 text-sm list-decimal list-inside">
            <li>{formData.aiFeaturePriority1}</li>
            <li>{formData.aiFeaturePriority2}</li>
            <li>{formData.aiFeaturePriority3}</li>
          </ol>
        </div>

        {/* AI Readiness Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">AI Readiness</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#0A0A0A] h-2 rounded-full"
                  style={{ width: `${(formData['AI Readiness Score (0-10)'] || 0) * 10}%` }}
                ></div>
              </div>
              <span className="text-xs">{formData['AI Readiness Score (0-10)'] ?? '—'}/10</span>
            </div>
            <p><strong>Cloud:</strong> {formData.cloud || '—'}</p>
            <p><strong>Compliance:</strong> {formData.securityCompliance || '—'}</p>
            <p><strong>Team Skills:</strong> {formData.teamSkills || '—'}</p>
          </div>
        </div>

        {/* KPIs & Pilot Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">KPIs & Pilot</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>KPIs:</strong> {formData.kpis || '—'}</p>
            <p><strong>Integrations:</strong> {formData.integrations || '—'}</p>
            <p><strong>Delivery:</strong> {formData.preferredDelivery || '—'}</p>
            <p><strong>Pilot Scope:</strong> {formData.pilotScope ? formData.pilotScope.substring(0, 50) + '...' : '—'}</p>
          </div>
        </div>

        {/* Team & Support Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Team & Support</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Data Owners:</strong> {formData.dataOwners || '—'}</p>
            <p><strong>Change Readiness:</strong> {formData.changeReadiness || '—'}</p>
            <p className="text-[#666666]">AI Methods Support: support@aimethods.com</p>
          </div>
        </div>

        {/* Upcoming Milestones Card */}
        <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Upcoming Milestones</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>MVP Launch:</strong> {monthsToLaunch}</p>
            <p><strong>Next Review:</strong> {callScheduled ? `Post-Kickoff Call (${formData.callDetails?.start_time ? new Date(formData.callDetails.start_time).toLocaleDateString() : 'TBD'})` : 'Post-Kickoff Call'}</p>
          </div>
        </div>

        {/* Resources Card */}
        <div className="bg-[#EFEFEF] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-[#0A0A0A]" />
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Resources</h3>
          </div>
          <div className="space-y-2 text-sm">
            <a href="#" className="block text-[#0A0A0A] hover:underline">AI Implementation Guide</a>
            <a href="#" className="block text-[#0A0A0A] hover:underline">Case Studies</a>
            <a href="#" className="block text-[#0A0A0A] hover:underline">Webinar Recordings</a>
          </div>
        </div>

        {/* Call Details Card */}
        {callScheduled && (
          <div className="bg-white border border-[#E0E0E0] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-[#0A0A0A]" />
              <h3 className="text-lg font-semibold text-[#0A0A0A]">Scheduled Call Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Date & Time:</strong> {formData.callDetails?.start_time ? new Date(formData.callDetails.start_time).toLocaleString() : 'TBD'}</p>
              <p><strong>Status:</strong> Scheduled</p>
            </div>
          </div>
        )}
      </div>

      {/* Calendly Modal */}
      {showCalendlyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Schedule Your Kickoff Call</h3>
              <button
                onClick={() => setShowCalendlyModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <iframe
                src="https://calendly.com/aimethods-aimethods?embed_domain=localhost&embed_type=Inline"
                width="100%"
                height="600"
                frameBorder="0"
                title="Calendly Scheduling"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-[#E0E0E0]">
        <button onClick={onEdit} className="cta-button cta-button-secondary">
          Edit Information
        </button>
        <button onClick={handleDownloadSummary} className="cta-button cta-button-primary flex items-center gap-2">
          Download Summary
        </button>
        <p className="text-sm text-[#666666]">Need changes? Edit your onboarding brief anytime.</p>
      </div>
    </div>
  );
}

function PasswordGate({ clientData, onAuthenticated }: { clientData: ClientData; onAuthenticated: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === clientData.key) {
      onAuthenticated();
      localStorage.setItem(`onboarding-auth-${clientData.slug}`, 'true');
    } else {
      setError('Incorrect access code. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl border border-[#E0E0E0] mt-16">
      <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Secure Access Required</h2>
      <p className="text-[#666666] mb-6">
        Please enter the unique access code provided by AI Methods for <strong>{clientData.name}</strong>.
      </p>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          value={password}
          autoComplete="off"
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          className="w-full px-4 py-3 border border-[#CCCCCC] rounded-md text-[#333333] focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all duration-200"
          placeholder="Enter Access Code"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="cta-button cta-button-primary w-full">Unlock Onboarding</button>
      </form>
    </div>
  );
}

const OnboardingForm: React.FC<{
  clientName: string;
  clientSlug: string;
  isEditing: boolean;
  onSubmitSuccess: () => void;
}> = ({ clientName, clientSlug, isEditing, onSubmitSuccess }) => {
  const [form, setForm] = useState<OnboardingFormState>({
    name: '',
    title: '',
    goal1: '',
    goal2: '',
    goal3: '',
    bottleneck: '',
    techStack: '',
    dataStorage: '',
    adminTime: '',
    uiAssets: '',
    aiFeaturePriority1: '',
    aiFeaturePriority2: '',
    aiFeaturePriority3: '',
    dataSharing: '',
    budget: '',
    targetDate: '',
    // v2
    kpis: '',
    integrations: '',
    cloud: '',
    securityCompliance: '',
    pastAIPilots: '',
    teamSkills: '',
    changeReadiness: '',
    preferredDelivery: '',
    pilotScope: '',
    dataOwners: '',
    ndaRequired: '',
    constraints: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean }>({ text: '', success: false });

  // Load form data from Firestore if editing
  useEffect(() => {
    if (isEditing) {
      const loadData = async () => {
        try {
          const { collection, doc, getDoc } = await import('firebase/firestore');
          const docRef = doc(collection(db, 'clientOnboardingSubmissions'), clientSlug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as any;
            const {
              timestamp,
              'Client Name': clientNameField,
              'Form Type': formType,
              'Submitted At': submittedAt,
              ...formFields
            } = data;
            setForm((prev) => ({ ...prev, ...(formFields as Partial<OnboardingFormState>) }));
          }
        } catch (error) {
          console.error('Error loading form data from Firestore:', error);
        }
      };
      loadData();
    }
  }, [isEditing, clientSlug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', success: false });

    const FORM_SUBMISSION_ENDPOINT = 'https://formspree.io/f/mdkzlkvv';

    // clamp adminTime
    const admin = Math.max(0, Math.min(100, Number(form.adminTime || 0)));
    const safeForm: OnboardingFormState = { ...form, adminTime: String(Number.isFinite(admin) ? admin : 0) };

    const aiReadinessScore = computeReadiness(safeForm);

    const submissionData = {
      ...safeForm,
      'Client Name': clientName,
      'Client Slug': clientSlug,
      'Form Type': 'Client Onboarding Intake',
      'Submitted At': new Date().toISOString(),
      'Schema Version': 'v2',
      'AI Readiness Score (0-10)': aiReadinessScore,
    } as const;

    try {
      const { collection, doc, setDoc, serverTimestamp } = await import('firebase/firestore');
      const docRef = doc(collection(db, 'clientOnboardingSubmissions'), clientSlug);
      await setDoc(docRef, { ...submissionData, timestamp: serverTimestamp() });

      // Create progress_tracker document on form submission
      const progressRef = doc(collection(db, 'progress_tracker'), clientSlug);
      await setDoc(progressRef, {
        clientSlug,
        formSubmitted: true,
        formSubmittedAt: serverTimestamp(),
        callScheduled: false,
        pilotInProgress: false,
        mvpLaunched: false
      }, { merge: true });

      const response = await fetch(FORM_SUBMISSION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setMessage({
          text: 'Success. Your onboarding brief has been submitted. Check your email for a link to schedule your Strategy Kickoff Call.',
          success: true,
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem(`onboarding-doc-id-${clientSlug}`, clientSlug);
          localStorage.setItem(`onboarding-form-${clientSlug}`, JSON.stringify(safeForm));
          localStorage.setItem(`onboarding-submitted-${clientSlug}`, 'true');
        }
        onSubmitSuccess();
        setForm((prev) => ({ ...prev, name: '', title: '', goal1: '', goal2: '', goal3: '' }));
      } else {
        setMessage({ text: 'Submission failed. Please check all required fields.', success: false });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ text: 'Network error. Please try again.', success: false });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-[#E0E0E0] rounded-md text-[#333333] focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all duration-200';
  const labelClass = 'block text-sm font-semibold mb-2 text-[#0A0A0A] mt-4';

  return (
    <div className="container mx-auto px-6 max-w-4xl bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-[#E0E0E0] my-16">
      <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-2">AI Transformation Onboarding: {clientName}</h1>
      <p className="text-xl text-[#666666] mb-8">Your roadmap to AI-driven growth starts here.</p>

      <div className="bg-[#EFEFEF] p-4 rounded-md mb-8 text-sm text-[#333333]">
        <h2 className="font-bold mb-2">Process Alignment</h2>
        <p>This intake form ensures our strategy session is focused on delivering the fastest, highest-impact AI solution.</p>
        {/* <p className="mt-2"><strong>Next Step:</strong> Upon submission, you will receive a link to schedule your Strategy Kickoff Call.</p> */}
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
        <input name="goal2" type="text"  value={form.goal2} onChange={handleChange} className={inputClass} placeholder="Goal 2: e.g., Reduce customer support costs by 20%." />
        <input name="goal3" type="text"  value={form.goal3} onChange={handleChange} className={inputClass} placeholder="Goal 3: e.g., Launch new digital product line." />

        {/* SECTION 2: Workflows & Pain Points */}
        <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 pt-8 mb-4">2. Existing Workflows & Pain Points</h2>

        <label className={labelClass} htmlFor="bottleneck">What is your #1 operational bottleneck today?</label>
        <textarea id="bottleneck" name="bottleneck" rows={3} required value={form.bottleneck} onChange={handleChange} className={inputClass} placeholder="Describe the single biggest time sink or error source in your current workflow." />

        <label className={labelClass} htmlFor="techStack">Current Tech Stack for Core Operations (CRM, ERP, Comms)</label>
        <input id="techStack" name="techStack" type="text" required value={form.techStack} onChange={handleChange} className={inputClass} placeholder="e.g., Slack, HubSpot, Zoho, custom billing" />

        <label className={labelClass} htmlFor="dataStorage">Data Storage Locations (Important for AI Training)</label>
        <input id="dataStorage" name="dataStorage" type="text" required value={form.dataStorage} onChange={handleChange} className={inputClass} placeholder="e.g., AWS S3, Postgres, BigQuery, Excel, APIs" />

        <label className={labelClass} htmlFor="adminTime">Estimated % of Staff Time Spent on Administrative or Repetitive Tasks (0-100)</label>
        <input id="adminTime" name="adminTime" type="number" inputMode="numeric" min="0" max="100" required value={form.adminTime} onChange={handleChange} className={inputClass} placeholder="e.g., 40" />

        <label className={labelClass} htmlFor="uiAssets">Do you have existing UI or brand assets for a new application?</label>
        <select id="uiAssets" name="uiAssets" required value={form.uiAssets} onChange={handleChange} className={inputClass}>
          <option value="">Select an option</option>
          <option value="Yes - Link Provided">Yes (We have assets and a style guide)</option>
          <option value="No - Needs Design Support">No (AI Methods will need to provide design support)</option>
          <option value="Basic Brand - Needs UI">Basic Brand (We have a logo or colors, need UI/UX)</option>
        </select>

        {/* SECTION 3: AI Requirements & Investment */}
        <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 pt-8 mb-4">3. AI Requirements & Investment</h2>

        <label className={labelClass}>Top 3 Priority AI Features</label>
        <input name="aiFeaturePriority1" type="text" required value={form.aiFeaturePriority1} onChange={handleChange} className={inputClass} placeholder="Priority 1: e.g., Real-time Pose Correction / Doc QA" />
        <input name="aiFeaturePriority2" type="text" required value={form.aiFeaturePriority2} onChange={handleChange} className={inputClass} placeholder="Priority 2: e.g., Lead Qualification Chatbot" />
        <input name="aiFeaturePriority3" type="text" required value={form.aiFeaturePriority3} onChange={handleChange} className={inputClass} placeholder="Priority 3: e.g., Recommendation Engine" />

        <label className={labelClass} htmlFor="dataSharing">Data Readiness: anonymized access for validation/training?</label>
        <select id="dataSharing" name="dataSharing" required value={form.dataSharing} onChange={handleChange} className={inputClass}>
          <option value="">Select readiness level</option>
          <option value="Yes - Full Access with NDA">Yes, immediately upon signing NDA.</option>
          <option value="Need to Scope Data Access">We need to scope this carefully. Access is restricted.</option>
          <option value="No - Data Unavailable">No. Data cannot be shared.</option>
        </select>

        <label className={labelClass} htmlFor="budget">Preliminary Budget Allocation for MVP Phase (initial 3-month project)</label>
        <select id="budget" name="budget" required value={form.budget} onChange={handleChange} className={inputClass}>
          <option value="">Select Budget Range</option>
          <option value="Under $10,000 USD">Under $10,000 USD</option>
          <option value="$10,000 - $30,000 USD">$10,000 - $30,000 USD</option>
          <option value="$30,000 - $50,000 USD">$30,000 - $50,000 USD</option>
          <option value="Above $50,000 USD">Above $50,000 USD</option>
        </select>

        <label className={labelClass} htmlFor="targetDate">Target MVP Go-Live Date (Month or Year)</label>
        <input id="targetDate" name="targetDate" type="text" required value={form.targetDate} onChange={handleChange} className={inputClass} placeholder="e.g., January 2026 or Q1 2026" />

        {/* SECTION 4: Readiness & Compliance */}
        <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 pt-8 mb-4">4. Readiness & Compliance</h2>

        <label className={labelClass} htmlFor="cloud">Primary Cloud (if any)</label>
        <select id="cloud" name="cloud" value={form.cloud} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          <option>AWS</option>
          <option>GCP</option>
          <option>Azure</option>
          <option>Other</option>
          <option>None</option>
        </select>

        <label className={labelClass} htmlFor="securityCompliance">Compliance Constraints</label>
        <select id="securityCompliance" name="securityCompliance" value={form.securityCompliance} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          <option>None</option>
          <option>GDPR</option>
          <option>HIPAA</option>
          <option>PCI-DSS</option>
          <option>Other</option>
        </select>

        <label className={labelClass} htmlFor="dataOwners">Who owns or manages your data internally?</label>
        <input id="dataOwners" name="dataOwners" value={form.dataOwners} onChange={handleChange} className={inputClass} placeholder="Name/role(s) or team" />

        <label className={labelClass} htmlFor="ndaRequired">Is an NDA required before data access?</label>
        <select id="ndaRequired" name="ndaRequired" value={form.ndaRequired} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <label className={labelClass} htmlFor="pastAIPilots">Past AI/ML Pilots (what worked / didn’t)</label>
        <textarea id="pastAIPilots" name="pastAIPilots" rows={3} value={form.pastAIPilots} onChange={handleChange} className={inputClass} />

        {/* SECTION 5: Team & Change Management */}
        <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 pt-8 mb-4">5. Team & Change Management</h2>

        <label className={labelClass} htmlFor="teamSkills">Internal AI/Data Skills</label>
        <select id="teamSkills" name="teamSkills" value={form.teamSkills} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          <option>No in-house</option>
          <option>Basic</option>
          <option>Advanced</option>
        </select>

        <label className={labelClass} htmlFor="changeReadiness">Change Readiness</label>
        <select id="changeReadiness" name="changeReadiness" value={form.changeReadiness} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* SECTION 6: KPIs, Integrations & Pilot Scope */}
        <h2 className="text-2xl font-bold text-[#0A0A0A] border-b pb-2 pt-8 mb-4">6. KPIs, Integrations & Pilot Scope</h2>

        <label className={labelClass} htmlFor="kpis">Top KPIs to Move (3)</label>
        <input id="kpis" name="kpis" value={form.kpis} onChange={handleChange} className={inputClass} placeholder="e.g., AHT, CSAT, CAC, LTV, Retention, SLA adherence" />

        <label className={labelClass} htmlFor="integrations">Systems to Integrate</label>
        <input id="integrations" name="integrations" value={form.integrations} onChange={handleChange} className={inputClass} placeholder="e.g., HubSpot, Salesforce, Zendesk, Slack, Notion, ERP" />

        <label className={labelClass} htmlFor="preferredDelivery">Preferred Delivery</label>
        <select id="preferredDelivery" name="preferredDelivery" value={form.preferredDelivery} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          <option>Dashboard</option>
          <option>Automation Bot</option>
          <option>API</option>
          <option>AI Agent</option>
        </select>

        <label className={labelClass} htmlFor="pilotScope">90-Day Pilot Scope (one workflow)</label>
        <textarea id="pilotScope" name="pilotScope" rows={3} value={form.pilotScope} onChange={handleChange} className={inputClass} placeholder="Define the single workflow for MVP (inputs, desired output, success conditions)" />

        <label className={labelClass} htmlFor="constraints">Known Constraints</label>
        <textarea id="constraints" name="constraints" rows={2} value={form.constraints} onChange={handleChange} className={inputClass} placeholder="Budget, procurement cycle, approvals, policy limits" />

        <button type="submit" disabled={submitting} className="cta-button cta-button-primary w-full mt-10 disabled:opacity-50">
          {submitting ? 'Submitting Brief...' : isEditing ? 'Update Onboarding Brief' : 'Submit Onboarding Brief'}
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
