import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import { UserStats } from '@shared/schema';
import { useTasks } from './use-tasks';
import { useTimer } from './use-timer';

export function useStats() {
  const [stats, setStats] = useLocalStorage<UserStats>('productivity-stats', {
    currentStreak: 0,
    longestStreak: 0,
    totalTasksCompleted: 0,
    totalFocusMinutes: 0,
  });

  const { getCompletedTasks, getDailyCompletionRate } = useTasks();
  const { getTodaysFocusMinutes, getTodaysSessions } = useTimer();

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const completedTasks = getCompletedTasks();
    const hasTasksToday = completedTasks.some(task => 
      task.completedAt && new Date(task.completedAt).toDateString() === today
    );

    if (hasTasksToday) {
      if (stats.lastActiveDate === yesterdayStr) {
        const newStreak = stats.currentStreak + 1;
        setStats(prev => ({
          ...prev,
          currentStreak: newStreak,
          longestStreak: Math.max(prev.longestStreak, newStreak),
          lastActiveDate: today,
        }));
      } else if (stats.lastActiveDate !== today) {
        setStats(prev => ({
          ...prev,
          currentStreak: 1,
          lastActiveDate: today,
        }));
      }
    }
  }, [stats, setStats, getCompletedTasks]);

  const getWeeklyData = useCallback(() => {
    const weekData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const dayTasks = getCompletedTasks().filter(task => {
        if (!task.completedAt) return false;
        const taskDate = new Date(task.completedAt);
        return taskDate >= date && taskDate < nextDay;
      });

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const completionRate = dayTasks.length > 0 ? Math.min(100, dayTasks.length * 20) : 0;
      
      weekData.push({
        day: dayName,
        date: date.toDateString(),
        completionRate,
        tasksCompleted: dayTasks.length,
      });
    }
    
    return weekData;
  }, [getCompletedTasks]);

  const updateTotalStats = useCallback(() => {
    const totalCompleted = getCompletedTasks().length;
    const totalFocusTime = getTodaysFocusMinutes();
    
    setStats(prev => ({
      ...prev,
      totalTasksCompleted: totalCompleted,
      totalFocusMinutes: prev.totalFocusMinutes + totalFocusTime,
    }));
  }, [getCompletedTasks, getTodaysFocusMinutes, setStats]);

  // Update streak when component mounts or tasks change
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return {
    stats,
    updateStreak,
    getWeeklyData,
    updateTotalStats,
    dailyCompletionRate: getDailyCompletionRate(),
    todaysFocusMinutes: getTodaysFocusMinutes(),
    todaysSessions: getTodaysSessions().filter(s => s.type === 'focus').length,
  };
}
