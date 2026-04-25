import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ProblemSection from "@/components/ProblemSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechMarquee from "@/components/TechMarquee";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import LocalSEO from "@/components/LocalSEO";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PortfolioShowcase />
        <ProblemSection />
        <PortfolioSection />
        <Testimonials />
        <TechMarquee />
        <LocalSEO />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
