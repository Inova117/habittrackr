import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY, ANIMATION } from '../utils/constants';

interface HabitCardProps {
  habit: {
    id: string;
    name: string;
    description: string;
    color: string;
    streak: number;
    completedToday: boolean;
  };
  onPress: (habitId: string) => void;
  onQuickCheck?: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onPress, onQuickCheck }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        tension: ANIMATION.spring.tension,
        friction: ANIMATION.spring.friction,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: ANIMATION.quick,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: ANIMATION.spring.tension,
        friction: ANIMATION.spring.friction,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: ANIMATION.smooth,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleQuickCheck = (e: any) => {
    e.stopPropagation();
    if (onQuickCheck) {
      onQuickCheck(habit.id);
    }
  };

  return (
    <Animated.View style={[
      styles.container, 
      { 
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }
    ]}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(habit.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Subtle accent line */}
        <View style={[styles.accentLine, { backgroundColor: habit.color }]} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.habitInfo}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.habitDescription}>{habit.description}</Text>
            </View>
            <View style={styles.streakContainer}>
              <Text style={styles.streakNumber}>{habit.streak}</Text>
              <Text style={styles.streakLabel}>
                {habit.streak === 1 ? 'day' : 'days'}
              </Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <View style={[
              styles.statusContainer,
              habit.completedToday ? styles.completedStatus : styles.pendingStatus
            ]}>
              <View style={[
                styles.statusDot,
                { backgroundColor: habit.completedToday ? COLORS.success : COLORS.warmGray400 }
              ]} />
              <Text style={[
                styles.statusText,
                { color: habit.completedToday ? COLORS.success : COLORS.warmGray600 }
              ]}>
                {habit.completedToday ? 'Completed today' : 'Ready to complete'}
              </Text>
            </View>
            
            {!habit.completedToday && onQuickCheck && (
              <TouchableOpacity 
                style={[styles.quickCheckButton, { backgroundColor: habit.color }]}
                onPress={handleQuickCheck}
                activeOpacity={0.8}
              >
                <Text style={styles.quickCheckText}>✓</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
  },
  accentLine: {
    height: 3,
    width: '100%',
  },
  content: {
    padding: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  habitInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  habitName: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.xl * TYPOGRAPHY.lineHeights.tight,
  },
  habitDescription: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.relaxed,
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.warmGray50,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    minWidth: 64,
  },
  streakNumber: {
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    lineHeight: TYPOGRAPHY.fontSizes['2xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  streakLabel: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: SPACING.sm,
  },
  completedStatus: {
    // Additional styling for completed state if needed
  },
  pendingStatus: {
    // Additional styling for pending state if needed
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  quickCheckButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
  },
  quickCheckText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
});

export default HabitCard; 