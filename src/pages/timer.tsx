import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTimer } from '@/hooks/use-timer';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { UserSettings } from '@shared/schema';

export default function Timer() {
  const {
    isRunning,
    timeLeft,
    currentType,
    cycleCount,
    formatTime,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    strokeDashoffset,
    getTodaysFocusMinutes,
    getTodaysSessions,
  } = useTimer();

  const [settings, setSettings] = useLocalStorage<UserSettings>('productivity-settings', {
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    theme: 'light',
    soundEnabled: true,
  });

  const todaysSessions = getTodaysSessions().filter(s => s.type === 'focus').length;
  const totalMinutes = getTodaysFocusMinutes();

  const handleToggleTimer = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getTimerModeDisplay = () => {
    switch (currentType) {
      case 'focus':
        return 'Focus Session';
      case 'short-break':
        return 'Short Break';
      case 'long-break':
        return 'Long Break';
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto">
        {/* Timer Card */}
        <Card className="p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Focus Timer</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Circular Timer Display */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="w-64 h-64 transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted opacity-20"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary timer-circle"
                  style={{ strokeDashoffset }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-4xl font-bold" data-testid="text-timer-display">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize" data-testid="text-timer-mode">
                    {getTimerModeDisplay()}
                  </div>
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                onClick={handleToggleTimer}
                className="px-8 py-3"
                data-testid="button-timer-toggle"
              >
                {isRunning ? (
                  <>
                    <Pause className="mr-2 w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 w-4 h-4" />
                    Start
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={resetTimer}
                className="px-6 py-3"
                data-testid="button-timer-reset"
              >
                <RotateCcw className="mr-2 w-4 h-4" />
                Reset
              </Button>
            </div>

            {/* Session Info */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary" data-testid="text-current-cycle">
                  {cycleCount + 1}
                </div>
                <div className="text-sm text-muted-foreground">Current Cycle</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500" data-testid="text-sessions-today">
                  {todaysSessions}
                </div>
                <div className="text-sm text-muted-foreground">Sessions Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500" data-testid="text-total-minutes">
                  {totalMinutes}
                </div>
                <div className="text-sm text-muted-foreground">Minutes Focused</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timer Settings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Timer Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="focusTime">Focus Time</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="focusTime"
                    type="number"
                    min="1"
                    max="60"
                    value={settings.focusMinutes}
                    onChange={(e) => updateSetting('focusMinutes', parseInt(e.target.value))}
                    className="w-20"
                    data-testid="input-focus-minutes"
                  />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              </div>
              <div>
                <Label htmlFor="shortBreak">Short Break</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="shortBreak"
                    type="number"
                    min="1"
                    max="30"
                    value={settings.shortBreakMinutes}
                    onChange={(e) => updateSetting('shortBreakMinutes', parseInt(e.target.value))}
                    className="w-20"
                    data-testid="input-short-break-minutes"
                  />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              </div>
              <div>
                <Label htmlFor="longBreak">Long Break</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="longBreak"
                    type="number"
                    min="5"
                    max="60"
                    value={settings.longBreakMinutes}
                    onChange={(e) => updateSetting('longBreakMinutes', parseInt(e.target.value))}
                    className="w-20"
                    data-testid="input-long-break-minutes"
                  />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
