import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../utils/constants';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

// Mock data for dashboard
const mockStats = {
  totalHabits: 4,
  completedToday: 2,
  currentStreak: 5,
  longestStreak: 12,
};

const mockTodayHabits = [
  { id: '1', name: 'Drink Water', completed: true, color: COLORS.primary },
  { id: '2', name: 'Exercise', completed: false, color: COLORS.secondary },
  { id: '3', name: 'Read', completed: true, color: '#6366F1' },
  { id: '4', name: 'Meditate', completed: false, color: COLORS.warning },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const completionRate = Math.round((mockStats.completedToday / mockStats.totalHabits) * 100);

  const renderQuickAction = (title: string, subtitle: string, onPress: () => void, color: string) => (
    <TouchableOpacity 
      style={[styles.quickAction, { borderLeftColor: color }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const renderTodayHabit = (habit: typeof mockTodayHabits[0]) => (
    <View key={habit.id} style={styles.todayHabitItem}>
      <View style={[styles.habitColorDot, { backgroundColor: habit.color }]} />
      <Text style={[styles.habitName, habit.completed && styles.completedHabit]}>
        {habit.name}
      </Text>
      <View style={[
        styles.habitStatusDot,
        { backgroundColor: habit.completed ? COLORS.success : COLORS.warmGray300 }
      ]} />
    </View>
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "You're crushing it today! 🎉";
    if (completionRate >= 75) return "Almost there — keep going! 💪";
    if (completionRate >= 50) return "You're halfway there! 🌟";
    if (completionRate > 0) return "Great start — let's keep building! 🌱";
    return "Ready to start your day? 🌅";
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()}! 👋</Text>
        <Text style={styles.subtitle}>{getMotivationalMessage()}</Text>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>Today's Journey</Text>
            <Text style={styles.progressSubtitle}>Every step counts</Text>
          </View>
          <View style={styles.progressPercentageContainer}>
            <Text style={styles.progressPercentage}>{completionRate}%</Text>
            <Text style={styles.progressLabel}>complete</Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completionRate}%` }]} />
          </View>
        </View>
        
        <Text style={styles.progressText}>
          {mockStats.completedToday} of {mockStats.totalHabits} habits completed today
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockStats.totalHabits}</Text>
          <Text style={styles.statLabel}>Active Habits</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockStats.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockStats.longestStreak}</Text>
          <Text style={styles.statLabel}>Personal Best</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {renderQuickAction(
            'View All Habits',
            'See your complete collection',
            () => navigation.navigate('Habits'),
            COLORS.primary
          )}
          {renderQuickAction(
            'Add New Habit',
            'Start something meaningful',
            () => navigation.navigate('AddHabit'),
            COLORS.secondary
          )}
        </View>
      </View>

      {/* Today's Habits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Focus</Text>
        <View style={styles.todayHabitsContainer}>
          {mockTodayHabits.length > 0 ? (
            mockTodayHabits.map(renderTodayHabit)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No habits for today</Text>
              <Text style={styles.emptyStateSubtext}>Add your first habit to get started</Text>
            </View>
          )}
        </View>
      </View>

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
  },
  greeting: {
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
  progressCard: {
    backgroundColor: COLORS.white,
    margin: SPACING.xl,
    marginTop: 0,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.warm,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  progressTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    lineHeight: TYPOGRAPHY.fontSizes.xl * TYPOGRAPHY.lineHeights.tight,
  },
  progressSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray500,
    marginTop: SPACING.xs,
  },
  progressPercentageContainer: {
    alignItems: 'flex-end',
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.fontSizes['3xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    lineHeight: TYPOGRAPHY.fontSizes['3xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  progressLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.warmGray200,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
  },
  progressText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes['2xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.fontSizes.xl * TYPOGRAPHY.lineHeights.tight,
  },
  quickActionsContainer: {
    gap: SPACING.md,
  },
  quickAction: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderLeftWidth: 4,
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  quickActionTitle: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.tight,
  },
  quickActionSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  todayHabitsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  todayHabitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.warmGray100,
  },
  habitColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.md,
  },
  habitName: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSizes.base,
    color: COLORS.warmGray900,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.normal,
  },
  completedHabit: {
    textDecorationLine: 'line-through',
    color: COLORS.warmGray500,
  },
  habitStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyStateText: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.warmGray600,
    marginBottom: SPACING.xs,
  },
  emptyStateSubtext: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray500,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: SPACING['4xl'],
  },
});

export default HomeScreen;
