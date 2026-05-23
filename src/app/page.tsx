import CategoryFilter from "@/components/home/CategoryFilter";
import CTASection from "@/components/home/CTASection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HeroSection from "@/components/home/HeroSection";
import LandmarkContainer from "@/components/home/LandmarkContainer";

const HomePage = () => {
  return (
    <section className="min-h-screen">
      <HeroSection />
      <CategoryFilter />
      <FeaturedSection />
      <LandmarkContainer />
      <CTASection />
    </section>
  );
};
export default HomePage;
