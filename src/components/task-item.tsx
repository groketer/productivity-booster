import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2 } from 'lucide-react';
import { Task } from '@shared/schema';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  high: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'completed';
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && dueDate < new Date() && !isCompleted;

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (taskDate.getTime() === today.getTime()) {
      return `Due ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else if (taskDate.getTime() === today.getTime() + 86400000) {
      return 'Due tomorrow';
    } else if (taskDate.getTime() === today.getTime() - 86400000) {
      return 'Due yesterday';
    } else {
      return `Due ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  };

  return (
    <div className={cn(
      "task-item flex items-center space-x-4 p-4 bg-background rounded-lg border border-border",
      isCompleted && "opacity-60"
    )}>
      <Checkbox
        checked={isCompleted}
        onCheckedChange={() => onToggleComplete(task.id)}
        className="w-5 h-5"
        data-testid={`checkbox-task-${task.id}`}
      />
      
      <div className="flex-1 min-w-0">
        <h4 className={cn(
          "font-medium text-foreground",
          isCompleted && "line-through"
        )}>
          {task.title}
        </h4>
        <div className="flex items-center space-x-2 mt-1">
          <Badge 
            variant="secondary" 
            className={cn("text-xs", priorityColors[task.priority])}
          >
            {task.priority}
          </Badge>
          {dueDate && (
            <p className={cn(
              "text-sm",
              isOverdue ? "text-destructive" : "text-muted-foreground"
            )}>
              {formatDueDate(dueDate)}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Badge className={cn("text-xs", statusColors[task.status])}>
          {task.status === 'in-progress' ? 'In Progress' : 
           task.status === 'completed' ? 'Completed' : 'Pending'}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="text-muted-foreground hover:text-foreground"
          data-testid={`button-edit-task-${task.id}`}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-muted-foreground hover:text-destructive"
          data-testid={`button-delete-task-${task.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
