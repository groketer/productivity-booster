import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Gauge, Clock, Grid3X3, TrendingUp } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Gauge, path: '/' },
  { id: 'timer', label: 'Focus Timer', icon: Clock, path: '/timer' },
  { id: 'priority', label: 'Priority Matrix', icon: Grid3X3, path: '/priority' },
  { id: 'stats', label: 'Statistics', icon: TrendingUp, path: '/stats' },
];

export function Navigation() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location === tab.path;
            
            return (
              <button
                key={tab.id}
                onClick={() => setLocation(tab.path)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors flex items-center",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                data-testid={`button-nav-${tab.id}`}
              >
                <Icon className="mr-2 w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
