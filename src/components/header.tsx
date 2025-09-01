import { Rocket, Flame, Moon, Sun } from 'lucide-react';
import { useStats } from '@/hooks/use-stats';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { UserSettings } from '@shared/schema';

export function Header() {
  const { stats } = useStats();
  const [settings, setSettings] = useLocalStorage<UserSettings>('productivity-settings', {
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    theme: 'light',
    soundEnabled: true,
  });

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings(prev => ({ ...prev, theme: newTheme }));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Rocket className="text-primary text-2xl mr-3" />
            <h1 className="text-xl font-bold text-foreground">Productivity Booster</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-secondary rounded-lg px-3 py-1">
              <Flame className="text-orange-500 mr-2 w-4 h-4" />
              <span className="text-sm font-medium" data-testid="text-streak">
                {stats.currentStreak} day streak
              </span>
            </div>
            <button 
              className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {settings.theme === 'light' ? (
                <Moon className="text-muted-foreground w-4 h-4" />
              ) : (
                <Sun className="text-muted-foreground w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
