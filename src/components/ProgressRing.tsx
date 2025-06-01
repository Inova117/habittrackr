import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, ANIMATION } from '../utils/constants';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = COLORS.primary,
  backgroundColor = COLORS.warmGray200,
  showPercentage = true,
  children,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: ANIMATION.gentle,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedRotation, {
      toValue: progress,
      duration: ANIMATION.gentle,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Calculate the rotation for the progress indicator
  const rotation = animatedRotation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  // Calculate the stroke dash offset for the progress
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background Circle */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: backgroundColor,
          },
        ]}
      />
      
      {/* Progress Circle */}
      <Animated.View
        style={[
          styles.progressCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: color,
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: [{ rotate: rotation }],
          },
        ]}
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children ? (
          children
        ) : showPercentage ? (
          <View style={styles.percentageContainer}>
            <Text style={[styles.percentage, { color }]}>
              {Math.round(progress)}%
            </Text>
            <Text style={styles.label}>complete</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
  },
  progressCircle: {
    position: 'absolute',
  },
  content: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    alignItems: 'center',
  },
  percentage: {
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    lineHeight: TYPOGRAPHY.fontSizes['2xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});

export default ProgressRing; 