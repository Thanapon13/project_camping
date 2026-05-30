import { Suspense } from "react";
import CTASection from "@/components/home/CTASection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HeroSection from "@/components/home/HeroSection";
import LandmarkContainer from "@/components/home/LandmarkContainer";
import LoadingCard from "@/components/card/LoadingCard";

const HomePage = () => {
  return (
    <section className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <Suspense fallback={<LoadingCard count={8} />}>
        <LandmarkContainer />
      </Suspense>
      <CTASection />
    </section>
  );
};
export default HomePage;
