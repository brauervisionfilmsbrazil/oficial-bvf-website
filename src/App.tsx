import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import PortfolioPage from "./pages/PortfolioPage";
import ClientsPage from "./pages/ClientsPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import { initMetaPixel } from "./lib/metaPixel";

const queryClient = new QueryClient();

const MetaPixelInitializer = () => {
  useEffect(() => {
    initMetaPixel();
  }, []);
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MetaPixelInitializer />
          <Layout>
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/clientes" element={<ClientsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/quem-somos" element={<AboutPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
