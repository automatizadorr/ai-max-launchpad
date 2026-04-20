import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechMarquee from "@/components/TechMarquee";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <PortfolioSection />
        <Testimonials />
        <TechMarquee />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
