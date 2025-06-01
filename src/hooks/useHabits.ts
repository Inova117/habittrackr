import { useState, useEffect, useCallback } from 'react';
import { habitService, Habit, CreateHabitData } from '../services/habitService';

interface UseHabitsReturn {
  habits: Habit[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  fetchHabits: () => Promise<void>;
  createHabit: (habitData: CreateHabitData) => Promise<Habit>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<Habit>;
  deleteHabit: (id: string) => Promise<void>;
  checkInHabit: (id: string) => Promise<Habit>;
  refresh: () => Promise<void>;
}

export const useHabits = (): UseHabitsReturn => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    try {
      setError(null);
      const fetchedHabits = await habitService.getAllHabits();
      setHabits(fetchedHabits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchHabits();
    } finally {
      setRefreshing(false);
    }
  }, [fetchHabits]);

  const createHabit = useCallback(async (habitData: CreateHabitData): Promise<Habit> => {
    try {
      setError(null);
      const newHabit = await habitService.createHabit(habitData);
      
      // Optimistic update
      setHabits(prev => [newHabit, ...prev]);
      
      return newHabit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create habit');
      throw err;
    }
  }, []);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>): Promise<Habit> => {
    try {
      setError(null);
      
      // Optimistic update
      setHabits(prev => prev.map(habit => 
        habit.id === id ? { ...habit, ...updates } : habit
      ));
      
      const updatedHabit = await habitService.updateHabit(id, updates);
      
      // Update with server response
      setHabits(prev => prev.map(habit => 
        habit.id === id ? updatedHabit : habit
      ));
      
      return updatedHabit;
    } catch (err) {
      // Revert optimistic update on error
      await fetchHabits();
      setError(err instanceof Error ? err.message : 'Failed to update habit');
      throw err;
    }
  }, [fetchHabits]);

  const deleteHabit = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      
      // Optimistic update
      const originalHabits = habits;
      setHabits(prev => prev.filter(habit => habit.id !== id));
      
      await habitService.deleteHabit(id);
    } catch (err) {
      // Revert optimistic update on error
      await fetchHabits();
      setError(err instanceof Error ? err.message : 'Failed to delete habit');
      throw err;
    }
  }, [habits, fetchHabits]);

  const checkInHabit = useCallback(async (id: string): Promise<Habit> => {
    try {
      setError(null);
      
      // Optimistic update
      setHabits(prev => prev.map(habit => 
        habit.id === id 
          ? { 
              ...habit, 
              completedToday: true,
              completedCount: Math.min((habit.completedCount || 0) + 1, habit.targetCount || 1),
              streak: habit.streak + 1
            }
          : habit
      ));
      
      const updatedHabit = await habitService.checkInHabit(id);
      
      // Update with server response
      setHabits(prev => prev.map(habit => 
        habit.id === id ? updatedHabit : habit
      ));
      
      return updatedHabit;
    } catch (err) {
      // Revert optimistic update on error
      await fetchHabits();
      setError(err instanceof Error ? err.message : 'Failed to check in habit');
      throw err;
    }
  }, [fetchHabits]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return {
    habits,
    loading,
    error,
    refreshing,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    checkInHabit,
    refresh,
  };
}; 