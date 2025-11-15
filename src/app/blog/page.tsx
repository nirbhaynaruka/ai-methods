"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    // Real posts from the provided Medium links
    {
      title: "Building AI Methods: A Journey in AI Consulting",
      excerpt: "Exploring the challenges and opportunities in AI consulting, from prompt engineering to enterprise solutions. This post details the founding story and vision behind AI Methods.",
      author: "Nirbhay Singh Naruka",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI Consulting",
      image: "/images/app_icon_512_transparent.png",
      href: "https://medium.com/@nirbhaynaruka/building-ai-methods-a-journey-in-ai-consulting",
      featured: true,
    },
    {
      title: "The Future of AI in Business Operations",
      excerpt: "How AI is transforming business operations, from automation to intelligent decision-making. A comprehensive look at operational efficiency through AI.",
      author: "Anany Dutta",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Business AI",
      image: "/images/app_icon_512_transparent.png",
      href: "https://medium.com/@ananyd36/the-future-of-ai-in-business-operations",
      featured: true,
    },
    // Additional AI-related posts
    {
      title: "Ethics in AI: Balancing Innovation and Responsibility",
      excerpt: "Navigating the ethical challenges of AI development and deployment in modern enterprises.",
      author: "AI Methods Team",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "AI Ethics",
      image: "/images/app_icon_512_transparent.png",
      href: "#",
    },
    {
      title: "Prompt Engineering: The Art of Communicating with AI",
      excerpt: "Master the techniques of crafting effective prompts to get better results from AI models.",
      author: "Nirbhay Singh Naruka",
      date: "2024-01-05",
      readTime: "8 min read",
      category: "Prompt Engineering",
      image: "/images/app_icon_512_transparent.png",
      href: "#",
    },
    {
      title: "Machine Learning in Healthcare: Revolutionizing Patient Care",
      excerpt: "How ML algorithms are transforming diagnostics, treatment plans, and medical research.",
      author: "AI Methods Team",
      date: "2024-01-03",
      readTime: "10 min read",
      category: "Healthcare AI",
      image: "/images/app_icon_512_transparent.png",
      href: "#",
    },
    {
      title: "AI Automation: Streamlining Business Processes",
      excerpt: "Practical applications of AI automation in improving efficiency and reducing operational costs.",
      author: "Anany Dutta",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Automation",
      image: "/images/app_icon_512_transparent.png",
      href: "#",
    },
    {
      title: "The Rise of Generative AI in Content Creation",
      excerpt: "Exploring how generative AI is changing content creation across marketing, design, and media.",
      author: "AI Methods Team",
      date: "2023-12-28",
      readTime: "9 min read",
      category: "Generative AI",
      image: "/images/app_icon_512_transparent.png",
      href: "#",
    },
    {
      title: "Data Privacy in the Age of AI",
      excerpt: "Understanding data privacy challenges and best practices for AI implementations.",
      author: "Nirbhay Singh Naruka",
      date: "2023-12-25",
      readTime: "7 min read",
      category: "Data Privacy",
      image: "/images/app_icon_512_transparent.png",
      href: "#",
    },
    {
      title: "AI in Finance: Risk Assessment and Fraud Detection",
      excerpt: "How AI is revolutionizing risk management and fraud prevention in financial institutions.",
      author: "AI Methods Team",
      date: "2023-12-20",
      readTime: "8 min read",
      category: "FinTech",
      image: "/images/app_icon_512_transparent.png",
      href: "#",
    },
  ];

  const categories = ["All", "AI Consulting", "Business AI", "AI Ethics", "Prompt Engineering", "Healthcare AI", "Automation", "Generative AI", "Data Privacy", "FinTech"];

  const filteredPosts = selectedCategory === "All" ? blogPosts : blogPosts.filter(post => post.category === selectedCategory);

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
            AI Insights & Thoughts
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stay updated with the latest trends, insights, and best practices in AI consulting, implementation, and ethics.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#featured"
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-800"
            >
              Featured Posts
            </Link>
            <Link
              href="#all-posts"
              className="bg-gray-400 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-300"
            >
              All Articles
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Posts */}
      <motion.section
        id="featured"
        className="py-20 bg-black text-white"
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
              Featured Articles
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
              Our latest insights from the AI Methods team and contributors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.filter(post => post.featured).map((post, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 flex items-end p-6">
                    <div className="text-white">
                      <span className="inline-block bg-black/50 text-xs px-3 py-1 rounded-full mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <div className="flex items-center text-sm opacity-90">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link
                      href={post.href}
                      className="group inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black text-sm"
                    >
                      Read More
                      <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* All Posts */}
      <motion.section
        id="all-posts"
        className="py-20 bg-white text-black"
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
              All Articles
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Explore our complete collection of AI insights and thought leadership.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 text-gray-700 hover:bg-black hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-black overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/70 flex items-end p-4">
                    <div className="text-white">
                      <span className="inline-block bg-black/50 text-xs px-2 py-1 rounded-full mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                      <div className="flex items-center text-xs opacity-90">
                        <span>{post.author}</span>
                        <span className="mx-1">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-black text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <Link
                      href={post.href}
                      className="group inline-flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl border border-black text-xs"
                    >
                      Read
                      <span className="text-sm">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter CTA */}
      <motion.section
        className="py-20 bg-black text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with AI Insights
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest AI trends, case studies, and expert opinions.
          </p>
          <Link
            href="/waitlist"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-200 transition-all duration-300"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
