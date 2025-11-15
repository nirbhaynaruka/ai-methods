"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AiAdvantage from "@/components/AiAdvantage";
import ClientOnly from "@/components/ClientOnly";
import RouteAIStatus from "@/components/RouteAIStatus";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  client: string;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = collection(db, "testimonials");
        const q = query(testimonialsRef, where("approved", "==", true));
        const querySnapshot = await getDocs(q);
        const testimonialsData: Testimonial[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || '',
          role: doc.data().role || '',
          review: doc.data().review || '',
          client: doc.data().client || ''
        }));
        console.log("Fetched testimonials:", testimonialsData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-black/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-black/5 rounded-full blur-xl"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <motion.div
            className="inline-block px-4 py-2 bg-black rounded-full text-white text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* 🚀 Next-Generation AI Solutions */}
            Practical AI. Real Results.
          </motion.div>



          <motion.h1
            className="text-4xl md:text-7xl font-bold text-black leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Make AI Work For Your Team
            <span className="block text-gray-800">
              In real workflows
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cut time, reduce errors, and scale what works. We ship prompts, automations, and guidance that deliver clear outcomes
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
            className=" bg-black text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-800"
            >
              <Link href="https://routeai.aimethods.co">
              RouteAI Platform
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/solutions"
                className="inline-flex items-center bg-gray-400 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-300"
              >
                ⚡ Build your Custom Solutions
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">10,000+ Active Users</span>
            </div> */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                <Link href="/ai-training-consulting">
                AI Ethical Training
                </Link>
                </span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
                <span className="text-sm"><RouteAIStatus /></span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="py-16 bg-black border-b border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 center text-center">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center">

            <motion.div
              className="group"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                500+
              </div>
              <div className="text-sm text-gray-400 mt-1">AI Prompts</div>
            </motion.div>

            <motion.div
              className="group"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                99.9%
              </div>
              <div className="text-sm text-gray-400 mt-1">Uptime</div>
            </motion.div>

            <motion.div
              className="group"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                24/7
              </div>
              <div className="text-sm text-gray-400 mt-1">Support</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solutions Section */}
      <motion.section
        className="py-20 bg-black"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">

              Solutions that ship and scale
            </h2>
            <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
              We align models, data, and workflow, then deploy. Each unit has an owner, an SLA, and a metric.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Prompt Library
              </h3>
              <p className="text-black mb-6 leading-relaxed">
                Reusable prompts for analysis, writing, and ops. Proven patterns that cut hours of trial and error. Each prompt adapts to your own files, notes, and data for context-aware results.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/prompts"
                  className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black"
                >
                  Explore Library
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Custom AI Solutions</h3>
              <p className="text-black mb-6 leading-relaxed">
                Bespoke AI integrations that fit your unique workflow. We build production-ready
                solutions that scale with your business and deliver measurable ROI.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/solutions"
                  className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black"
                >
                  Get Started
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                AI Training & Consulting
              </h3>
              <p className="text-black mb-6 leading-relaxed">
                Master AI tools with expert guidance. Our training programs and strategic consulting
                help teams adopt AI effectively and stay ahead of the curve.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/ai-training-consulting"
                  className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black"
                >
                  Learn More
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Showcase Section */}
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
              Operational focus, simple delivery, and measured outcomes.
              <br />
              Transform your productivity with our
              cutting-edge AI solutions and expert guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant results with our optimized prompts and automation workflows.
                Reduce hours of work to minutes with AI-powered efficiency.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Precision Engineered</h3>
              <p className="text-gray-600 leading-relaxed">
                Every prompt is crafted by AI experts and battle-tested across industries.
                Consistent, reliable results you can count on.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Future-Proof</h3>
              <p className="text-gray-600 leading-relaxed">
                Stay ahead with continuously updated prompts and cutting-edge AI techniques.
                Your competitive advantage grows stronger over time.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level security with SOC 2 compliance. Your data stays private and protected
                with end-to-end encryption and secure processing.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">💡</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized guidance from AI specialists. Our team helps you implement
                solutions and maximize your ROI every step of the way.
              </p>
            </motion.div>

            <motion.div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">📈</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Measurable Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your success with detailed analytics and ROI reports. See exactly how
                our AI solutions are transforming your business performance.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-black to-gray-900"
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Success Stories
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Short stories of impact across roles and teams.            </p>
          </motion.div>

          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-gray-400">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="group relative bg-black p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-700 hover:border-gray-600 overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-4xl text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                    "
                  </div>

                  {/* Avatar and Info */}
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4 shadow-lg">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-300 font-medium">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">
                        {testimonial.client}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="relative">
                    <p className="text-gray-300 leading-relaxed text-base italic">
                      "{testimonial.review}"
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* AI Advantage Section */}
      <motion.section
        id="ai-advantage"
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            className="inline-block px-6 py-3 bg-gray-600 rounded-full text-white font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Workflow Fit Assistant
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#0A0A0A] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Find the right AI for your workflow
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-[#666666] max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Tell us about your role, challenges, or goals, and our intelligent AI assistant will
            recommend the perfect combination of prompts, tools, and strategies to supercharge your productivity.
          </motion.p>

          <motion.div
            className=""
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <ClientOnly>
              <AiAdvantage />
            </ClientOnly>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-20 bg-[#EFEFEF] text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg text-[#666666] mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join our waitlist for exclusive updates on new prompt packages, early access
            opportunities, and provide your valuable input on our upcoming offerings!
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/waitlist"
              className="bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200 transition-all duration-300"
            >
              Join Our Waitlist Today!
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
