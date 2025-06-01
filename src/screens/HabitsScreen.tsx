import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  RefreshControl,
  Alert 
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { useHabits } from '../hooks/useHabits';
import HabitCard from '../components/HabitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../utils/constants';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Habits'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HabitsScreen: React.FC<Props> = ({ navigation }) => {
  const { 
    habits, 
    loading, 
    error, 
    refreshing, 
    checkInHabit, 
    refresh 
  } = useHabits();

  const handleQuickCheck = async (habitId: string) => {
    try {
      await checkInHabit(habitId);
      Alert.alert('Wonderful! 🎉', 'Another step forward on your journey!');
    } catch (err) {
      Alert.alert('Oops!', err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleHabitPress = (habitId: string) => {
    navigation.navigate('HabitDetail', { habitId });
  };

  const handleAddHabit = () => {
    navigation.navigate('AddHabit');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Habits</Text>
          <Text style={styles.subtitle}>Building a better you, one day at a time</Text>
        </View>
        <LoadingSpinner text="Loading your habits..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Habits</Text>
          <Text style={styles.subtitle}>Building a better you, one day at a time</Text>
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

  if (habits.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Habits</Text>
          <Text style={styles.subtitle}>Building a better you, one day at a time</Text>
        </View>
        <EmptyState
          icon="🌱"
          title="Ready to grow?"
          description="Every meaningful change starts with a single habit. What would you like to build today?"
          actionText="Create Your First Habit"
          onActionPress={handleAddHabit}
        />
      </View>
    );
  }

  const completedToday = habits.filter(habit => habit.completedToday).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);

  const getProgressMessage = () => {
    if (completionRate === 100) return "Perfect day! You're unstoppable! 🎉";
    if (completionRate >= 75) return "Almost there — you've got this! 💪";
    if (completionRate >= 50) return "Great momentum — keep it up! 🌟";
    if (completionRate > 0) return "Nice start — every step counts! 🌱";
    return "Ready to begin your day? 🌅";
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Habits</Text>
        <Text style={styles.subtitle}>Building a better you, one day at a time</Text>
        
        {/* Progress Summary */}
        <View style={styles.progressSummary}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressMessage}>{getProgressMessage()}</Text>
            <Text style={styles.progressPercentage}>{completionRate}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill, 
                { width: `${completionRate}%` }
              ]} />
            </View>
          </View>
          <Text style={styles.progressText}>
            {completedToday} of {totalHabits} habits completed today
          </Text>
        </View>
      </View>

      {/* Habits List */}
      <ScrollView 
        style={styles.scrollView}
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
        <View style={styles.habitsContainer}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onPress={() => handleHabitPress(habit.id)}
              onQuickCheck={() => handleQuickCheck(habit.id)}
            />
          ))}
        </View>
        
        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
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
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.fontSizes.lg * TYPOGRAPHY.lineHeights.relaxed,
  },
  progressSummary: {
    backgroundColor: COLORS.primarySoft,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  progressMessage: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    color: COLORS.warmGray700,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    flex: 1,
    marginRight: SPACING.md,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.normal,
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    lineHeight: TYPOGRAPHY.fontSizes['2xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  progressBarContainer: {
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.warmGray200,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.normal,
  },
  scrollView: {
    flex: 1,
  },
  habitsContainer: {
    padding: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  bottomSpacing: {
    height: SPACING.xl,
  },
});

export default HabitsScreen;
