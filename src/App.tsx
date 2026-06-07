import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portafolio from "./pages/Portafolio.tsx";
import Auth from "./pages/Auth.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import AdminPortafolio from "./pages/AdminPortafolio.tsx";
import Gracias from "./pages/Gracias.tsx";
import TestWebhook from "./pages/TestWebhook.tsx";
import NotFound from "./pages/NotFound.tsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.tsx";
import ExitIntentModal from "./components/ExitIntentModal.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portafolio />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin/portafolio" element={<AdminPortafolio />} />
            <Route path="/test-webhook" element={<TestWebhook />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWhatsApp />
          <ExitIntentModal />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
