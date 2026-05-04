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
import SEO from "@/components/SEO";

const Servicios = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Servicios de IA y Automatización | AI-MaX"
        description="Agentes conversacionales, asistentes de voz IA y automatización de flujos de trabajo (n8n) para empresas en Chile y Latinoamérica."
        path="/servicios"
        ogImage="/og-servicios.png"
      />
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

export default Servicios;
