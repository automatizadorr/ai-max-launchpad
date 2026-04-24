import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Servicios from "./pages/Servicios.tsx";
import CasosExito from "./pages/CasosExito.tsx";
import Contacto from "./pages/Contacto.tsx";
import Portafolio from "./pages/Portafolio.tsx";
import Auth from "./pages/Auth.tsx";
import AdminPortafolio from "./pages/AdminPortafolio.tsx";
import NotFound from "./pages/NotFound.tsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/casos-exito" element={<CasosExito />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/portafolio" element={<AdminPortafolio />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWhatsApp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
