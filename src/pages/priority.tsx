import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTasks } from '@/hooks/use-tasks';
import { PriorityQuadrant } from '@/components/priority-quadrant';
import { TaskModal } from '@/components/task-modal';
import { Task, TaskCategoryType } from '@shared/schema';

const quadrants = [
  {
    title: 'Urgent & Important',
    description: 'Do first - Crisis tasks',
    color: 'bg-red-500',
    category: 'urgent-important' as TaskCategoryType,
  },
  {
    title: 'Not Urgent & Important',
    description: 'Schedule - Growth tasks',
    color: 'bg-blue-500',
    category: 'important' as TaskCategoryType,
  },
  {
    title: 'Urgent & Not Important',
    description: 'Delegate - Interruption tasks',
    color: 'bg-yellow-500',
    category: 'urgent' as TaskCategoryType,
  },
  {
    title: 'Not Urgent & Not Important',
    description: 'Eliminate - Time waster tasks',
    color: 'bg-gray-500',
    category: 'neither' as TaskCategoryType,
  },
];

export default function Priority() {
  const { tasks, updateTask, deleteTask, toggleTaskComplete, getTasksByCategory } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategoryType>('important');

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleOpenModal = (category?: TaskCategoryType) => {
    setSelectedCategory(category || 'important');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Priority Matrix</h2>
        <Button onClick={() => handleOpenModal()} data-testid="button-add-priority-task">
          <Plus className="mr-2 w-4 h-4" />
          Add Task
        </Button>
      </div>

      {/* Eisenhower Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quadrants.map((quadrant) => (
          <PriorityQuadrant
            key={quadrant.category}
            title={quadrant.title}
            description={quadrant.description}
            color={quadrant.color}
            category={quadrant.category}
            tasks={getTasksByCategory(quadrant.category)}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onToggleComplete={toggleTaskComplete}
          />
        ))}
      </div>

      <TaskModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        task={editingTask}
        defaultCategory={selectedCategory}
      />
    </div>
  );
}
