"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AITrainingConsultingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const trainingSteps = [
    {
      id: 'ethics',
      title: 'AI Ethics & Responsible Use',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Key Ethical Principles</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Fairness:</strong> Ensure AI systems don't discriminate against protected groups</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Transparency:</strong> Make AI decision-making processes understandable</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Privacy:</strong> Protect user data and maintain confidentiality</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Accountability:</strong> Take responsibility for AI system outcomes</span>
              </li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h3 className="text-xl font-bold text-red-900 mb-4">Common Ethical Pitfalls</h3>
            <ul className="space-y-3 text-red-800">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Using biased training data that leads to discriminatory outcomes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Implementing AI without human oversight or appeal processes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Collecting excessive personal data without proper consent</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing Guidelines',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-4">What to Share with AI</h3>
            <ul className="space-y-3 text-green-800">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Public Information:</strong> Facts, general knowledge, and publicly available data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Business Data:</strong> Non-sensitive operational data and processes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Educational Content:</strong> Training materials and learning objectives</span>
              </li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h3 className="text-xl font-bold text-red-900 mb-4">What NOT to Share with AI</h3>
            <ul className="space-y-3 text-red-800">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Personal Information:</strong> Names, addresses, phone numbers, emails</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Sensitive Data:</strong> Financial details, medical records, legal documents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Proprietary Information:</strong> Trade secrets, confidential business strategies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Passwords & Credentials:</strong> Login information or access codes</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'questionnaire',
      title: 'AI Ethics & Data Security Quiz',
      content: (
        <div className="space-y-6">
          {[
            {
              question: "Which of the following should NEVER be shared with AI systems?",
              options: [
                "Public company website content",
                "Employee Social Security numbers",
                "General industry statistics",
                "Published research papers"
              ],
              correct: 1
            },
            {
              question: "What is a key ethical consideration when implementing AI?",
              options: [
                "Maximizing profit at all costs",
                "Ensuring fairness and avoiding discrimination",
                "Reducing development time",
                "Using the cheapest available technology"
              ],
              correct: 1
            },
            {
              question: "Which data type is generally SAFE to share with AI?",
              options: [
                "Customer credit card information",
                "Medical diagnosis records",
                "Publicly available research data",
                "Employee performance reviews"
              ],
              correct: 2
            },
            {
              question: "What should you do if an AI system produces biased results?",
              options: [
                "Ignore it and continue using the system",
                "Investigate the training data and retrain if necessary",
                "Blame the AI vendor and switch providers",
                "Use it only for less important tasks"
              ],
              correct: 1
            },
            {
              question: "Which principle ensures AI decisions can be explained?",
              options: [
                "Efficiency",
                "Transparency",
                "Cost reduction",
                "Speed"
              ],
              correct: 1
            }
          ].map((q, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">{index + 1}. {q.question}</h4>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optIndex}
                      onChange={(e) => setAnswers({...answers, [index]: parseInt(e.target.value)})}
                      checked={answers[index] === optIndex}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  const calculateScore = () => {
    const correctAnswers = [1, 1, 2, 1, 1]; // Correct answers for each question
    let score = 0;
    correctAnswers.forEach((correct, index) => {
      if (answers[index] === correct) score++;
    });
    return score;
  };

  const handleNext = () => {
    if (currentStep < trainingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetTraining = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const trainingPrograms = [
    {
      title: "AI Fundamentals Bootcamp",
      duration: "2 Days",
      level: "Beginner",
      description: "Master the basics of AI, machine learning, and prompt engineering. Perfect for teams getting started with AI adoption.",
      features: ["AI/ML Fundamentals", "Prompt Engineering Basics", "Tool Selection Guide", "Hands-on Exercises"],
      icon: "🎓",
    },
    {
      title: "Advanced AI Implementation",
      duration: "3 Days",
      level: "Intermediate",
      description: "Deep dive into advanced AI techniques, custom integrations, and enterprise deployment strategies.",
      features: ["Advanced Prompting", "API Integration", "Workflow Automation", "Performance Optimization"],
      icon: "🚀",
    },
    {
      title: "AI Leadership & Strategy",
      duration: "1 Day",
      level: "Executive",
      description: "Strategic guidance for C-level executives on AI adoption, ROI measurement, and organizational transformation.",
      features: ["AI Strategy Planning", "ROI Frameworks", "Change Management", "Risk Assessment"],
      icon: "🎯",
    },
  ];

  const consultingServices = [
    {
      title: "AI Readiness Assessment",
      description: "Comprehensive evaluation of your organization's AI maturity and implementation readiness.",
      deliverables: ["Current State Analysis", "Gap Assessment", "Roadmap Development", "Priority Recommendations"],
      icon: "📊",
    },
    {
      title: "Custom AI Solution Design",
      description: "End-to-end design of AI solutions tailored to your specific business challenges and workflows.",
      deliverables: ["Requirements Gathering", "Solution Architecture", "Technical Specifications", "Implementation Plan"],
      icon: "⚡",
    },
    {
      title: "AI Integration & Deployment",
      description: "Seamless integration of AI capabilities into your existing systems and processes.",
      deliverables: ["System Integration", "Testing & Validation", "Deployment Support", "Training & Handover"],
      icon: "🔧",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Assessment",
      description: "We start by understanding your current AI capabilities, challenges, and goals through comprehensive assessment.",
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Based on our findings, we develop a customized AI strategy aligned with your business objectives.",
    },
    {
      step: "03",
      title: "Implementation Planning",
      description: "We create detailed implementation plans with clear timelines, milestones, and success metrics.",
    },
    {
      step: "04",
      title: "Training & Enablement",
      description: "Your team receives hands-on training and ongoing support to ensure successful AI adoption.",
    },
    {
      step: "05",
      title: "Ongoing Support",
      description: "We provide continuous monitoring, optimization, and strategic guidance as your AI capabilities evolve.",
    },
  ];

  return (
    <div className="bg-[#F8F8F8] text-[#0A0A0A]">
      <Header />

      {/* Interactive Training Prototype Section */}
      <motion.section
        className="py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              Interactive Training Prototype
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              AI Ethics & Data Security Training
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Learn about responsible AI use, data sharing guidelines, and test your knowledge with our interactive quiz.
            </p>
          </motion.div>

          {/* Training Frame */}
          <motion.div
            className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border-4 border-gray-800 overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Frame Header */}
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm font-medium">AI Training Module</span>
              </div>
              <div className="text-sm opacity-75">AI Methods Training Platform</div>
            </div>

            {/* Content Area */}
            <div className="min-h-[600px] bg-gray-50">
              {!showResults ? (
                <motion.div
                  key={currentStep}
                  className="h-full flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{trainingSteps[currentStep].title}</h3>
                      <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                        Step {currentStep + 1} of {trainingSteps.length}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white h-3 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / trainingSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex-1 p-8 overflow-y-auto">
                    {trainingSteps[currentStep].content}
                  </div>

                  <div className="bg-white border-t border-gray-200 px-8 py-6 flex justify-between items-center">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex space-x-2">
                      {trainingSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full transition-colors ${
                            index === currentStep
                              ? 'bg-blue-600'
                              : index < currentStep
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {currentStep === trainingSteps.length - 1 ? 'Complete Quiz' : 'Next'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="h-full flex flex-col items-center justify-center p-8 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="text-5xl text-green-600">✓</span>
                  </div>
                  <h3 className="text-4xl font-bold text-black mb-6">Training Complete!</h3>
                  <p className="text-xl text-gray-600 mb-8">
                    You answered <strong className="text-blue-600">{calculateScore()}</strong> out of <strong>5</strong> questions correctly.
                  </p>

                  <div className="bg-white rounded-xl p-8 mb-8 shadow-lg border border-gray-200">
                    <div className="flex items-center justify-center space-x-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600">{calculateScore()}</div>
                        <div className="text-lg text-gray-600">Correct</div>
                      </div>
                      <div className="w-px h-16 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600">{5 - calculateScore()}</div>
                        <div className="text-lg text-gray-600">Incorrect</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <button
                      onClick={resetTraining}
                      className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg"
                    >
                      Retake Training
                    </button>
                    <Link
                      href="#training-programs"
                      className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-lg"
                    >
                      View Programs
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Hero Section */}
      <motion.section
        className="relative py-20 md:py-32 text-center bg-white overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <motion.div
            className="inline-block px-4 py-2 bg-black rounded-full text-white text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI Training & Consulting
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold text-black leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master AI with Expert Guidance
            <span className="block text-gray-800">
              Accelerate Your AI Journey
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From foundational training to strategic consulting, we empower your team to harness AI effectively.
            Build expertise, implement solutions, and drive measurable results.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#training-programs"
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-800"
            >
              Explore Training Programs
            </Link>
            <Link
              href="#consulting-services"
              className="bg-gray-400 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-300"
            >
              View Consulting Services
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Compliance Training Framework Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-b border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                Compliance Training Framework
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Structured AI Training for Corporate Compliance
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Develop a comprehensive AI training program proposal specifically addressing corporate compliance needs, designed for seamless integration with your organization's learning management systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Training Methodologies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Interactive modules with real-world scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Role-based simulations and case studies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Integration with existing LMS platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Progressive skill-building approach</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Components</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Delivery: Hybrid (online + in-person sessions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Content: Cybersecurity, harassment prevention, data privacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Assessment: Practical application exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Tracking: Automated compliance reporting</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <strong>Compliance Adherence Tracking:</strong> Real-time dashboards, automated reporting, and integration with HR systems to monitor training completion and policy acknowledgment across all compliance areas.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Training Programs Section */}
      <motion.section
        id="training-programs"
        className="py-20 bg-[#F8F8F8]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Training Programs
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive training programs designed to build AI expertise across all levels of your organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">{program.icon}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {program.level}
                    </span>
                    <span className="px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
                      {program.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-black mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/waitlist"
                    className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black w-full justify-center"
                  >
                    Enroll Now
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Consulting Services Section */}
      <motion.section
        id="consulting-services"
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Consulting Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Strategic guidance and hands-on support to accelerate your AI transformation journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultingServices.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-[#F8F8F8] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">{service.icon}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-black mb-3">Deliverables:</h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/waitlist"
                    className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black w-full justify-center"
                  >
                    Get Started
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section
        className="py-20 bg-black text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              A proven methodology that ensures successful AI adoption and measurable business impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Why Choose AI Methods?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Industry-leading expertise combined with practical, results-driven approaches.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="group bg-[#F8F8F8] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Certified Experts</h3>
              <p className="text-gray-600 leading-relaxed">
                Our trainers are industry veterans with deep expertise in AI implementation and best practices.
              </p>
            </motion.div>

            <motion.div
              className="group bg-[#F8F8F8] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">📈</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Proven Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Our clients see measurable improvements in productivity, efficiency, and business outcomes.
              </p>
            </motion.div>

            <motion.div
              className="group bg-[#F8F8F8] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Continuous Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Ongoing guidance and resources to ensure your team continues to grow and succeed with AI.
              </p>
            </motion.div>

            <motion.div
              className="group bg-[#F8F8F8] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Tailored Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                Every program and consultation is customized to your organization's specific needs and goals.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-20 bg-black text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Accelerate Your AI Journey?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join the growing number of organizations that trust AI Methods for their AI training and consulting needs.
          </p>
          <Link
            href="/waitlist"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200 transition-all duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
