"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      title: "AI Consulting & Strategy",
      description: "Develop comprehensive AI strategies tailored to your business goals, ensuring ethical implementation and maximum ROI.",
      challenges: ["Strategic planning", "Technology selection", "Risk assessment"],
      solutions: ["AI roadmap development", "Vendor evaluation", "Implementation planning"],
      icon: "🎯",
      href: "/services#ai-consulting-strategy",
    },
    {
      title: "Custom AI & ML Development",
      description: "Build bespoke AI and machine learning models designed specifically for your unique business challenges.",
      challenges: ["Model accuracy", "Scalability", "Integration"],
      solutions: ["Custom model training", "API development", "Performance optimization"],
      icon: "🤖",
      href: "/services#custom-ai-ml-development",
    },
    {
      title: "Generative AI Solutions",
      description: "Harness the power of generative AI to create content, automate processes, and enhance creativity.",
      challenges: ["Content quality", "Ethical use", "Cost management"],
      solutions: ["GPT integration", "Custom fine-tuning", "Workflow automation"],
      icon: "✨",
      href: "/services#generative-ai-solutions",
    },
    {
      title: "Data Engineering & MLOps",
      description: "Streamline your data pipelines and ML operations for reliable, scalable AI deployment.",
      challenges: ["Data quality", "Pipeline efficiency", "Model deployment"],
      solutions: ["Data pipeline design", "MLOps setup", "Monitoring & logging"],
      icon: "⚙️",
      href: "/services#data-engineering-mlops",
    },
    {
      title: "Computer Vision & NLP",
      description: "Implement advanced computer vision and natural language processing solutions for intelligent automation.",
      challenges: ["Accuracy optimization", "Real-time processing", "Multi-language support"],
      solutions: ["Image recognition", "Text analysis", "Speech processing"],
      icon: "👁️",
      href: "/services#computer-vision-nlp",
    },
    {
      title: "AI Workflow Automation",
      description: "Automate complex workflows with AI-powered tools that learn and adapt to your processes.",
      challenges: ["Process complexity", "Integration challenges", "User adoption"],
      solutions: ["Workflow mapping", "AI agent development", "Change management"],
      icon: "🔄",
      href: "/services#ai-workflow-automation",
    },
  ];

  return (
    <div className="bg-[#EFEFEF] text-[#0A0A0A]">
      <Header />

      {/* Hero Section */}
      <section className="py-24 md:py-36 text-center bg-[#0A0A0A] text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Scalable AI Solutions for Modern Teams
          </h1>
          <p className="text-lg md:text-xl text-[#CCCCCC] max-w-3xl mx-auto mb-8">
            AI Methods helps businesses deploy and scale AI with expert-crafted prompts,
            automation blueprints, and strategic enablement, fast.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/prompts"
              className="bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200"
            >
              Explore Prompt Library
            </Link>
            <Link
              href="/contact"
              className="bg-[#0A0A0A] border border-white text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#555555]"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <motion.section
        className="py-20 bg-[#EFEFEF]"
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
              Our AI Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive AI services designed to transform your business operations and drive innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                id={service.href.split('#')[1]} // Add id for anchor scrolling
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-black mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-2">Key Challenges:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.challenges.map((challenge, i) => (
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
                    {service.solutions.map((solution, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
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

      {/* Bottom CTA */}
      <section className="bg-[#FFFFFF] text-center py-16 border-t border-[#E0E0E0]">
        <h2 className="text-2xl font-bold text-[#333333]">Not sure where to start?</h2>
        <p className="mt-2 text-[#222222] max-w-xl mx-auto">
          Tell us your workflow. We’ll show you how to automate or enhance it with AI — fast and securely.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block bg-[#0A0A0A] text-white px-6 py-3 rounded hover:bg-[#555555]"
        >
          Talk to an Expert
        </Link>
      </section>

      <Footer />
    </div>
  );
}
