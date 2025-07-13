// File: src/data/promptsData.ts

export const checklistData = [
  {
    criterion: "Complexity Handled",
    description:
      "Automates tasks that typically demand expert human analysis, saving significant time and specialized labor costs.",
    techniques: ["Chain-of-Thought", "Task Decomposition", "Tree-of-Thought", "ReAct"],
  },
  {
    criterion: "Output Accuracy & Reliability",
    description:
      "Reduces the need for extensive manual review and correction, preventing costly errors and ensuring trustworthiness.",
    techniques: ["Self-Consistency", "Generate Knowledge", "RAG", "Few-Shot"],
  },
  {
    criterion: "Significant Time Savings",
    description:
      "Frees up valuable professional time, allowing users to focus on higher-level strategic work.",
    techniques: ["All techniques combined for efficiency"],
  },
  {
    criterion: "Deep Domain Specificity",
    description:
      "Delivers specialized insights that generic AI models cannot, acting as a virtual subject matter expert.",
    techniques: ["Persona Prompting", "Contextual Prompting", "Few-Shot"],
  },
  {
    criterion: "High Reusability & Scalability",
    description:
      "Offers long-term value by serving as a repeatable solution for recurring complex tasks.",
    techniques: ["Structured Prompts", "Parameterization"],
  },
  {
    criterion: "Integration Readiness",
    description:
      "Enables automation of downstream processes, enhancing overall system efficiency and reducing manual data manipulation.",
    techniques: ["Structured Output Definition"],
  },
];

export const techData = {
  "Chain-of-Thought (CoT)": {
    description:
      "Guides the model to break down complex problems into sequential, logical steps, articulating its intermediate thought processes. This enhances reasoning, particularly for math and symbolic reasoning, improving accuracy and transparency.",
    benefit: "Improved reasoning and problem-solving.",
    visual:
      '<div class="flex items-center space-x-2"><div class="p-3 bg-blue-100 rounded-md">Step 1</div><div class="text-gray-400">&rarr;</div><div class="p-3 bg-blue-100 rounded-md">Step 2</div><div class="text-gray-400">&rarr;</div><div class="p-3 bg-blue-100 rounded-md">Answer</div></div>',
  },
  "Few-Shot Prompting": {
    description:
      "Provides a small number of input-output examples ('shots') within the prompt to demonstrate the desired task, tone, or format. This helps the model understand the expected response pattern without being explicitly told.",
    benefit: "Better performance and consistency on new tasks.",
    visual:
      '<div class="space-y-2"><div class="p-2 bg-green-100 rounded-md">Example 1: Input &rarr; Output</div><div class="p-2 bg-green-100 rounded-md">Example 2: Input &rarr; Output</div><div class="p-2 bg-gray-200 rounded-md">New Input &rarr; ?</div></div>',
  },
  "Persona Prompting": {
    description:
      "Assigns a specific character, role, or expertise to the AI (e.g., 'Act as a senior data analyst'). This influences its tone, vocabulary, and perspective, leading to more authoritative and domain-specific responses.",
    benefit: "Ensures domain-specific, authoritative answers.",
    visual:
      '<div class="flex items-center space-x-4"><div class="text-4xl">🧑‍⚖️</div><div><div class="font-semibold">AI Persona</div><div class="text-sm text-gray-600">"Expert SQL Architect"</div></div></div>',
  },
  "Task Decomposition": {
    description:
      "Breaks down a complex overall task into smaller, more manageable subtasks that the AI processes sequentially. This simplifies complex problems and reduces the likelihood of errors.",
    benefit: "Manages complexity and improves reliability.",
    visual:
      '<div class="flex flex-col space-y-2"><div class="p-3 bg-purple-100 rounded-md">Main Task</div><div class="pl-6 flex flex-col space-y-2"><div class="p-2 bg-purple-50 rounded-md">Sub-task A</div><div class="p-2 bg-purple-50 rounded-md">Sub-task B</div></div></div>',
  },
  "Retrieval Augmented Generation (RAG)": {
    description:
      "Integrates external, up-to-date information retrieval with the generative AI. The model uses this fetched knowledge to produce responses that are more accurate and grounded in current or proprietary data.",
    benefit: "Provides more informed and factually accurate responses.",
    visual:
      '<div class="flex items-center space-x-2"><div class="p-3 bg-yellow-100 rounded-md">External Data</div><div class="text-gray-400">+</div><div class="p-3 bg-yellow-100 rounded-md">LLM</div><div class="text-gray-400">&rarr;</div><div class="p-3 bg-yellow-200 rounded-md">Augmented Answer</div></div>',
  },
  "Tree-of-Thought (ToT)": {
    description:
      "Extends CoT by encouraging the model to explore multiple branches of reasoning simultaneously before converging on a final output. This allows for more robust and comprehensive problem-solving.",
    benefit: "Facilitates better solutions for complex problems with multiple paths.",
    visual:
      '<div class="flex flex-col items-center"><div class="p-2 bg-indigo-100 rounded-md">Problem</div><div class="flex space-x-4 mt-2"><div class="flex flex-col items-center"><div class="w-0.5 h-4 bg-gray-300"></div><div class="p-2 bg-indigo-50 rounded-md">Path A</div></div><div class="flex flex-col items-center"><div class="w-0.5 h-4 bg-gray-300"></div><div class="p-2 bg-indigo-50 rounded-md">Path B</div></div></div></div>',
  },
};

export const promptData = {
  "SQL Debugger": {
    category: "Data & Analytics",
    value:
      "Acts as a virtual senior SQL architect, identifying subtle errors, performance bottlenecks, and syntax issues. It provides corrections, detailed explanations, and optimized alternatives, saving hours of manual debugging.",
    techniques: ["Persona Prompting", "Chain-of-Thought", "Structured Output"],
    content: `You are an Expert SQL Architect with over 20 years of experience in optimizing, debugging, and refactoring complex SQL queries for high-performance, enterprise-grade relational databases. Your task is to meticulously review a provided SQL query.

**Follow these steps for your analysis:**
1.  **Syntax Check:** Validate the SQL syntax.
2.  **Logical Flow Analysis:** Trace the data flow and operations.
3.  **Performance Bottleneck Identification:** Analyze for anti-patterns.
4.  **Best Practices Review:** Assess against general SQL best practices.
5.  **Provide Corrected & Optimized Query.**
6.  **Explain Changes:** Detail why each change was made.

**Input Data:**
**SQL Dialect:** [User provides dialect]
**Database Schema:** [User provides schema]
**Original SQL Query:** [User provides query]
**Observed Error/Problem:** [User provides error]

**Output Format:**
Provide the response in Markdown, structured with the following headings:
### SQL Debugging and Optimization Report
#### 1. Syntax Review
#### 2. Logical Flow Analysis
#### 3. Performance Bottleneck Identification & Optimization
#### 4. Best Practices Adherence
#### 5. Corrected & Optimized SQL Query
\`\`\`sql
-- Corrected and Optimized Query Here
\`\`\`
#### 6. Explanation of Changes`,
  },
  "Resume Optimizer": {
    category: "Job Search & Career",
    value:
      "Transforms a generic resume into a targeted, ATS-friendly document optimized for a specific job. It provides strategic advice on phrasing and impact statements, significantly increasing the chances of securing an interview.",
    techniques: ["Persona Prompting", "Task Decomposition", "Contextual Prompting"],
    content: `You are a Senior Talent Acquisition Specialist with deep knowledge of Applicant Tracking Systems (ATS) and what makes a resume stand out. Your goal is to optimize a resume for a specific job description.

**Analyze and perform the following steps:**
1.  **ATS Keyword Analysis:** Identify and highlight missing keywords.
2.  **Impact Statement Enhancement:** Rephrase bullet points to be action-oriented and quantifiable.
3.  **Summary/Objective Optimization:** Draft a compelling summary tailored to the job.
4.  **Formatting & Readability Suggestions:** Provide recommendations for structure and layout.
5.  **Identify Missing Information/Gaps.**

**Input Data:**
**Candidate's Current Resume:** [User provides resume text]
**Target Job Description:** [User provides job description]

**Output Format:**
Provide the response in Markdown, structured with the following headings:
### Resume Optimization Report
#### 1. ATS Keyword Alignment & Gaps
#### 2. Enhanced Impact Statements (Examples)
#### 3. Optimized Professional Summary/Objective
#### 4. Formatting & Readability Recommendations
#### 5. Additional Areas for Improvement`,
  },
  "Dashboard Explainer": {
    category: "Data & Analytics",
    value:
      "Transforms complex data dashboards into clear, actionable narratives for non-technical stakeholders. It interprets trends and explains their business implications, improving data literacy and speeding up decision-making.",
    techniques: ["Persona Prompting", "Chain-of-Thought", "Structured Output"],
    content: `You are a Senior Data Storyteller and Business Analyst. Your objective is to explain a dashboard's key metrics, trends, and implications to a non-technical audience.

**Follow these steps to construct your explanation:**
1.  **Dashboard Overview:** Describe the dashboard's purpose.
2.  **Key Metric Interpretation:** Explain each primary metric's significance.
3.  **Trend Analysis:** Identify and interpret significant trends or anomalies.
4.  **Root Cause & Impact Hypothesis:** Hypothesize causes and business impacts.
5.  **Actionable Insights & Recommendations:** Translate insights into clear recommendations.
6.  **Concise Summary:** Provide a high-level summary of takeaways.

**Input Data:**
**Dashboard Description/Purpose:** [User provides details]
**Target Audience:** [User provides audience]
**Key Dashboard Components:** [User describes charts/tables]

**Output Format:**
Provide the response as a narrative report in Markdown:
### Dashboard Analysis
#### 1. Executive Overview
#### 2. Key Metric Deep Dive
#### 3. Trend Analysis & Observations
#### 4. Hypothesized Causes & Business Impact
#### 5. Strategic Recommendations & Next Steps`,
  },
  "Cover Letter Draft": {
    category: "Job Search & Career",
    value:
      "Generates a highly personalized and compelling cover letter for a specific job application. It strategically highlights relevant skills and aligns with company values, distinguishing the applicant from generic submissions.",
    techniques: ["Persona Prompting", "Task Decomposition", "Contextual Prompting"],
    content: `You are a Professional Career Coach specializing in crafting impactful, personalized cover letters. Your task is to draft a compelling letter for a candidate.

**Follow these steps to construct the letter:**
1.  **Analyze Alignment:** Match candidate experience to job requirements.
2.  **Personalized Introduction:** Draft an engaging opening paragraph.
3.  **Skills & Experience Body Paragraphs:** Create 2-3 paragraphs highlighting achievements.
4.  **Company Alignment:** Integrate insights about the company to show genuine interest.
5.  **Strong Call to Action:** Conclude with a confident closing.
6.  **Tone & Length:** Maintain a professional, concise tone (3-4 paragraphs).

**Input Data:**
**Candidate's Name & Background:** [User provides info]
**Target Company & Job Title:** [User provides info]
**Hiring Manager Name (if known, otherwise leave blank):**
**Job Description:**
**Key Candidate Achievements/Skills to Highlight (specific examples):**
* [Achievement 1: e.g., "Successfully managed CRM system for 200+ clients, improving data accuracy by 15%."]
* [Achievement 2: e.g., "Led cross-functional team of 5 to launch new product, exceeding Q1 revenue targets by 10%."]
* [Achievement 3: e.g., "Implemented new customer feedback loop, increasing customer satisfaction scores by 8%."]
**Why Candidate is Interested in THIS Company/Role (specific reasons):**
* [Reason 1: e.g., "Deep admiration for Company X's innovative approach to sustainable technology."]
* [Reason 2: e.g., "Excited by the opportunity to contribute to a team focused on developing cutting-edge AI solutions."]

**Output Format:**
Provide the cover letter in plain text, formatted as a standard business letter, ready for copy-pasting. Include a placeholder for the date and recipient address.`,
  },
};