import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  RefreshControl,
  Dimensions 
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/AppNavigator';
import { useHabits } from '../hooks/useHabits';
import StatCard from '../components/StatCard';
import ProgressRing from '../components/ProgressRing';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../utils/constants';

const { width } = Dimensions.get('window');

type Props = BottomTabScreenProps<TabParamList, 'Stats'>;

const StatsScreen: React.FC<Props> = ({ navigation }) => {
  const { habits, loading, error, refreshing, refresh } = useHabits();
  const [weeklyData, setWeeklyData] = useState<number[]>([]);

  // Calculate statistics
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedToday).length;
  const todayCompletionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const averageStreak = totalHabits > 0 ? Math.round(totalStreak / totalHabits) : 0;
  const longestStreak = Math.max(...habits.map(h => h.streak), 0);

  // Mock weekly completion data (in real app, this would come from API)
  useEffect(() => {
    const generateWeeklyData = () => {
      const data = [];
      for (let i = 6; i >= 0; i--) {
        const completionRate = Math.floor(Math.random() * 40) + 60; // 60-100%
        data.push(completionRate);
      }
      setWeeklyData(data);
    };
    generateWeeklyData();
  }, [habits]);

  const renderWeeklyChart = () => {
    const maxHeight = 120;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Weekly Journey</Text>
        <Text style={styles.sectionSubtitle}>Your consistency over the past week</Text>
        <View style={styles.chart}>
          <View style={styles.chartBars}>
            {weeklyData.map((value, index) => (
              <View key={index} style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: (value / 100) * maxHeight,
                      backgroundColor: value >= 80 ? COLORS.success : value >= 60 ? COLORS.warning : COLORS.error
                    }
                  ]} 
                />
                <Text style={styles.barLabel}>{days[index]}</Text>
                <Text style={styles.barValue}>{value}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderHabitPerformance = () => {
    const sortedHabits = [...habits].sort((a, b) => b.streak - a.streak);
    
    return (
      <View style={styles.performanceContainer}>
        <Text style={styles.sectionTitle}>Habit Performance</Text>
        <Text style={styles.sectionSubtitle}>How each habit is progressing</Text>
        {sortedHabits.slice(0, 5).map((habit, index) => {
          const completionRate = habit.targetCount 
            ? Math.round(((habit.completedCount || 0) / habit.targetCount) * 100)
            : habit.completedToday ? 100 : 0;
            
          return (
            <View key={habit.id} style={styles.habitPerformanceItem}>
              <View style={styles.habitInfo}>
                <View style={[styles.habitColorDot, { backgroundColor: habit.color }]} />
                <View style={styles.habitDetails}>
                  <Text style={styles.habitName}>{habit.name}</Text>
                  <Text style={styles.habitStreak}>{habit.streak} day streak</Text>
                </View>
              </View>
              <View style={styles.performanceMetrics}>
                <Text style={styles.completionRate}>{completionRate}%</Text>
                <View style={styles.performanceBar}>
                  <View 
                    style={[
                      styles.performanceFill, 
                      { 
                        width: `${completionRate}%`,
                        backgroundColor: habit.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderInsights = () => {
    const insights = [];
    
    if (todayCompletionRate === 100) {
      insights.push({
        icon: '🎉',
        title: 'Perfect Day!',
        description: 'You completed all your habits today. This is what consistency looks like!'
      });
    } else if (todayCompletionRate >= 80) {
      insights.push({
        icon: '🔥',
        title: 'Incredible Progress!',
        description: 'You\'re building amazing momentum with your habits.'
      });
    } else if (todayCompletionRate >= 50) {
      insights.push({
        icon: '💪',
        title: 'Keep Building!',
        description: 'You\'re halfway there. Every habit completed is a victory.'
      });
    } else {
      insights.push({
        icon: '🌱',
        title: 'Fresh Opportunity',
        description: 'Every day is a chance to grow. What will you accomplish today?'
      });
    }

    if (longestStreak >= 7) {
      insights.push({
        icon: '🏆',
        title: 'Streak Champion',
        description: `Your longest streak is ${longestStreak} days. You\'re proving that consistency creates change!`
      });
    }

    if (totalHabits >= 5) {
      insights.push({
        icon: '📈',
        title: 'Habit Architect',
        description: `You\'re building ${totalHabits} habits. Remember, quality over quantity leads to lasting change.`
      });
    }

    return (
      <View style={styles.insightsContainer}>
        <Text style={styles.sectionTitle}>Personal Insights</Text>
        <Text style={styles.sectionSubtitle}>What your data tells us about your journey</Text>
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightCard}>
            <Text style={styles.insightIcon}>{insight.icon}</Text>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDescription}>{insight.description}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Insights into your habit journey</Text>
        </View>
        <LoadingSpinner text="Analyzing your progress..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Insights into your habit journey</Text>
        </View>
        <EmptyState
          icon="⚠️"
          title="Something went wrong"
          description={error}
          actionText="Try Again"
          onActionPress={refresh}
        />
      </View>
    );
  }

  if (totalHabits === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Insights into your habit journey</Text>
        </View>
        <EmptyState
          icon="📊"
          title="No data yet"
          description="Start building habits to see beautiful insights and progress analytics about your journey."
          actionText="Create Your First Habit"
          onActionPress={() => navigation.navigate('AddHabit')}
        />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={COLORS.primary}
          colors={[COLORS.primary]}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Insights into your habit journey</Text>
      </View>

      {/* Today's Overview */}
      <View style={styles.overviewContainer}>
        <Text style={styles.sectionTitle}>Today's Snapshot</Text>
        <Text style={styles.sectionSubtitle}>How you're doing right now</Text>
        <View style={styles.overviewCard}>
          <View style={styles.progressRingContainer}>
            <ProgressRing
              progress={todayCompletionRate}
              size={120}
              strokeWidth={12}
              color={COLORS.primary}
            />
            <View style={styles.progressRingCenter}>
              <Text style={styles.progressPercentage}>{todayCompletionRate}%</Text>
              <Text style={styles.progressLabel}>complete</Text>
            </View>
          </View>
          <View style={styles.overviewStats}>
            <Text style={styles.overviewText}>
              {completedToday} of {totalHabits} habits completed
            </Text>
            <Text style={styles.overviewSubtext}>
              {totalHabits - completedToday} remaining for today
            </Text>
          </View>
        </View>
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <Text style={styles.sectionSubtitle}>Your habit-building numbers</Text>
        <View style={styles.metricsGrid}>
          <StatCard
            title="Total Habits"
            value={totalHabits}
            color={COLORS.primary}
          />
          <StatCard
            title="Average Streak"
            value={averageStreak}
            color={COLORS.success}
            subtitle="days"
          />
          <StatCard
            title="Longest Streak"
            value={longestStreak}
            color={COLORS.secondary}
            subtitle="days"
          />
        </View>
      </View>

      {/* Weekly Chart */}
      {renderWeeklyChart()}

      {/* Habit Performance */}
      {renderHabitPerformance()}

      {/* Insights */}
      {renderInsights()}

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    padding: SPACING.xl,
    paddingTop: SPACING['4xl'],
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.warmGray100,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes['4xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes['4xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.lg * TYPOGRAPHY.lineHeights.relaxed,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.xl * TYPOGRAPHY.lineHeights.tight,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray500,
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  overviewContainer: {
    padding: SPACING.xl,
  },
  overviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  progressRingContainer: {
    position: 'relative',
    marginBottom: SPACING.lg,
  },
  progressRingCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.warmGray900,
    lineHeight: TYPOGRAPHY.fontSizes['2xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  progressLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  overviewStats: {
    alignItems: 'center',
  },
  overviewText: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.normal,
  },
  overviewSubtext: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.normal,
  },
  metricsContainer: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  metricsGrid: {
    flexDirection: 'row',
  },
  chartContainer: {
    backgroundColor: COLORS.white,
    margin: SPACING.xl,
    marginTop: 0,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  chart: {
    height: 160,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: SPACING.lg,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  barLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray600,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  barValue: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  performanceContainer: {
    backgroundColor: COLORS.white,
    margin: SPACING.xl,
    marginTop: 0,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  habitPerformanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  habitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  habitColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.md,
  },
  habitDetails: {
    flex: 1,
  },
  habitName: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.tight,
  },
  habitStreak: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.normal,
  },
  performanceMetrics: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  completionRate: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.tight,
  },
  performanceBar: {
    width: 50,
    height: 4,
    backgroundColor: COLORS.warmGray200,
    borderRadius: BORDER_RADIUS.sm,
  },
  performanceFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  insightsContainer: {
    backgroundColor: COLORS.white,
    margin: SPACING.xl,
    marginTop: 0,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.primarySoft,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  insightIcon: {
    fontSize: 32,
    marginRight: SPACING.lg,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.tight,
  },
  insightDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  bottomSpacing: {
    height: SPACING.xl,
  },
});

export default StatsScreen; 