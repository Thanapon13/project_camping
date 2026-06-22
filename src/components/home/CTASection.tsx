import { ArrowRight, MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MotionDiv from "@/components/motion/MotionDiv";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-primary"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative px-6 py-16 lg:px-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground text-sm font-medium mb-8">
                <Compass className="w-4 h-4" />
                Start Your Journey
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground text-balance mb-6">
                Ready to Explore Thailand&apos;s Most Beautiful Places?
              </h2>

              <p className="text-lg text-primary-foreground/80 mb-10 text-pretty">
                Join thousands of travelers discovering hidden gems and iconic
                landmarks across the Land of Smiles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="pl-12 h-14 rounded-xl bg-white border-0 text-foreground"
                  />
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-14 px-8 rounded-xl gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <p className="mt-6 text-sm text-primary-foreground/60">
                Free to use. No credit card required.
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default CTASection;
