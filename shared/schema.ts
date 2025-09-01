import { z } from "zod";

export const TaskPriority = z.enum(["low", "medium", "high", "urgent"]);
export const TaskCategory = z.enum(["urgent-important", "important", "urgent", "neither"]);
export const TaskStatus = z.enum(["pending", "in-progress", "completed"]);

export type TaskPriorityType = z.infer<typeof TaskPriority>;
export type TaskCategoryType = z.infer<typeof TaskCategory>;
export type TaskStatusType = z.infer<typeof TaskStatus>;

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  priority: TaskPriority,
  category: TaskCategory,
  status: TaskStatus.default("pending"),
  dueDate: z.date().optional(),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  estimatedMinutes: z.number().min(1).optional(),
});

export const insertTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  completedAt: true,
  status: true,
});

export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export const pomodoroSessionSchema = z.object({
  id: z.string(),
  type: z.enum(["focus", "short-break", "long-break"]),
  duration: z.number(),
  completedAt: z.date(),
  taskId: z.string().optional(),
});

export type PomodoroSession = z.infer<typeof pomodoroSessionSchema>;

export const userStatsSchema = z.object({
  currentStreak: z.number().default(0),
  longestStreak: z.number().default(0),
  totalTasksCompleted: z.number().default(0),
  totalFocusMinutes: z.number().default(0),
  lastActiveDate: z.string().optional(),
});

export type UserStats = z.infer<typeof userStatsSchema>;

export const userSettingsSchema = z.object({
  focusMinutes: z.number().min(1).max(60).default(25),
  shortBreakMinutes: z.number().min(1).max(30).default(5),
  longBreakMinutes: z.number().min(5).max(60).default(15),
  theme: z.enum(["light", "dark"]).default("light"),
  soundEnabled: z.boolean().default(true),
});

export type UserSettings = z.infer<typeof userSettingsSchema>;
