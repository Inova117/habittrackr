// App Configuration
export const APP_CONFIG = {
  name: 'HabitTrackr',
  version: '1.0.0',
  supportEmail: 'support@habittrackr.app',
  privacyPolicyUrl: 'https://habittrackr.app/privacy',
  termsOfServiceUrl: 'https://habittrackr.app/terms',
};

// Editorial Color Palette - Human-centered design with sage green primary
export const COLORS = {
  // Primary Sage Green - Calming and natural
  primary: '#7B896F',
  primaryDark: '#6B7A5F',
  primaryLight: '#9BA88F',
  primarySoft: '#E8EBE6',
  
  // Secondary Earth Tones - Warm and approachable
  secondary: '#A67C52',
  secondaryDark: '#8B6A42',
  secondaryLight: '#C19B7A',
  
  // Neutral Palette - Editorial and sophisticated
  white: '#FFFFFF',
  cream: '#FEFDFB',
  warmGray50: '#FAFAF9',
  warmGray100: '#F5F5F4',
  warmGray200: '#E7E5E4',
  warmGray300: '#D6D3D1',
  warmGray400: '#A8A29E',
  warmGray500: '#78716C',
  warmGray600: '#57534E',
  warmGray700: '#44403C',
  warmGray800: '#292524',
  warmGray900: '#1C1917',
  
  // Status Colors - Gentle and human
  success: '#7B896F',
  successSoft: '#E8EBE6',
  warning: '#D97706',
  warningSoft: '#FEF3C7',
  error: '#DC2626',
  errorSoft: '#FEE2E2',
  info: '#0891B2',
  infoSoft: '#E0F7FA',
  
  // Habit Colors - Curated editorial palette
  habitColors: [
    '#7B896F', // Sage Green
    '#A67C52', // Warm Brown
    '#6366F1', // Soft Indigo
    '#D97706', // Warm Orange
    '#DC2626', // Gentle Red
    '#0891B2', // Ocean Blue
    '#059669', // Forest Green
    '#7C2D12', // Deep Terracotta
  ],
};

// Editorial Typography - Clear hierarchy and readability
export const TYPOGRAPHY = {
  fontSizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 19,
    '2xl': 22,
    '3xl': 26,
    '4xl': 30,
    '5xl': 36,
  },
  fontWeights: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

// Generous Spacing - Editorial breathing room
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 96,
};

// Soft Border Radius - Tactile and approachable
export const BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Gentle Shadows - Soft elevation without harshness
export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  gentle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  warm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  editorial: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 4,
  },
};

// Smooth Animation Durations - Tactile feedback
export const ANIMATION = {
  quick: 150,
  smooth: 250,
  gentle: 400,
  slow: 600,
  spring: {
    tension: 300,
    friction: 20,
  },
};

// Touch-friendly Dimensions
export const SCREEN = {
  padding: 24,
  paddingHorizontal: 20,
  headerHeight: 64,
  tabBarHeight: 84,
  minTouchTarget: 44,
};

// Habit Tracking
export const HABIT_CONFIG = {
  maxHabitsPerUser: 50,
  maxStreakDisplay: 999,
  defaultReminderTime: '09:00',
  streakResetHours: 24,
}; 