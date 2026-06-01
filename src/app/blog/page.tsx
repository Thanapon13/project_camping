import { BookOpen, Calendar, Clock } from "lucide-react";

const posts = [
  {
    title: "Top 10 Hidden Gems in Northern Thailand",
    excerpt:
      "From misty mountain trails to serene temples, discover the lesser-known treasures of Chiang Mai, Chiang Rai, and beyond.",
    date: "May 12, 2025",
    readTime: "5 min read",
    category: "Travel Guide",
  },
  {
    title: "How to Plan the Perfect Camping Trip in Khao Yai",
    excerpt:
      "A complete guide to camping in one of Thailand's most beloved national parks, including the best spots and essential gear.",
    date: "April 28, 2025",
    readTime: "8 min read",
    category: "Camping",
  },
  {
    title: "Street Food Landmarks You Must Try in Bangkok",
    excerpt:
      "Food is culture. Explore Bangkok's iconic food landmarks that have been serving locals and visitors for generations.",
    date: "April 10, 2025",
    readTime: "4 min read",
    category: "Food & Culture",
  },
  {
    title: "Coastal Landmarks: The Best Beaches Off the Beaten Path",
    excerpt:
      "Skip the crowded tourist spots and discover secluded beaches in Trang, Satun, and the Gulf Coast islands.",
    date: "March 22, 2025",
    readTime: "6 min read",
    category: "Beach & Nature",
  },
];

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Travel stories, guides, and tips to help you explore Thailand like a local.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map(({ title, excerpt, date, readTime, category }) => (
            <article
              key={title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {category}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon note */}
        <div className="mt-10 text-center bg-card border border-border rounded-2xl p-8">
          <p className="text-muted-foreground text-sm">
            More articles coming soon. Stay tuned!
          </p>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
