import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';

/**
 * Performance optimization utilities for HabitTrackr
 */

// Debounce hook for expensive operations
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memoized selector for complex state calculations
export const useMemoizedSelector = <T, R>(
  data: T,
  selector: (data: T) => R,
  deps: React.DependencyList = []
): R => {
  return useMemo(() => selector(data), [data, ...deps]);
};

// Memory cleanup utility
export const useCleanup = (cleanup: () => void) => {
  useEffect(() => {
    return cleanup;
  }, [cleanup]);
};

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(label: string): void {
    this.metrics.set(label, Date.now());
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      console.warn(`Timer "${label}" was not started`);
      return 0;
    }

    const duration = Date.now() - startTime;
    this.metrics.delete(label);
    
    if (__DEV__) {
      console.log(`⏱️ ${label}: ${duration}ms`);
    }
    
    return duration;
  }

  measureAsync<T>(label: string, asyncFn: () => Promise<T>): Promise<T> {
    this.startTimer(label);
    return asyncFn().finally(() => {
      this.endTimer(label);
    });
  }
}

// Memory usage tracker (development only)
export const useMemoryTracker = (componentName: string) => {
  useEffect(() => {
    if (__DEV__ && (performance as any).memory) {
      const memory = (performance as any).memory;
      console.log(`🧠 ${componentName} Memory:`, {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
      });
    }
  }, [componentName]);
};

export default {
  useDebounce,
  useMemoizedSelector,
  useCleanup,
  PerformanceMonitor,
  useMemoryTracker,
}; 