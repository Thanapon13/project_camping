import { MapPin, Users, Star, Globe } from "lucide-react";

const stats = [
  { value: "500+", label: "Landmarks", icon: MapPin },
  { value: "77", label: "Provinces", icon: Globe },
  { value: "10K+", label: "Travelers", icon: Users },
  { value: "4.8", label: "Avg Rating", icon: Star },
];

const features = [
  {
    title: "Discover Hidden Gems",
    description:
      "Explore thousands of landmarks across all 77 provinces of Thailand, from ancient temples to breathtaking natural wonders.",
  },
  {
    title: "Community Powered",
    description:
      "Real reviews and ratings from real travelers. Our community ensures every listing is authentic and up to date.",
  },
  {
    title: "Interactive Maps",
    description:
      "Find landmarks near you with our integrated map. Navigate easily and plan your perfect trip route.",
  },
  {
    title: "Save Your Favorites",
    description:
      "Build your personal collection of must-visit places. Access your favorites anytime, anywhere.",
  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About Landmark Explorer</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We are on a mission to help travelers discover the most beautiful
            and unique landmarks across Thailand — from iconic destinations to
            hidden local treasures.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Landmark Explorer was built to make travel planning effortless and
            inspiring. We believe every corner of Thailand deserves to be seen.
            By connecting travelers with local knowledge and community reviews,
            we help you find places that guidebooks miss.
          </p>
        </div>

        {/* Features */}
        <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
