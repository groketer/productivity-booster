import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, CheckCircle, Clock, TrendingUp, Trophy, Brain, Target } from 'lucide-react';
import { useStats } from '@/hooks/use-stats';
import { useTasks } from '@/hooks/use-tasks';

export default function Stats() {
  const { stats, getWeeklyData, todaysFocusMinutes, todaysSessions } = useStats();
  const { getCompletedTasks } = useTasks();
  
  const weeklyData = getWeeklyData();
  const completedTasks = getCompletedTasks();
  const weeklyTasksCompleted = completedTasks.filter(task => {
    if (!task.completedAt) return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(task.completedAt) >= weekAgo;
  }).length;

  const avgCompletion = weeklyData.length > 0 
    ? Math.round(weeklyData.reduce((sum, day) => sum + day.completionRate, 0) / weeklyData.length)
    : 0;

  const achievements = [
    {
      icon: Trophy,
      title: `${stats.currentStreak}-Day Streak!`,
      description: `Completed tasks ${stats.currentStreak} days in a row`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    },
    {
      icon: Brain,
      title: 'Focus Master',
      description: `Completed ${todaysSessions} Pomodoro sessions today`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      icon: Target,
      title: 'Goal Achiever',
      description: `Reached ${avgCompletion}% average completion rate`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
  ];

  const insights = [
    {
      title: 'Peak Performance Time',
      description: "You're most productive between 9-11 AM",
      color: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
      textColor: 'text-blue-900 dark:text-blue-100',
      subTextColor: 'text-blue-700 dark:text-blue-300',
    },
    {
      title: 'Great Focus Habits',
      description: 'Your 25-minute sessions show excellent concentration',
      color: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
      textColor: 'text-green-900 dark:text-green-100',
      subTextColor: 'text-green-700 dark:text-green-300',
    },
    {
      title: 'Weekend Opportunity',
      description: 'Consider light planning on weekends',
      color: 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
      textColor: 'text-orange-900 dark:text-orange-100',
      subTextColor: 'text-orange-700 dark:text-orange-300',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Statistics & Progress</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2" data-testid="text-current-streak">
              {stats.currentStreak}
            </div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
            <div className="mt-2">
              <Flame className="w-6 h-6 text-orange-500 mx-auto" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-500 mb-2" data-testid="text-weekly-tasks">
              {weeklyTasksCompleted}
            </div>
            <div className="text-sm text-muted-foreground">Tasks This Week</div>
            <div className="mt-2">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-orange-500 mb-2" data-testid="text-focus-hours">
              {(todaysFocusMinutes / 60).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Focus Hours Today</div>
            <div className="mt-2">
              <Clock className="w-6 h-6 text-orange-500 mx-auto" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-500 mb-2" data-testid="text-avg-completion">
              {avgCompletion}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Completion</div>
            <div className="mt-2">
              <TrendingUp className="w-6 h-6 text-purple-500 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                <div
                  className="bg-primary rounded-lg flex items-end justify-center pb-2 min-h-[2rem]"
                  style={{ 
                    height: `${Math.max(32, (day.completionRate / 100) * 96)}px`,
                    opacity: day.completionRate > 0 ? 1 : 0.3 
                  }}
                  data-testid={`bar-weekly-${index}`}
                >
                  <span className="text-xs text-primary-foreground font-medium">
                    {day.completionRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Productivity Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${achievement.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon className={`${achievement.color} text-sm w-4 h-4`} />
                    </div>
                    <div>
                      <div className="font-medium" data-testid={`text-achievement-${index}`}>
                        {achievement.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Productivity Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-3 ${insight.color} border rounded-lg`}
                  data-testid={`tip-${index}`}
                >
                  <div className={`font-medium ${insight.textColor}`}>
                    {insight.title}
                  </div>
                  <div className={`text-sm ${insight.subTextColor}`}>
                    {insight.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
