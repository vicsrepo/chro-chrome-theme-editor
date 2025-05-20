import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import { ThemeSettingsProvider } from "@/lib/theme-context";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeSettingsProvider>
          <div className="min-h-screen flex flex-col bg-dark-DEFAULT text-light-DEFAULT">
            <AppHeader currentLanguage="CZ" />
            <main className="flex-grow py-6">
              <Toaster />
              <Router />
            </main>
            <AppFooter />
          </div>
        </ThemeSettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;