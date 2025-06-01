import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/AppNavigator';
import { useHabits } from '../hooks/useHabits';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../utils/constants';

type Props = BottomTabScreenProps<TabParamList, 'AddHabit'>;

const colors = [
  COLORS.primary, COLORS.secondary, '#6366F1', COLORS.warning, 
  COLORS.error, COLORS.info, '#059669', '#7C2D12'
];

const AddHabitScreen: React.FC<Props> = ({ navigation }) => {
  const { createHabit } = useHabits();
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [targetCount, setTargetCount] = useState('1');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateHabit = async () => {
    if (!habitName.trim()) {
      Alert.alert('Missing Information', 'Please give your habit a name');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Missing Information', 'Please add a description to help you stay motivated');
      return;
    }

    const target = parseInt(targetCount);
    if (isNaN(target) || target < 1) {
      Alert.alert('Invalid Target', 'Please enter a valid target count (minimum 1)');
      return;
    }

    setIsCreating(true);
    
    try {
      await createHabit({
        name: habitName.trim(),
        description: description.trim(),
        color: selectedColor,
        targetCount: target,
      });

      Alert.alert(
        'Habit Created! 🎉',
        'Your new habit is ready to help you build a better routine.',
        [
          {
            text: 'Start Tracking',
            onPress: () => navigation.navigate('Habits')
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Something went wrong',
        error instanceof Error ? error.message : 'Failed to create habit. Please try again.'
      );
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
    setHabitName('');
    setDescription('');
    setSelectedColor(colors[0]);
    setTargetCount('1');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create New Habit</Text>
        <Text style={styles.subtitle}>
          Building lasting change starts with one small step
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Habit Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What habit would you like to build?</Text>
            <TextInput
              style={[styles.input, habitName.length > 0 && styles.inputFocused]}
              placeholder="e.g., Drink more water, Read daily, Exercise..."
              placeholderTextColor={COLORS.warmGray400}
              value={habitName}
              onChangeText={setHabitName}
              maxLength={50}
            />
            <Text style={styles.helperText}>
              Keep it simple and specific
            </Text>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Why is this important to you?</Text>
            <TextInput
              style={[styles.input, styles.textArea, description.length > 0 && styles.inputFocused]}
              placeholder="Describe what this habit means to you and how it will improve your life..."
              placeholderTextColor={COLORS.warmGray400}
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={200}
            />
            <Text style={styles.helperText}>
              Your personal motivation will keep you going
            </Text>
          </View>

          {/* Daily Target */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>How often each day?</Text>
            <TextInput
              style={[styles.input, styles.numberInput, targetCount.length > 0 && styles.inputFocused]}
              placeholder="1"
              placeholderTextColor={COLORS.warmGray400}
              value={targetCount}
              onChangeText={setTargetCount}
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={styles.helperText}>
              Start small — you can always increase later
            </Text>
          </View>

          {/* Color Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Choose your color</Text>
            <View style={styles.colorGrid}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor
                  ]}
                  onPress={() => setSelectedColor(color)}
                  activeOpacity={0.8}
                />
              ))}
            </View>
            <Text style={styles.helperText}>
              Pick a color that feels right for this habit
            </Text>
          </View>

          {/* Preview */}
          <View style={styles.previewSection}>
            <Text style={styles.label}>Preview</Text>
            <View style={styles.previewCard}>
              <View style={[styles.previewAccent, { backgroundColor: selectedColor }]} />
              <View style={styles.previewContent}>
                <Text style={styles.previewName}>
                  {habitName || 'Your habit name'}
                </Text>
                <Text style={styles.previewDescription}>
                  {description || 'Your motivation will appear here'}
                </Text>
                <View style={styles.previewMeta}>
                  <View style={styles.previewDot} />
                  <Text style={styles.previewTarget}>
                    {targetCount} time{parseInt(targetCount) !== 1 ? 's' : ''} daily
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={resetForm}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.primaryButton,
            isCreating && styles.primaryButtonDisabled
          ]} 
          onPress={handleCreateHabit}
          disabled={isCreating}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {isCreating ? 'Creating...' : 'Create Habit'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: SPACING.sm,
    lineHeight: TYPOGRAPHY.fontSizes['4xl'] * TYPOGRAPHY.lineHeights.tight,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.warmGray600,
    lineHeight: TYPOGRAPHY.fontSizes.lg * TYPOGRAPHY.lineHeights.relaxed,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: SPACING.xl,
    paddingBottom: SPACING['4xl'],
  },
  inputGroup: {
    marginBottom: SPACING['2xl'],
  },
  label: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.md,
    lineHeight: TYPOGRAPHY.fontSizes.lg * TYPOGRAPHY.lineHeights.normal,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.warmGray200,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    fontSize: TYPOGRAPHY.fontSizes.base,
    color: COLORS.warmGray900,
    lineHeight: TYPOGRAPHY.fontSizes.base * TYPOGRAPHY.lineHeights.normal,
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    ...SHADOWS.gentle,
  },
  textArea: {
    height: 100,
    paddingTop: SPACING.lg,
    textAlignVertical: 'top',
  },
  numberInput: {
    width: 80,
    textAlign: 'center',
  },
  helperText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray500,
    marginTop: SPACING.sm,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 3,
    borderColor: 'transparent',
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
  },
  selectedColor: {
    borderColor: COLORS.warmGray900,
    ...SHADOWS.gentle,
    transform: [{ scale: 1.05 }],
  },
  previewSection: {
    marginTop: SPACING.lg,
  },
  previewCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
    borderWidth: 1,
    borderColor: COLORS.warmGray100,
  },
  previewAccent: {
    width: 4,
  },
  previewContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  previewName: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray900,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSizes.lg * TYPOGRAPHY.lineHeights.tight,
  },
  previewDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.warmGray600,
    marginBottom: SPACING.md,
    lineHeight: TYPOGRAPHY.fontSizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
  previewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.warmGray400,
    marginRight: SPACING.sm,
  },
  previewTarget: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.warmGray500,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    padding: SPACING.xl,
    paddingTop: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.warmGray100,
    gap: SPACING.md,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.warmGray100,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
    shadowColor: COLORS.warmGray800,
  },
  secondaryButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.warmGray700,
  },
  primaryButton: {
    flex: 2,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.gentle,
    shadowColor: COLORS.warmGray800,
  },
  primaryButtonDisabled: {
    backgroundColor: COLORS.warmGray300,
    ...SHADOWS.soft,
  },
  primaryButtonText: {
    fontSize: TYPOGRAPHY.fontSizes.base,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.white,
  },
});

export default AddHabitScreen;
