export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isActive: boolean;
  category?: string;
  reminderTime?: string;
  targetFrequency: 'daily' | 'weekly' | 'custom';
  targetCount?: number;
}

export interface HabitCheckin {
  id: string;
  habitId: string;
  userId: string;
  date: Date;
  completed: boolean;
  notes?: string;
  createdAt: Date;
}

export interface HabitStreak {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  lastCheckinDate?: Date;
}

export interface HabitStats {
  habitId: string;
  totalCheckins: number;
  completionRate: number;
  averageWeeklyCompletion: number;
  monthlyProgress: { month: string; completed: number; total: number }[];
}

export type HabitFormData = Omit<Habit, 'id' | 'createdAt' | 'updatedAt' | 'userId'>; 