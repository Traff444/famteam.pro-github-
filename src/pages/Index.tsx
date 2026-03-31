import SEO from "@/components/SEO";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import { useMobileHeroSnap } from "@/hooks/useMobileHeroSnap";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import GallerySection from "@/components/sections/GallerySection";
import SystemInAction from "@/components/sections/SystemInAction";
import CompetitiveSection from "@/components/sections/CompetitiveSection";
import FAQSection from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  useMobileHeroSnap();

  return (
    <div className="site-root">
      <SEO />
      <Header />
      <main className="snap-scroll">
        {/* 1. Hero */}
        <HeroSection />
        {/* 2. What is it / Vision */}
        <VisionMissionSection />
        {/* 3. Products */}
        <GallerySection />
        {/* 4. How it works */}
        <SystemInAction />
        {/* 5. Why FamTeam */}
        <CompetitiveSection />
        {/* 6. FAQ */}
        <FAQSection />
        {/* 7. CTA + Footer */}
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
