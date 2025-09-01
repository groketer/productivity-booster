import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';
import { PomodoroSession, UserSettings } from '@shared/schema';

type TimerType = 'focus' | 'short-break' | 'long-break';

export function useTimer() {
  const [settings] = useLocalStorage<UserSettings>('productivity-settings', {
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    theme: 'light',
    soundEnabled: true,
  });

  const [sessions, setSessions] = useLocalStorage<PomodoroSession[]>('pomodoro-sessions', []);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);
  const [currentType, setCurrentType] = useState<TimerType>('focus');
  const [cycleCount, setCycleCount] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getSessionDuration = useCallback((type: TimerType) => {
    switch (type) {
      case 'focus':
        return settings.focusMinutes * 60;
      case 'short-break':
        return settings.shortBreakMinutes * 60;
      case 'long-break':
        return settings.longBreakMinutes * 60;
    }
  }, [settings]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getSessionDuration(currentType));
  }, [currentType, getSessionDuration]);

  const completeSession = useCallback(() => {
    const session: PomodoroSession = {
      id: crypto.randomUUID(),
      type: currentType,
      duration: getSessionDuration(currentType),
      completedAt: new Date(),
    };
    
    setSessions(prev => [...prev, session]);

    if (currentType === 'focus') {
      const newCycleCount = cycleCount + 1;
      setCycleCount(newCycleCount);
      
      if (newCycleCount % 4 === 0) {
        setCurrentType('long-break');
      } else {
        setCurrentType('short-break');
      }
    } else {
      setCurrentType('focus');
    }

    setIsRunning(false);
    setTimeLeft(getSessionDuration(currentType === 'focus' ? 
      (cycleCount + 1) % 4 === 0 ? 'long-break' : 'short-break' : 'focus'));
  }, [currentType, cycleCount, getSessionDuration, setSessions]);

  const switchMode = useCallback((type: TimerType) => {
    setCurrentType(type);
    setTimeLeft(getSessionDuration(type));
    setIsRunning(false);
  }, [getSessionDuration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, completeSession]);

  const progress = (getSessionDuration(currentType) - timeLeft) / getSessionDuration(currentType);
  const strokeDashoffset = 314 - (progress * 314);

  const getTodaysSessions = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return sessions.filter(session => {
      const sessionDate = new Date(session.completedAt);
      return sessionDate >= today && sessionDate < tomorrow;
    });
  }, [sessions]);

  const getTodaysFocusMinutes = useCallback(() => {
    const todaysSessions = getTodaysSessions();
    return todaysSessions
      .filter(session => session.type === 'focus')
      .reduce((total, session) => total + Math.floor(session.duration / 60), 0);
  }, [getTodaysSessions]);

  return {
    isRunning,
    timeLeft,
    currentType,
    cycleCount,
    formatTime,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    progress,
    strokeDashoffset,
    getTodaysSessions,
    getTodaysFocusMinutes,
    settings,
  };
}
