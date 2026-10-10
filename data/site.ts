export const site = {
  name: "Chevvanthi",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chev.consulting",
  description:
    "One-to-one IT mentoring and data-platform consulting from Chevvanthi MN, a senior data and solutions architect in Bangalore.",
  email: "hello@chev.consulting",
  counsellor: {
    name: "Chevvanthi MN",
    role: "Senior Data & Solutions Architect",
    location: "Bangalore, India",
    years: "20+ years",
    bio: "Senior Data & Solutions Architect with 20+ years in enterprise data architecture, cloud platforms, data engineering, ETL modernisation, data governance, and digital transformation. Chevvanthi designs scalable data platforms and mentors freshers and experienced IT professionals through interviews, career moves, and architecture decisions.",
    expertise: [
      "Microsoft Fabric",
      "Azure & Synapse",
      "Data architecture",
      "ETL modernisation",
      "Generative AI",
      "Interview mentoring",
    ],
  },
} as const;

const companyIncludes = [
  "Microsoft Fabric and Azure Data Lake consulting",
  "End-to-end data platform architecture",
  "Microsoft Fabric and OneLake solution design",
  "Azure Data Factory pipelines and data integration",
  "Azure Synapse Analytics architecture and modernisation",
  "Security, governance, scalability, performance, and cost",
  "Fabric IQ ontology implementation",
  "Pre-sales architecture solution pitches",
  "Data lake implementation consulting",
] as const;

export const services = [
  {
    name: "Fresher consultation",
    slug: "fresher-consultation",
    audience: "Freshers",
    duration: "1 hour",
    amount: 49900,
    description:
      "A one-to-one session for freshers and early-career professionals preparing for interviews and choosing a path in data, cloud, or architecture.",
    includes: [
      "Interview preparation for freshers and professionals",
      "Technical interview preparation and mock interviews",
      "Explaining projects, technical decisions, and architecture",
      "Confidence building and interview feedback",
      "Career development for freshers",
      "Career paths in data engineering, cloud, and architecture",
      "Skills roadmap and practical project suggestions",
      "Resume, LinkedIn profile, and job-search guidance",
    ],
  },
  {
    name: "Experienced mentoring",
    slug: "experienced-mentoring",
    audience: "Experienced professionals",
    duration: "2 hours",
    amount: 99900,
    description:
      "A one-to-one session for developers and data engineers moving toward solution architecture, including design trade-offs and architecture interviews.",
    includes: [
      "Senior solution architect mentoring",
      "Roadmap from developer or data engineer to architect",
      "Solution design, architecture patterns, and trade-offs",
      "Stakeholder communication and architecture interviews",
      "Skills-gap assessment and personalised career planning",
    ],
  },
  {
    name: "Daily consulting",
    slug: "consulting-day",
    audience: "Startups & mid-size companies",
    duration: "1 day",
    amount: 200000,
    description:
      "A focused consulting day for startups and mid-size companies on Microsoft Fabric, Azure data platforms, and implementation decisions.",
    includes: companyIncludes,
  },
  {
    name: "Weekly consulting",
    slug: "consulting-week",
    audience: "Startups & mid-size companies",
    duration: "1 week",
    amount: 1000000,
    description:
      "A one-week engagement for teams that need architecture, pipeline design, governance, and a practical delivery plan.",
    includes: companyIncludes,
  },
  {
    name: "Monthly consulting",
    slug: "consulting-month",
    audience: "Startups & mid-size companies",
    duration: "1 month",
    amount: 4000000,
    description:
      "A one-month consulting engagement for platform modernisation, from solution design through governance, performance, and cost.",
    includes: companyIncludes,
  },
] as const;

export type Service = (typeof services)[number];

export function formatInr(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function getService(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}

export const summary = [
  "Senior Data & Solutions Architect with 20+ years of experience in enterprise data architecture, cloud platforms, data engineering, ETL modernisation, data governance, and digital transformation.",
  "Designs scalable, secure, high-performance data platforms using Microsoft Fabric, Azure, Azure Synapse, Snowflake, and enterprise data warehouse technologies.",
  "Hands-on with Microsoft Fabric, OneLake, Lakehouse, Fabric Data Factory, PySpark, Power BI, semantic models, Direct Lake, and Medallion Architecture.",
  "Enterprise data migration, legacy ETL modernisation, cloud transformation, data integration, dimensional modelling, and analytics automation.",
  "Generative AI proof-of-concepts, LLMs, RAG, AI agents, and data science initiatives using Fabric Lakehouse technologies.",
] as const;

export const expertiseGroups = [
  {
    title: "Data architecture",
    items: "Enterprise solution architecture, cloud data architecture, data lakes, lakehouse, data warehousing, dimensional modelling.",
  },
  {
    title: "Cloud & analytics",
    items: "Microsoft Azure, Microsoft Fabric, OneLake, Azure Synapse, Power BI, DAX, semantic models.",
  },
  {
    title: "Data engineering",
    items: "PySpark, ETL/ELT, IBM DataStage, Informatica, Talend, SSIS, Snowflake, data migration.",
  },
  {
    title: "Governance & security",
    items: "Data quality, metadata management, data lineage, data privacy, role-based access control, CI/CD.",
  },
  {
    title: "Emerging technologies",
    items: "Generative AI, LLMs, RAG, AI agents, data science.",
  },
] as const;

export const achievements = [
  "Led and mentored teams of 30+ professionals.",
  "Technical delivery, solution design, resource planning, stakeholder management, vendor governance, and client consulting.",
  "Cloud migration, data modernisation, governance, and enterprise analytics initiatives.",
  "Measurable business impact through analytics automation and improved reporting efficiency.",
] as const;

export const experience = [
  {
    organisation: "Syngene Pharma Private Limited",
    role: "IT Technical Solution Architect",
    period: "November 2023 – July 2024",
    summary:
      "Oversaw ETL operations, data security, vendor assessment, cost analysis, presales, solution proposals, and client engagement.",
  },
  {
    organisation: "HCL Technologies",
    role: "IT Solution Architect – Delivery Lead",
    period: "April 2018 – September 2023",
    summary:
      "Managed Azure infrastructure and application solutions, automation, performance monitoring, cloud optimisation, and stakeholder coordination.",
  },
  {
    organisation: "AIG Data Service",
    role: "Senior Technical Manager",
    period: "January 2016 – March 2017",
    summary:
      "Managed ETL operations, data security, vendor governance, procurement, cost analysis, and presales support.",
  },
  {
    organisation: "iGATE Global Solutions",
    role: "Technical Manager",
    period: "March 2011 – January 2016",
    summary:
      "Designed and optimised IBM DataStage ETL workflows, data integration, transformations, scheduling, and performance monitoring.",
  },
  {
    organisation: "Tata Consultancy Services",
    role: "ETL Technical Lead",
    period: "April 2007 – March 2011",
    summary:
      "Led ETL teams, designed data integration solutions, managed project delivery, and worked with DataStage, Informatica, Talend, and SSIS.",
  },
  {
    organisation: "HCL Technologies",
    role: "Software Engineer",
    period: "February 2005 – March 2007",
    summary: "Supported ETL development, requirements gathering, testing, and code reviews.",
  },
] as const;

export const reviews = [
  {
    quote:
      "Interview preparation, mock interviews, project storytelling, and a practical path into data engineering, cloud, and architecture.",
    name: "Freshers",
    context: "₹499 · 1 hour",
  },
  {
    quote:
      "Architect mentoring, design trade-offs, stakeholder communication, and a skills plan for the move from engineer to architect.",
    name: "Experienced professionals",
    context: "₹999 · 2 hours",
  },
  {
    quote:
      "Microsoft Fabric, Azure data platforms, governance, and pre-sales architecture for startups and mid-size teams.",
    name: "Companies",
    context: "From ₹2,000 / day",
  },
] as const;

export const faqs = [
  {
    question: "Who is this for?",
    answer:
      "Freshers preparing for IT interviews, experienced developers and data engineers moving toward architecture, and startups or mid-size companies building Microsoft Fabric and Azure data platforms.",
  },
  {
    question: "How do sessions work?",
    answer:
      "Individual consultations are one-to-one video calls. Choose a service, share a preferred time, and pay on this site. Chevvanthi confirms the slot by email.",
  },
  {
    question: "What do the company packages cover?",
    answer:
      "Daily, weekly, and monthly consulting covers data platform architecture, Microsoft Fabric and OneLake, Azure Data Factory, Azure Synapse, governance, performance, cost, Fabric IQ ontology, and pre-sales solution pitches.",
  },
  {
    question: "Where is Chevvanthi based?",
    answer:
      "Bangalore, India. Sessions and consulting are delivered remotely, so clients can join from other cities and time zones.",
  },
] as const;
