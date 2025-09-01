import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Task, InsertTask, TaskPriorityType, TaskCategoryType } from '@shared/schema';
import { useTasks } from '@/hooks/use-tasks';

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  defaultCategory?: TaskCategoryType;
}

export function TaskModal({ open, onOpenChange, task, defaultCategory }: TaskModalProps) {
  const { addTask, updateTask } = useTasks();
  const [formData, setFormData] = useState<Partial<InsertTask>>({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    category: task?.category || defaultCategory || 'important',
    dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
    estimatedMinutes: task?.estimatedMinutes || undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title?.trim()) return;

    const taskData: InsertTask = {
      title: formData.title.trim(),
      description: formData.description || '',
      priority: formData.priority as TaskPriorityType,
      category: formData.category as TaskCategoryType,
      dueDate: formData.dueDate,
      estimatedMinutes: formData.estimatedMinutes,
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }

    onOpenChange(false);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: defaultCategory || 'important',
      dueDate: undefined,
      estimatedMinutes: undefined,
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    if (!task) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: defaultCategory || 'important',
        dueDate: undefined,
        estimatedMinutes: undefined,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {task ? 'Edit Task' : 'Add New Task'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              data-testid="input-task-title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add task description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              data-testid="textarea-task-description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as TaskPriorityType }))}
              >
                <SelectTrigger data-testid="select-task-priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as TaskCategoryType }))}
              >
                <SelectTrigger data-testid="select-task-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent-important">Urgent & Important</SelectItem>
                  <SelectItem value="important">Not Urgent & Important</SelectItem>
                  <SelectItem value="urgent">Urgent & Not Important</SelectItem>
                  <SelectItem value="neither">Not Urgent & Not Important</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">Due Date (Optional)</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate ? formData.dueDate.toISOString().slice(0, 16) : ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dueDate: e.target.value ? new Date(e.target.value) : undefined 
                }))}
                data-testid="input-task-due-date"
              />
            </div>

            <div>
              <Label htmlFor="estimatedMinutes">Estimated Time (min)</Label>
              <Input
                id="estimatedMinutes"
                type="number"
                min="1"
                placeholder="25"
                value={formData.estimatedMinutes || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  estimatedMinutes: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
                data-testid="input-task-estimated-minutes"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              data-testid="button-cancel-task"
            >
              Cancel
            </Button>
            <Button type="submit" data-testid="button-save-task">
              {task ? 'Update Task' : 'Save Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
