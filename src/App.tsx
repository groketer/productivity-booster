import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { UserSettings } from "@shared/schema";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import Dashboard from "@/pages/dashboard";
import Timer from "@/pages/timer";
import Priority from "@/pages/priority";
import Stats from "@/pages/stats";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/timer" component={Timer} />
      <Route path="/priority" component={Priority} />
      <Route path="/stats" component={Stats} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [settings] = useLocalStorage<UserSettings>('productivity-settings', {
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    theme: 'light',
    soundEnabled: true,
  });

  // Apply theme on mount and when settings change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
