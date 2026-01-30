import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import VoiceIntake from "./pages/VoiceIntake";
import UploadEvidence from "./pages/UploadEvidence";
import Dashboard from "./pages/Dashboard";
import Dossier from "./pages/Dossier";
import Lawyers from "./pages/Lawyers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/voice-intake" element={<VoiceIntake />} />
            <Route path="/upload-evidence" element={<UploadEvidence />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dossier" element={<Dossier />} />
            <Route path="/lawyers" element={<Lawyers />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
