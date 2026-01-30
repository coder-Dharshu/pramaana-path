import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/layout/FloatingAssistant";
import { PageTransition } from "@/components/ui/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ProcessSection />
          <CTASection />
        </main>
        <Footer />
        <FloatingAssistant />
      </div>
    </PageTransition>
  );
};

export default Index;
