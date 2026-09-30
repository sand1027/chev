export const site = {
  name: "Chev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chev.consulting",
  description:
    "Strategic career guidance for ambitious professionals making their next international career move.",
  email: "hello@chev.consulting",
  counsellor: {
    // Replace these placeholders with verified bio, qualifications, and location before launch.
    name: "Your counsellor's name",
    role: "International career consultant",
    bio: "A thoughtful career partner for professionals navigating new roles, new markets, and meaningful change.",
    expertise: ["Career transitions", "Global job search", "Interview strategy"],
  },
} as const;

export const services = [
  {
    name: "Career clarity session",
    slug: "career-clarity",
    duration: "60 minutes",
    price: "Set your price",
    description: "A focused session to define the direction, decisions, and next practical steps in your career.",
    includes: ["Career direction audit", "Role and market focus", "A written next-step plan"],
  },
  {
    name: "Career positioning intensive",
    slug: "career-positioning",
    duration: "2 × 75 minutes",
    price: "Set your price",
    description: "Turn your experience into a clear narrative for your CV, LinkedIn profile, portfolio, and conversations.",
    includes: ["CV and LinkedIn review", "Professional narrative", "Positioning recommendations"],
  },
  {
    name: "Interview & offer support",
    slug: "interview-support",
    duration: "Tailored engagement",
    price: "Set your price",
    description: "Practical preparation for interviews, case studies, salary conversations, and confident decision-making.",
    includes: ["Mock interview practice", "Feedback and refinements", "Offer and negotiation guidance"],
  },
] as const;

export const reviews = [
  {
    quote: "I stopped applying everywhere and started targeting roles that made sense for my experience. The difference in response was immediate.",
    name: "Product leader",
    context: "Moved into a global SaaS role",
  },
  {
    quote: "The process gave me words for experience I had been underselling for years. I entered interviews with a story, not just a CV.",
    name: "Creative strategist",
    context: "Transitioned into brand leadership",
  },
  {
    quote: "Practical, direct, and genuinely encouraging. I walked away with a plan I could execute after every session.",
    name: "Operations professional",
    context: "Secured a cross-border opportunity",
  },
] as const;

export const faqs = [
  {
    question: "Who is Chev for?",
    answer: "Chev is for professionals who want clearer career direction, a stronger professional story, or practical support for a job search, interview process, or international move.",
  },
  {
    question: "Do you work with people outside your home country?",
    answer: "Yes. Sessions are designed to work remotely, making them a practical fit for professionals exploring opportunities across markets and time zones.",
  },
  {
    question: "What happens in the first conversation?",
    answer: "The first conversation is a chance to share what is changing, where you feel stuck, and what a useful outcome would look like. You can then decide whether an engagement is the right fit.",
  },
  {
    question: "How do I book a session?",
    answer: "Use the contact page to share a short note about what you need support with. Chev will reply with availability and the most suitable next step.",
  },
] as const;
