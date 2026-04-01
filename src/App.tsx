import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PostHogPageView from "./components/PostHogPageView";
import Index from "./pages/Index";
import RolePage from "./pages/RolePage";
import Contact from "./pages/Contact";
import BlogIndex from "./pages/blog/BlogIndex";
import ChatBotVsAiSotrudnik from "./pages/blog/ChatBotVsAiSotrudnik";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogPageView />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* New clean URLs → redirect to existing role pages */}
          <Route path="/ai-manager" element={<Navigate to="/roles/receptionist" replace />} />
          <Route path="/ai-growth" element={<Navigate to="/roles/growth" replace />} />
          <Route path="/ai-creator" element={<Navigate to="/roles/creator" replace />} />
          {/* Existing role pages */}
          <Route path="/roles/:slug" element={<RolePage />} />
          {/* Blog */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/chat-bot-vs-ai-sotrudnik" element={<ChatBotVsAiSotrudnik />} />
          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
