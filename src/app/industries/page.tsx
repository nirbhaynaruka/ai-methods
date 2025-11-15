"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IndustriesPage() {
  const industries = [
    {
      title: "Healthcare & Pharma",
      description: "Revolutionize patient care with AI-driven diagnostics, drug discovery, and personalized treatment plans.",
      challenges: ["Data privacy compliance", "Regulatory adherence", "Patient outcome prediction"],
      solutions: ["AI diagnostic assistants", "Drug interaction analysis", "Clinical trial optimization"],
      icon: "🏥",
      href: "/industries#healthcare-pharma",
    },
    {
      title: "Finance & FinTech",
      description: "Enhance risk assessment, fraud detection, and customer experience with intelligent financial AI.",
      challenges: ["Fraud prevention", "Risk modeling", "Regulatory compliance"],
      solutions: ["Real-time fraud detection", "Automated compliance", "Personalized financial advice"],
      icon: "💰",
      href: "/industries#finance-fintech",
    },
    {
      title: "Retail & E-Commerce",
      description: "Optimize inventory, personalize shopping experiences, and predict consumer behavior.",
      challenges: ["Inventory management", "Customer personalization", "Demand forecasting"],
      solutions: ["AI-powered recommendations", "Dynamic pricing", "Supply chain optimization"],
      icon: "🛒",
      href: "/industries#retail-e-commerce",
    },
    {
      title: "Logistics & Supply Chain",
      description: "Streamline operations with predictive analytics, route optimization, and automated warehousing.",
      challenges: ["Route optimization", "Demand forecasting", "Inventory tracking"],
      solutions: ["Predictive maintenance", "Automated scheduling", "Real-time tracking"],
      icon: "🚚",
      href: "/industries#logistics-supply-chain",
    },
    {
      title: "Manufacturing & Automotive",
      description: "Improve quality control, predictive maintenance, and production efficiency with industrial AI.",
      challenges: ["Quality control", "Equipment maintenance", "Production optimization"],
      solutions: ["Computer vision inspection", "Predictive maintenance", "Process automation"],
      icon: "🏭",
      href: "/industries#manufacturing-automotive",
    },
    {
      title: "Human Resources & Recruitment",
      description: "Transform talent acquisition and employee management with AI-powered HR solutions.",
      challenges: ["Candidate screening", "Employee retention", "Skills gap analysis"],
      solutions: ["AI resume screening", "Employee sentiment analysis", "Skills matching"],
      icon: "👥",
      href: "/industries#human-resources-recruitment",
    },
    {
      title: "Regulatory Compliance",
      description: "Ensure compliance across industries with automated monitoring and reporting systems.",
      challenges: ["Regulatory tracking", "Audit preparation", "Risk assessment"],
      solutions: ["Automated compliance checks", "Real-time monitoring", "Audit trail management"],
      icon: "⚖️",
      href: "/industries#regulatory-compliance",
    },
  ];

  return (
    <div className="bg-[#F8F8F8] text-[#0A0A0A]">
      <Header />

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
          <motion.h1
            className="text-4xl md:text-7xl font-bold text-black leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI Across Industries
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tailored AI solutions for every sector. From healthcare to manufacturing, we deliver industry-specific AI that drives real results.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/solutions"
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-800"
            >
              Explore Solutions
            </Link>
            <Link
              href="/services"
              className="bg-gray-400 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-300"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Industries Grid */}
      <motion.section
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
              Industry Solutions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Discover how AI Methods transforms operations across key industries with specialized solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                id={industry.href.split('#')[1]} // Add id for anchor scrolling
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">{industry.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {industry.title}
                </h3>
                <p className="text-black mb-6 leading-relaxed">
                  {industry.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-2">Key Challenges:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {industry.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-2">AI Solutions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {industry.solutions.map((solution, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={industry.href}
                  className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black"
                >
                  Learn More
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-black text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Let's discuss how our industry-specific AI solutions can address your unique challenges and drive innovation.
          </p>
          <Link
            href="/contact"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200 transition-all duration-300"
          >
            Contact Us Today
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
