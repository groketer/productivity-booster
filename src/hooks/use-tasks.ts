import { useState, useCallback } from 'react';
import { Task, InsertTask, TaskCategoryType, TaskStatusType } from '@shared/schema';
import { useLocalStorage } from './use-local-storage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('productivity-tasks', []);

  const addTask = useCallback((insertTask: InsertTask) => {
    const newTask: Task = {
      ...insertTask,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      status: "pending" as TaskStatusType,
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleTaskComplete = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const isCompleting = task.status !== "completed";
        return {
          ...task,
          status: isCompleting ? "completed" as TaskStatusType : "pending" as TaskStatusType,
          completedAt: isCompleting ? new Date() : undefined,
        };
      }
      return task;
    }));
  }, [setTasks]);

  const getTasksByCategory = useCallback((category: TaskCategoryType) => {
    return tasks.filter(task => task.category === category);
  }, [tasks]);

  const getTodaysTasks = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks.filter(task => {
      if (!task.dueDate) return true;
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  }, [tasks]);

  const getCompletedTasks = useCallback(() => {
    return tasks.filter(task => task.status === "completed");
  }, [tasks]);

  const getDailyCompletionRate = useCallback(() => {
    const todaysTasks = getTodaysTasks();
    const completedTodaysTasks = todaysTasks.filter(task => task.status === "completed");
    return todaysTasks.length === 0 ? 0 : Math.round((completedTodaysTasks.length / todaysTasks.length) * 100);
  }, [getTodaysTasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    getTasksByCategory,
    getTodaysTasks,
    getCompletedTasks,
    getDailyCompletionRate,
  };
}
