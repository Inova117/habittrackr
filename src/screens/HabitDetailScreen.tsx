import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Dimensions 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitDetail'>;

const { width } = Dimensions.get('window');

// Mock habit data - in real app this would come from navigation params or API
const mockHabit = {
  id: '1',
  name: 'Drink Water',
  description: '8 glasses per day to stay hydrated',
  color: '#3B82F6',
  streak: 5,
  completedToday: false,
  createdAt: '2024-01-01',
  targetCount: 8,
  completedCount: 3,
};

// Mock weekly progress data
const mockWeeklyProgress = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: false },
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: false },
  { day: 'Sun', completed: false },
];

const HabitDetailScreen: React.FC<Props> = ({ navigation }) => {
  const [completedToday, setCompletedToday] = useState(mockHabit.completedToday);
  const [completedCount, setCompletedCount] = useState(mockHabit.completedCount);

  const handleCheckIn = () => {
    if (completedToday) {
      Alert.alert('Already Completed', 'You have already completed this habit today!');
      return;
    }

    setCompletedToday(true);
    setCompletedCount(prev => Math.min(prev + 1, mockHabit.targetCount));
    
    Alert.alert(
      'Great Job! 🎉',
      'Habit completed for today. Keep up the great work!',
      [{ text: 'OK' }]
    );
  };

  const handleEditHabit = () => {
    Alert.alert('Edit Habit', 'Edit functionality will be implemented with backend integration');
  };

  const handleDeleteHabit = () => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted', 'Habit has been deleted', [
              { text: 'OK', onPress: () => navigation.navigate('Habits') }
            ]);
          }
        }
      ]
    );
  };

  const progressPercentage = (completedCount / mockHabit.targetCount) * 100;

  const renderWeeklyProgress = () => (
    <View style={styles.weeklyContainer}>
      <Text style={styles.sectionTitle}>This Week</Text>
      <View style={styles.weeklyGrid}>
        {mockWeeklyProgress.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayLabel}>{day.day}</Text>
            <View style={[
              styles.dayCircle,
              { backgroundColor: day.completed ? mockHabit.color : '#E5E7EB' }
            ]}>
              {day.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{mockHabit.streak}</Text>
        <Text style={styles.statLabel}>Day Streak</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>85%</Text>
        <Text style={styles.statLabel}>Success Rate</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>23</Text>
        <Text style={styles.statLabel}>Total Days</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.habitInfo}>
          <View style={[styles.colorIndicator, { backgroundColor: mockHabit.color }]} />
          <View style={styles.habitText}>
            <Text style={styles.habitName}>{mockHabit.name}</Text>
            <Text style={styles.habitDescription}>{mockHabit.description}</Text>
          </View>
        </View>
      </View>

      {/* Today's Progress */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <Text style={[styles.progressStatus, { color: completedToday ? '#10B981' : '#6B7280' }]}>
            {completedToday ? 'Completed ✓' : 'Pending'}
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill, 
              { 
                width: `${progressPercentage}%`,
                backgroundColor: mockHabit.color 
              }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {completedCount} of {mockHabit.targetCount} completed
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.checkInButton,
            { 
              backgroundColor: completedToday ? '#10B981' : mockHabit.color,
              opacity: completedToday ? 0.7 : 1
            }
          ]}
          onPress={handleCheckIn}
          disabled={completedToday}
        >
          <Text style={styles.checkInButtonText}>
            {completedToday ? 'Completed Today ✓' : 'Mark as Complete'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Weekly Progress */}
      {renderWeeklyProgress()}

      {/* Statistics */}
      {renderStats()}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditHabit}>
          <Text style={styles.editButtonText}>Edit Habit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteHabit}>
          <Text style={styles.deleteButtonText}>Delete Habit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  habitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 6,
    height: 60,
    borderRadius: 3,
    marginRight: 16,
  },
  habitText: {
    flex: 1,
  },
  habitName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  habitDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  checkInButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  checkInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  weeklyContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});

export default HabitDetailScreen;
