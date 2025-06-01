# 🎯 HabitTrackr

**Build better habits, one day at a time.**

A modern, cross-platform habit tracking app built with React Native and Expo. Track your daily progress, build streaks, and stay motivated with comprehensive analytics and insights.

![HabitTrackr Banner](./assets/banner.png)

## ✨ Features

### 📱 Core Functionality
- **Habit Creation** - Create custom habits with descriptions, colors, and daily targets
- **Daily Tracking** - Quick check-in system with progress visualization
- **Streak Management** - Track current and longest streaks for motivation
- **Progress Analytics** - Comprehensive statistics and performance insights
- **Weekly Charts** - Visual progress tracking with color-coded completion rates

### 🎨 User Experience
- **Modern UI/UX** - Clean, intuitive design with smooth animations
- **Cross-Platform** - Native iOS and Android experience from single codebase
- **Real-time Updates** - Optimistic UI updates for instant feedback
- **Pull-to-Refresh** - Easy data synchronization across all screens
- **Empty States** - Engaging onboarding and guidance for new users

### 📊 Analytics & Insights
- **Today's Overview** - Circular progress ring with completion percentage
- **Habit Performance** - Individual habit success rates and streaks
- **Weekly Progress** - Bar chart visualization of daily completion rates
- **Personalized Insights** - AI-powered recommendations and encouragement
- **Key Metrics** - Total habits, average streaks, and achievement tracking

## 🛠 Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build system
- **TypeScript** - Type-safe development
- **React Navigation** - Native navigation with bottom tabs
- **React Hooks** - Modern state management

### Backend & Data
- **Supabase** - Backend-as-a-Service (ready for integration)
- **Mock Services** - Realistic API simulation for demo
- **Optimistic Updates** - Instant UI feedback with error handling
- **Local State Management** - Custom hooks with React Context

### Development Tools
- **Expo CLI** - Development and build tooling
- **EAS Build** - Cloud-based native builds
- **Metro Bundler** - JavaScript bundling and optimization
- **ESLint** - Code quality and consistency

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/habittrackr.git
cd habittrackr

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS (requires Mac)
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

### Development Workflow

```bash
# Start with cache clearing
npm run start -- --clear

# Run on physical device via Expo Go
# 1. Install Expo Go app on your phone
# 2. Scan QR code from terminal
# 3. Enjoy hot reload development!
```

## 📱 App Store Deployment

### iOS App Store

```bash
# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production
```

### Google Play Store

```bash
# Build for Android
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android --profile production
```

### Pre-deployment Checklist
- [ ] Update version in `app.json`
- [ ] Test on physical devices
- [ ] Verify all features work offline
- [ ] Check app icons and splash screens
- [ ] Review app store metadata
- [ ] Test production builds

## 🏗 Project Structure

```
HabitTrackr/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── HabitCard.tsx   # Interactive habit cards
│   │   ├── ProgressRing.tsx # Circular progress visualization
│   │   ├── StatCard.tsx    # Statistics display
│   │   ├── LoadingSpinner.tsx # Loading animations
│   │   └── EmptyState.tsx  # Empty state handling
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx  # Dashboard overview
│   │   ├── HabitsScreen.tsx # Habit list management
│   │   ├── AddHabitScreen.tsx # Habit creation
│   │   ├── HabitDetailScreen.tsx # Individual habit view
│   │   ├── ProfileScreen.tsx # User settings
│   │   └── StatsScreen.tsx # Analytics dashboard
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx # Bottom tab navigation
│   ├── services/           # Data layer
│   │   ├── supabase.ts     # Backend client
│   │   └── habitService.ts # Habit CRUD operations
│   ├── hooks/              # Custom React hooks
│   │   └── useHabits.ts    # Habit state management
│   └── types/              # TypeScript definitions
├── assets/                 # App icons and images
├── app.json               # Expo configuration
├── eas.json              # Build configuration
└── package.json          # Dependencies
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#3B82F6` - Main brand color
- **Success Green**: `#10B981` - Completed habits
- **Warning Orange**: `#F59E0B` - Partial progress
- **Error Red**: `#EF4444` - Missed habits
- **Purple**: `#8B5CF6` - Accent color
- **Gray Scale**: `#1F2937` to `#F8FAFC` - Text and backgrounds

### Typography
- **Headers**: Bold, 28px - Screen titles
- **Subheaders**: Semi-bold, 18px - Section titles
- **Body**: Regular, 16px - Main content
- **Caption**: Regular, 14px - Secondary text
- **Small**: Regular, 12px - Labels and metadata

### Components
- **Cards**: 16px border radius, subtle shadows
- **Buttons**: 12px border radius, proper touch targets
- **Progress**: Smooth animations, color-coded states
- **Icons**: Emoji-based for universal appeal

## 📊 Performance Optimizations

### Bundle Size
- **Tree Shaking** - Unused code elimination
- **Asset Optimization** - Compressed images and fonts
- **Code Splitting** - Lazy loading for better startup time

### Runtime Performance
- **Optimistic Updates** - Instant UI feedback
- **Memoization** - React.memo and useMemo for expensive operations
- **Native Animations** - 60fps smooth transitions
- **Efficient Re-renders** - Proper dependency arrays and state structure

### Memory Management
- **Cleanup Effects** - Proper useEffect cleanup
- **Image Optimization** - Appropriate sizing and caching
- **State Normalization** - Flat state structure for better performance

## 🧪 Testing Strategy

### Manual Testing
- [ ] All screens load correctly
- [ ] Navigation works smoothly
- [ ] Habit creation and editing
- [ ] Check-in functionality
- [ ] Statistics accuracy
- [ ] Pull-to-refresh works
- [ ] Error states display properly
- [ ] Loading states show correctly

### Device Testing
- [ ] iPhone (various sizes)
- [ ] Android (various manufacturers)
- [ ] Tablet support (iPad)
- [ ] Different screen densities
- [ ] Various OS versions

## 🚀 Deployment Guide

### Environment Setup
1. **Apple Developer Account** ($99/year)
2. **Google Play Developer Account** ($25 one-time)
3. **EAS CLI** installed and configured
4. **App Store Connect** access
5. **Google Play Console** access

### Build Process
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for production
eas build --platform all --profile production

# Submit to stores
eas submit --platform all --profile production
```

### App Store Optimization (ASO)
- **App Name**: HabitTrackr - Daily Habit Tracker
- **Keywords**: habits, productivity, tracking, goals, self-improvement, routine, motivation, streaks
- **Description**: Focus on benefits and unique features
- **Screenshots**: Show key features and beautiful UI
- **App Preview**: 30-second video demonstrating core functionality

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **TypeScript** - All new code must be typed
- **ESLint** - Follow the existing linting rules
- **Prettier** - Code formatting is automated
- **Conventional Commits** - Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** - Amazing development platform
- **React Native Community** - Excellent ecosystem
- **Supabase** - Modern backend infrastructure
- **Design Inspiration** - Apple Human Interface Guidelines

## 📞 Support

- **Email**: support@habittrackr.app
- **Documentation**: [docs.habittrackr.app](https://docs.habittrackr.app)
- **Issues**: [GitHub Issues](https://github.com/your-username/habittrackr/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/habittrackr/discussions)

---

**Built with ❤️ using React Native and Expo**

*HabitTrackr - Transform your life, one habit at a time.*