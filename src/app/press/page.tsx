import { Newspaper, Mail, Download, ExternalLink } from "lucide-react";

const coverage = [
  {
    outlet: "TechTH Magazine",
    headline: "Landmark Explorer Brings Thai Tourism into the Digital Age",
    date: "April 2025",
  },
  {
    outlet: "Travel Asia Weekly",
    headline: "The App That's Changing How Tourists Discover Thailand",
    date: "March 2025",
  },
  {
    outlet: "Startup Thailand",
    headline: "Landmark Explorer Tops 10,000 Active Users in First Quarter",
    date: "February 2025",
  },
];

const assets = [
  { name: "Logo Pack (SVG + PNG)", size: "2.4 MB" },
  { name: "Brand Guidelines", size: "1.1 MB" },
  { name: "Product Screenshots", size: "8.3 MB" },
  { name: "Founder Photos", size: "4.7 MB" },
];

const PressPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Newspaper className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Press</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Resources and information for journalists and media professionals.
          </p>
        </div>

        {/* Company overview */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-semibold mb-3">Company Overview</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Landmark Explorer is a Thailand-based travel discovery platform
            that connects travelers with landmarks, camping spots, and hidden
            gems across all 77 provinces. Launched in 2025, the platform has
            grown to over 10,000 active users and 500+ community-contributed
            landmarks.
          </p>
        </div>

        {/* Media Contact */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-10 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground mb-1">Media Contact</h2>
            <p className="text-sm text-muted-foreground mb-2">
              For press inquiries, interview requests, or media partnerships:
            </p>
            <a
              href="mailto:thanapon.dev.work@gmail.com"
              className="text-sm font-medium text-primary hover:underline"
            >
              thanapon.dev.work@gmail.com
            </a>
          </div>
        </div>

        {/* Press Kit */}
        <h2 className="text-xl font-semibold mb-4">Press Kit</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {assets.map(({ name, size }) => (
            <div
              key={name}
              className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{size}</p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>

        {/* Coverage */}
        <h2 className="text-xl font-semibold mb-4">In the Press</h2>
        <div className="space-y-4">
          {coverage.map(({ outlet, headline, date }) => (
            <div
              key={headline}
              className="bg-card border border-border rounded-2xl p-5 flex items-start justify-between gap-4"
            >
              <div>
                <p className="text-xs font-medium text-primary mb-1">{outlet}</p>
                <p className="text-sm font-medium text-foreground leading-snug">
                  {headline}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{date}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PressPage;
