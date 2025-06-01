import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../utils/constants';

import HomeScreen from '../screens/HomeScreen';
import HabitsScreen from '../screens/HabitsScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import HabitDetailScreen from '../screens/HabitDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatsScreen from '../screens/StatsScreen';

export type RootStackParamList = {
  Main: undefined;
  HabitDetail: { habitId: string };
};

export type TabParamList = {
  Home: undefined;
  Habits: undefined;
  AddHabit: undefined;
  Profile: undefined;
  Stats: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.warmGray400,
        tabBarLabelStyle: {
          fontSize: TYPOGRAPHY.fontSizes.xs,
          fontWeight: TYPOGRAPHY.fontWeights.medium,
          marginTop: SPACING.xs,
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.warmGray100,
          paddingBottom: insets.bottom + SPACING.sm,
          paddingTop: SPACING.md,
          paddingHorizontal: SPACING.sm,
          height: 68 + insets.bottom,
          ...Platform.select({
            android: {
              elevation: 12,
              shadowColor: COLORS.warmGray800,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
            },
            ios: {
              shadowColor: COLORS.warmGray800,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
            },
          }),
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ color, fontSize: 22 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Habits" 
        component={HabitsScreen}
        options={{
          tabBarLabel: 'Habits',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ color, fontSize: 22 }}>✨</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="AddHabit" 
        component={AddHabitScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ color, fontSize: 22 }}>🌱</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ color, fontSize: 22 }}>📈</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'You',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ color, fontSize: 22 }}>🌿</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen 
          name="HabitDetail" 
          component={HabitDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Habit Details',
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerTitleStyle: {
              fontSize: TYPOGRAPHY.fontSizes.xl,
              fontWeight: TYPOGRAPHY.fontWeights.semibold,
              color: COLORS.warmGray900,
            },
            headerTintColor: COLORS.primary,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
