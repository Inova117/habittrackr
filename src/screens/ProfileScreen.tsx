import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../utils/constants';

type Props = BottomTabScreenProps<TabParamList, 'Profile'>;

// Mock user data
const mockUser = {
  name: 'Maricruz Leon',
  email: 'maricruzleon@gmail.com',
  joinedDate: 'January 2024',
  totalHabits: 4,
  completedToday: 2,
  longestStreak: 12,
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const handleEditProfile = () => {
    Alert.alert('Coming Soon', 'Profile editing will be available with user authentication');
  };

  const handleNotificationSettings = () => {
    Alert.alert('Notification Settings', 'Customize your reminders and motivation messages');
  };

  const handleDataExport = () => {
    Alert.alert('Export Your Data', 'Download your habit journey as a beautiful PDF report');
  };

  const handleSupport = () => {
    Alert.alert('We\'re Here to Help', 'Reach out to us at hello@habittrackr.app for any questions or feedback');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => Alert.alert('Signed Out', 'You\'ve been successfully signed out. See you soon!')
        }
      ]
    );
  };

  const renderSettingItem = (title: string, subtitle: string, onPress: () => void, color = COLORS.primary) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Text style={[styles.settingArrow, { color }]}>›</Text>
    </TouchableOpacity>
  );

  const renderStatCard = (title: string, value: string | number, color: string) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>Manage your journey and preferences</Text>
      </View>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{mockUser.name.charAt(0)}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userEmail}>{mockUser.email}</Text>
          <Text style={styles.joinDate}>Building habits since {mockUser.joinedDate}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile} activeOpacity={0.8}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Journey So Far</Text>
        <Text style={styles.sectionSubtitle}>A snapshot of your progress</Text>
        <View style={styles.statsGrid}>
          {renderStatCard('Active Habits', mockUser.totalHabits, COLORS.primary)}
          {renderStatCard('Completed Today', mockUser.completedToday, COLORS.success)}
          {renderStatCard('Best Streak', mockUser.longestStreak, COLORS.secondary)}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.sectionSubtitle}>Customize your experience</Text>
        <View style={styles.settingsCard}>
          {renderSettingItem(
            'Notifications',
            'Gentle reminders and encouragement',
            handleNotificationSettings
          )}
          {renderSettingItem(
            'Export Data',
            'Download your beautiful progress report',
            handleDataExport
          )}
          {renderSettingItem(
            'Support & Feedback',
            'We\'d love to hear from you',
            handleSupport
          )}
        </View>
      </View>

      {/* App Info */}
      <View style={styles.appInfoSection}>
        <Text style={styles.sectionTitle}>About HabitTrackr</Text>
        <Text style={styles.sectionSubtitle}>Building meaningful change, together</Text>
        <View style={styles.appInfoCard}>
          <Text style={styles.appName}>HabitTrackr</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            Thoughtfully designed to help you build lasting habits with intention. 
            Every small step counts on your journey to becoming who you want to be.
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
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
  userCard: {
    backgroundColor: COLORS.white,
    margin: SPACING.xl,
    marginTop: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.xl * TYPOGRAPHY.lineHeights.tight,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    color: COLORS.warmGray600,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.normal,
  },
  joinDate: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray500,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.normal,
  },
  editButton: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.warmGray200,
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  statsSection: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
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
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderLeftWidth: 4,
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes['2xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  statTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsSection: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.warmGray100,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.tight,
  },
  settingSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  settingArrow: {
    fontSize: 24,
    fontWeight: '300',
  },
  appInfoSection: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  appInfoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  appName: {
    fontSize: TYPOGRAPHY.fontSizes['2xl'],
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes['2xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  appVersion: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray500,
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.normal,
  },
  appDescription: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    color: COLORS.warmGray600,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.relaxed,
  },
  logoutSection: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  logoutButton: {
    backgroundColor: COLORS.errorSoft,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
  },
  logoutButtonText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
  bottomSpacing: {
    height: SPACING.xl,
  },
});

export default ProfileScreen;
