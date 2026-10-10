import { site } from "@/data/site";

const author = {
  name: site.counsellor.name,
  role: site.counsellor.role,
  bio: site.counsellor.bio,
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  category: string;
  author: { name: string; role: string; bio: string };
  sections: { heading: string; paragraphs: string[] }[];
  status: "published" | "draft";
};

export const articles: Article[] = [
  {
    slug: "explain-a-project-in-an-interview",
    title: "How to explain a project in an interview",
    description: "A simple way to walk through the problem, the design, and the trade-off without reading your résumé back to the panel.",
    publishedAt: "2026-03-24",
    readingTime: "5 min read",
    category: "Interview preparation",
    author,
    sections: [
      { heading: "Start with the problem", paragraphs: ["Name the business problem before the tools. A fresher project and a platform migration both need the same opening: who was stuck, and what had to change.", "If you begin with the product list, the interviewer has to guess why the work mattered."] },
      { heading: "Show one decision", paragraphs: ["Pick a single design choice and say what you gave up. Storage, latency, cost, or a simpler pipeline are all valid trade-offs if you can explain them.", "Then say how you would know the choice was wrong. That is more useful than a feature tour."] },
      { heading: "Close with what you would do next", paragraphs: ["End with the next improvement, not a summary of every task. It shows you can see past the ticket you were given.", "Keep a two-minute version and a longer one. Both should use the same story."] },
    ],
    status: "published",
  },
  {
    slug: "from-engineer-to-solution-architect",
    title: "The move from engineer to solution architect",
    description: "What changes when the job is no longer only the pipeline, and how to talk about that shift in an interview.",
    publishedAt: "2026-03-10",
    readingTime: "4 min read",
    category: "Architecture mentoring",
    author,
    sections: [
      { heading: "The work gets wider", paragraphs: ["An architect still needs the engineering, but the day is also stakeholders, constraints, and a design other people can implement.", "If your examples stop at the code you wrote, the conversation stays at engineer."] },
      { heading: "Trade-offs are the evidence", paragraphs: ["Bring one case where two reasonable options existed. Say who was affected, what it cost, and which risk you accepted.", "Microsoft Fabric, Azure, Synapse, or a lakehouse only help the story if they are tied to that decision."] },
      { heading: "Ask for the gap, then close it", paragraphs: ["List the conversations you have not led yet: a pre-sales pitch, a security review, a cost argument. Those are the practice sessions.", "A mentoring hour is more useful when you arrive with that gap written down."] },
    ],
    status: "published",
  },
];

export const publishedArticles = articles.filter((article) => article.status === "published");
export const getArticle = (slug: string) => publishedArticles.find((article) => article.slug === slug);
