import { Task, TaskCategoryType } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriorityQuadrantProps {
  title: string;
  description: string;
  color: string;
  tasks: Task[];
  category: TaskCategoryType;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const categoryColors: Record<TaskCategoryType, string> = {
  'urgent-important': 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
  'important': 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
  'urgent': 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
  'neither': 'bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800',
};

const categoryTextColors: Record<TaskCategoryType, string> = {
  'urgent-important': 'text-red-900 dark:text-red-100',
  'important': 'text-blue-900 dark:text-blue-100',
  'urgent': 'text-yellow-900 dark:text-yellow-100',
  'neither': 'text-gray-900 dark:text-gray-100',
};

const categorySubTextColors: Record<TaskCategoryType, string> = {
  'urgent-important': 'text-red-700 dark:text-red-300',
  'important': 'text-blue-700 dark:text-blue-300',
  'urgent': 'text-yellow-700 dark:text-yellow-300',
  'neither': 'text-gray-700 dark:text-gray-300',
};

export function PriorityQuadrant({ 
  title, 
  description, 
  color, 
  tasks, 
  category,
  onEditTask, 
  onDeleteTask,
  onToggleComplete 
}: PriorityQuadrantProps) {
  return (
    <div className="matrix-cell bg-card rounded-lg border border-border shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className={cn("w-4 h-4 rounded mr-3", color)}></div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No tasks in this category</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "p-3 rounded-lg border transition-all hover:shadow-sm",
                categoryColors[category],
                task.status === 'completed' && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => onToggleComplete(task.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                      data-testid={`checkbox-priority-task-${task.id}`}
                    />
                    <h4 className={cn(
                      "font-medium",
                      categoryTextColors[category],
                      task.status === 'completed' && "line-through"
                    )}>
                      {task.title}
                    </h4>
                  </div>
                  {task.dueDate && (
                    <p className={cn("text-sm", categorySubTextColors[category])}>
                      {new Date(task.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  )}
                  {task.estimatedMinutes && (
                    <p className={cn("text-sm", categorySubTextColors[category])}>
                      ~{task.estimatedMinutes} minutes
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditTask(task)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    data-testid={`button-edit-priority-task-${task.id}`}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTask(task.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    data-testid={`button-delete-priority-task-${task.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
