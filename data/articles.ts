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
    slug: "how-to-plan-an-international-career-move",
    title: "How to plan an international career move with more clarity",
    description: "A practical framework for deciding where to focus your job search when your next opportunity may be across borders.",
    publishedAt: "2026-03-24",
    readingTime: "5 min read",
    category: "Career strategy",
    author: {
      name: "Your counsellor's name",
      role: "International career consultant",
      bio: "Replace this placeholder with the counsellor's verified background, qualifications, and relevant experience before publishing.",
    },
    sections: [
      { heading: "Start with the work, not the location", paragraphs: ["A new country can be exciting, but it is rarely a useful starting point on its own. Begin by defining the kind of work, responsibility, and environment you want next. That gives you a clearer way to assess markets rather than chasing every possible option.", "Write down the roles that genuinely fit your strengths, then look for the markets where those roles are hired, valued, and realistic for your current experience."] },
      { heading: "Separate signals from assumptions", paragraphs: ["Job boards, employer career pages, professional communities, and conversations with people already working in a market will tell you more than broad headlines. Look for recurring role titles, visa requirements, language expectations, and the way employers describe success.", "The goal is not to predict every outcome. It is to replace vague ambition with useful evidence before you invest too much time."] },
      { heading: "Build a search rhythm you can sustain", paragraphs: ["International searches take time. Create a weekly rhythm for role research, tailored applications, profile refinement, and relationship-building. A smaller number of well-chosen applications is more useful than a large volume of generic ones.", "Keep a simple record of what receives a response. It will show you which positioning is working and where to adjust your approach."] },
    ],
    status: "published",
  },
  {
    slug: "turn-experience-into-a-clear-career-story",
    title: "Turn your experience into a career story people remember",
    description: "Move beyond a list of responsibilities and explain the value, direction, and evidence behind your professional experience.",
    publishedAt: "2026-03-10",
    readingTime: "4 min read",
    category: "Career positioning",
    author: {
      name: "Your counsellor's name",
      role: "International career consultant",
      bio: "Replace this placeholder with the counsellor's verified background, qualifications, and relevant experience before publishing.",
    },
    sections: [
      { heading: "Choose a through-line", paragraphs: ["A career story is not a chronological replay of every job. It is the thread that connects what you have done, what you are known for, and where you are going next.", "Identify two or three strengths that appear across your work. Then choose examples that show how those strengths created a useful outcome for a team, customer, or organisation."] },
      { heading: "Use evidence to make it credible", paragraphs: ["Specificity builds trust. Add context, scale, constraints, and outcomes to your examples. The detail does not have to be numerical, but it should help someone understand what changed because you were involved.", "Prepare a short version for introductions and a longer version for interview conversations. Both should feel natural rather than rehearsed."] },
      { heading: "Keep it relevant to the next role", paragraphs: ["A strong story makes a future connection. End by explaining the type of challenge you want to contribute to next and why your experience gives you a useful perspective.", "That shift from past tasks to future value helps hiring teams understand where you fit."] },
    ],
    status: "published",
  },
];

export const publishedArticles = articles.filter((article) => article.status === "published");
export const getArticle = (slug: string) => publishedArticles.find((article) => article.slug === slug);
