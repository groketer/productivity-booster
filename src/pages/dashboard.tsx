import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Brain, PlusCircle, Plus } from 'lucide-react';
import { useTasks } from '@/hooks/use-tasks';
import { useStats } from '@/hooks/use-stats';
import { TaskItem } from '@/components/task-item';
import { TaskModal } from '@/components/task-modal';
import { Task } from '@shared/schema';

export default function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete, getTodaysTasks, getDailyCompletionRate } = useTasks();
  const { todaysFocusMinutes, todaysSessions } = useStats();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [quickTaskText, setQuickTaskText] = useState('');

  const todaysTasks = getTodaysTasks();
  const completedTasks = todaysTasks.filter(task => task.status === 'completed');
  const completionRate = getDailyCompletionRate();
  const focusSessionGoal = 6;
  const focusProgress = Math.min(100, (todaysSessions / focusSessionGoal) * 100);

  const handleQuickAdd = () => {
    if (!quickTaskText.trim()) return;
    
    addTask({
      title: quickTaskText.trim(),
      priority: 'medium',
      category: 'important',
      description: '',
    });
    
    setQuickTaskText('');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Progress Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <CalendarDays className="text-primary mr-2 w-5 h-5" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Tasks completed</span>
              <span className="font-medium" data-testid="text-task-progress">
                {completedTasks.length} / {todaysTasks.length}
              </span>
            </div>
            <Progress value={completionRate} className="h-2" data-testid="progress-tasks" />
            <div className="text-2xl font-bold text-primary" data-testid="text-completion-percentage">
              {completionRate}%
            </div>
          </CardContent>
        </Card>

        {/* Focus Sessions Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Brain className="text-orange-500 mr-2 w-5 h-5" />
              Focus Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Sessions today</span>
              <span className="font-medium" data-testid="text-focus-progress">
                {todaysSessions} / {focusSessionGoal}
              </span>
            </div>
            <Progress value={focusProgress} className="h-2" data-testid="progress-focus" />
            <div className="text-2xl font-bold text-orange-500" data-testid="text-focus-minutes">
              {todaysFocusMinutes} min
            </div>
          </CardContent>
        </Card>

        {/* Quick Add Task Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <PlusCircle className="text-green-500 mr-2 w-5 h-5" />
              Quick Add
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="What do you need to do?"
              value={quickTaskText}
              onChange={(e) => setQuickTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickAdd()}
              data-testid="input-quick-task"
            />
            <Button
              onClick={handleQuickAdd}
              className="w-full"
              disabled={!quickTaskText.trim()}
              data-testid="button-quick-add-task"
            >
              Add Task
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Task List Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Today's Tasks</CardTitle>
            <Button onClick={() => setIsModalOpen(true)} data-testid="button-add-task-modal">
              <Plus className="mr-2 w-4 h-4" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {todaysTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tasks scheduled for today</p>
                <p className="text-sm mt-1">Add a task to get started!</p>
              </div>
            ) : (
              todaysTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <TaskModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        task={editingTask}
      />
    </div>
  );
}
