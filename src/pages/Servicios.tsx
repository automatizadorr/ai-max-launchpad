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
        title="Servicios IA: Agentes, Voz y n8n 24/7 | AI-MaX"
        description="Implementamos agentes conversacionales, asistentes de voz IA y automatizaciones n8n integradas a tu CRM. Operativos en 4-6 semanas. Chile y LATAM."
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
