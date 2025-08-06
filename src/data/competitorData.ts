export const competitorData = [
  {
    name: "AI Ethics & Responsible Usage Training",
    offering: "Modular training to help teams safely, ethically, and effectively use AI in daily workflows.",
    category: "AI Ethics Training",
    takeaway: "Gives teams a structured, LMS-ready way to prevent misuse and onboard responsible AI practices.",
    type: "Product",
    features: [
      "Prompting best practices",
      "Data safety & compliance",
      "Ethics & bias awareness",
      "Quizzes + certification",
      "Customizable modules"
    ],
    audience: ["HR", "L&D", "Team Leads", "Compliance"],
    deployment: "Notion, LMS, PDF + quiz links",
    pricingModel: "Tiered – Lite, Pro, Enterprise",
    status: "Client-ready",
    tags: ["ethics", "compliance", "training", "onboarding"],
    useCases: ["AI onboarding for new hires", "Compliance training for regulated industries"],
    integrations: ["LMS", "Notion", "Email"],
    competitiveEdge: "Customizable, LMS-ready format built specifically for internal enablement teams."
  },
  {
    name: "Prompt Management & Engineering Suite",
    offering: "A complete system for managing, sharing, testing, and optimizing prompts across teams.",
    category: "Prompt Management",
    takeaway: "Turns prompts into structured assets with libraries, access control, and CI/CD testing.",
    type: "Product Suite",
    features: [
      "Premium prompt packs",
      "Prompt libraries with filters",
      "Access control",
      "Prompt versioning and rollback",
      "Prompt testing pipelines"
    ],
    audience: ["Marketing", "Data Teams", "Ops", "Analysts"],
    deployment: "Web app, PDF, Airtable, API",
    pricingModel: "Tiered – Starter, Toolkit, Enterprise",
    status: "MVP-ready",
    tags: ["prompt engineering", "team collaboration", "libraries"],
    useCases: ["Centralize prompt ops", "Version control for enterprise LLMs"],
    integrations: ["Airtable", "Slack", "Internal CI/CD"],
    competitiveEdge: "Built for prompt-heavy teams with versioning and testing baked in."
  },
  {
    name: "Smart Tagging System",
    offering: "AI-powered tagging of prompts, docs, and outputs for structured retrieval and governance.",
    category: "Content Organization",
    takeaway: "Adds structure to chaos — find, filter, and reuse AI content with ease.",
    type: "Feature/Tool",
    features: [
      "Manual and AI-generated tags",
      "Role-based visibility",
      "Integrations (Notion, Slack)",
      "Export to CSV/JSON"
    ],
    audience: ["Ops", "Data Governance", "Analysts", "Support"],
    deployment: "Web app, Plugin, Sidebar",
    pricingModel: "Add-on or per-user/month",
    status: "In development",
    tags: ["tagging", "retrieval", "governance"],
    useCases: ["Governance for AI outputs", "Searchable internal prompt libraries"],
    integrations: ["Notion", "Slack", "CSV Export"],
    competitiveEdge: "Combines manual + AI tagging with role-based access — rare in current tools."
  },
  {
    name: "AI Agents",
    offering: "Autonomous LLM-powered agents that automate workflows across departments and tools.",
    category: "AI Agents",
    takeaway: "Delivers custom and prebuilt agents to automate repetitive business tasks intelligently.",
    type: "Product",
    features: [
      "Custom agents for internal tools",
      "AgentStacks (HR, Ops, Legal)",
      "Slack/API integrations",
      "Multi-step goal execution"
    ],
    audience: ["Ops", "Customer Support", "HR", "Product"],
    deployment: "Slackbot, Web UI, APIs",
    pricingModel: "Per agent or bundled by use case",
    status: "Client-ready",
    tags: ["agents", "automation", "workflow", "LLM"],
    useCases: ["Auto-fill HR forms", "Triage support tickets", "Summarize daily ops updates"],
    integrations: ["Slack", "CRM", "Custom APIs"],
    competitiveEdge: "Modular agent library + API-first design for fast team-specific automation."
  },
  {
    name: "Custom AI Solutions",
    offering: "Fully tailored AI integrations, tools, and systems built for internal business needs.",
    category: "Custom AI Integrations",
    takeaway: "Go beyond generic SaaS with AI that fits your exact workflow, stack, and rules.",
    type: "Service",
    features: [
      "AIMethods Delivery Framework",
      "Slack, Notion, CRM, Sheets integration",
      "Utility bots, dashboards, retraining hooks"
    ],
    audience: ["CTOs", "Heads of Ops", "BI", "Innovation Teams"],
    deployment: "Custom-built per project",
    pricingModel: "Fixed + retainer options",
    status: "Client-ready",
    tags: ["custom AI", "workflow automation", "integration"],
    useCases: ["Automate internal reporting", "AI-native product prototyping"],
    integrations: ["Slack", "Notion", "Google Sheets", "CRM"],
    competitiveEdge: "Delivered through a repeatable consulting framework with full-stack capability."
  },
  {
    name: "Forecasting & Prediction Tools",
    offering: "AI models for churn, demand, pricing, segmentation, and marketing optimization.",
    category: "AI Forecasting",
    takeaway: "Predict future outcomes across your business using tailored machine learning models.",
    type: "Product Suite",
    features: [
      "Churn prediction",
      "Demand forecasting",
      "LTV modeling",
      "Marketing optimization",
      "Dynamic pricing",
      "Recommender systems"
    ],
    audience: ["Marketing", "Finance", "Ops", "Strategy"],
    deployment: "Dashboard, CSV report, API",
    pricingModel: "Per model or dashboard access",
    status: "Client-ready",
    tags: ["forecasting", "prediction", "ML models"],
    useCases: ["Predict churn for subscriptions", "Optimize ad spend", "Plan product inventory"],
    integrations: ["Data warehouse", "BI tools", "Marketing CRM"],
    competitiveEdge: "Lightweight forecasting layer that plugs into existing BI tools, not a heavy ML platform."
  },
  {
    name: "Persona Generator",
    offering: "AI-generated personas (user, buyer, competitor, employee) based on input or data.",
    category: "AI Persona Generation",
    takeaway: "Create data-backed personas instantly — from CRM or strategic input.",
    type: "Tool",
    features: [
      "Manual brief or CSV upload",
      "Outputs: goals, pain points, tools",
      "Export to Notion, Slides, PDF",
      "Static and editable formats"
    ],
    audience: ["Marketing", "UX", "Product", "HR"],
    deployment: "Web interface, export tools",
    pricingModel: "Per persona or subscription",
    status: "Client-ready",
    tags: ["personas", "user research", "segmentation"],
    useCases: ["Generate buyer personas for campaigns", "Product research from user feedback"],
    integrations: ["Notion", "Google Slides", "CSV import/export"],
    competitiveEdge: "Fastest path from idea → persona → shareable deck, powered by Gen AI."
  },
  {
    name: "RAG (Retrieval-Augmented Generation) Systems",
    offering: "Combine LLMs with internal knowledge (PDFs, docs, wikis) to produce grounded responses.",
    category: "RAG Systems",
    takeaway: "Deliver factual, source-based responses from your company’s content.",
    type: "Product",
    features: [
      "Semantic search over documents",
      "LLM-based answer generation",
      "Source citations in responses",
      "Slackbot or web widget delivery"
    ],
    audience: ["Support", "Legal", "Research", "Internal Knowledge Teams"],
    deployment: "Chatbot, Slackbot, API, Web widget",
    pricingModel: "Per project or SaaS license",
    status: "Client-ready",
    tags: ["RAG", "document search", "grounded AI"],
    useCases: ["Support bot with PDF answers", "Legal doc Q&A", "Internal wiki chatbot"],
    integrations: ["Slack", "Web Widget", "PDF/Doc ingestion"],
    competitiveEdge: "RAG pipeline built for business docs — with citations and chatbot out-of-the-box."
  }
];

export type Competitor = typeof competitorData[0];

export const categories = [...new Set(competitorData.map(c => c.category))];
