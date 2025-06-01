import { supabase } from './supabase';

export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  streak: number;
  completedToday: boolean;
  createdAt: string;
  targetCount?: number;
  completedCount?: number;
  userId?: string;
}

export interface CreateHabitData {
  name: string;
  description: string;
  color: string;
  targetCount?: number;
}

// Mock data for demo purposes
const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Drink Water',
    description: '8 glasses per day',
    color: '#3B82F6',
    streak: 5,
    completedToday: false,
    createdAt: '2024-01-01',
    targetCount: 8,
    completedCount: 3,
  },
  {
    id: '2',
    name: 'Exercise',
    description: '30 minutes daily workout',
    color: '#10B981',
    streak: 3,
    completedToday: true,
    createdAt: '2024-01-02',
    targetCount: 1,
    completedCount: 1,
  },
  {
    id: '3',
    name: 'Read Books',
    description: 'Read for 20 minutes',
    color: '#8B5CF6',
    streak: 7,
    completedToday: false,
    createdAt: '2024-01-03',
    targetCount: 1,
    completedCount: 0,
  },
  {
    id: '4',
    name: 'Meditate',
    description: '10 minutes mindfulness',
    color: '#F59E0B',
    streak: 2,
    completedToday: true,
    createdAt: '2024-01-04',
    targetCount: 1,
    completedCount: 1,
  },
];

class HabitService {
  // Simulate API delay for realistic UX
  private delay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAllHabits(): Promise<Habit[]> {
    await this.delay();
    
    // In production, this would be:
    // const { data, error } = await supabase
    //   .from('habits')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    return mockHabits;
  }

  async getHabitById(id: string): Promise<Habit | null> {
    await this.delay();
    
    // In production:
    // const { data, error } = await supabase
    //   .from('habits')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    return mockHabits.find(habit => habit.id === id) || null;
  }

  async createHabit(habitData: CreateHabitData): Promise<Habit> {
    await this.delay();
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      ...habitData,
      streak: 0,
      completedToday: false,
      createdAt: new Date().toISOString(),
      completedCount: 0,
    };

    // In production:
    // const { data, error } = await supabase
    //   .from('habits')
    //   .insert([newHabit])
    //   .select()
    //   .single();
    
    mockHabits.unshift(newHabit);
    return newHabit;
  }

  async updateHabit(id: string, updates: Partial<Habit>): Promise<Habit> {
    await this.delay();
    
    // In production:
    // const { data, error } = await supabase
    //   .from('habits')
    //   .update(updates)
    //   .eq('id', id)
    //   .select()
    //   .single();
    
    const habitIndex = mockHabits.findIndex(habit => habit.id === id);
    if (habitIndex === -1) {
      throw new Error('Habit not found');
    }
    
    mockHabits[habitIndex] = { ...mockHabits[habitIndex], ...updates };
    return mockHabits[habitIndex];
  }

  async deleteHabit(id: string): Promise<void> {
    await this.delay();
    
    // In production:
    // const { error } = await supabase
    //   .from('habits')
    //   .delete()
    //   .eq('id', id);
    
    const habitIndex = mockHabits.findIndex(habit => habit.id === id);
    if (habitIndex !== -1) {
      mockHabits.splice(habitIndex, 1);
    }
  }

  async checkInHabit(id: string): Promise<Habit> {
    await this.delay();
    
    const habit = mockHabits.find(h => h.id === id);
    if (!habit) {
      throw new Error('Habit not found');
    }

    if (habit.completedToday) {
      throw new Error('Habit already completed today');
    }

    const updates = {
      completedToday: true,
      completedCount: Math.min((habit.completedCount || 0) + 1, habit.targetCount || 1),
      streak: habit.streak + 1,
    };

    return this.updateHabit(id, updates);
  }

  async getHabitStats(id: string): Promise<{
    totalDays: number;
    successRate: number;
    longestStreak: number;
    currentStreak: number;
  }> {
    await this.delay();
    
    // Mock stats - in production this would query checkins table
    return {
      totalDays: 23,
      successRate: 85,
      longestStreak: 12,
      currentStreak: 5,
    };
  }
}

export const habitService = new HabitService(); 