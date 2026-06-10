import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portafolio from "./pages/Portafolio.tsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.tsx";
import ExitIntentModal from "./components/ExitIntentModal.tsx";

// Rutas secundarias en chunks aparte: no pesan en la carga inicial de la home.
const Auth = lazy(() => import("./pages/Auth.tsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.tsx"));
const AdminPortafolio = lazy(() => import("./pages/AdminPortafolio.tsx"));
const Gracias = lazy(() => import("./pages/Gracias.tsx"));
const TestWebhook = lazy(() => import("./pages/TestWebhook.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
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
          </Suspense>
          <FloatingWhatsApp />
          <ExitIntentModal />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
