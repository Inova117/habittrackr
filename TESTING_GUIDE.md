# HabitTrackr - External Testing Guide

## 🚀 Quick Testing Options

### Option 1: Expo Go (Fastest - 2 minutes)
**Best for: Quick testing, developers, immediate feedback**

1. **Tester downloads Expo Go app:**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **You share the app:**
   ```bash
   npx expo start --tunnel
   ```
   - Share the QR code or URL that appears
   - Tester scans QR code with Expo Go app
   - App loads instantly!

### Option 2: Preview Build (Production-like)
**Best for: Non-developers, realistic testing experience**

#### Android APK (Recommended)
```bash
npx eas build --platform android --profile preview
```
- Creates installable APK file
- No Expo Go required
- Works on any Android device
- Share download link from EAS dashboard

#### iOS TestFlight
```bash
npx eas build --platform ios --profile preview
```
- Requires Apple Developer account ($99/year)
- Distributed via TestFlight
- Up to 10,000 external testers

## 📱 Testing Instructions for Testers

### What to Test:
1. **Navigation**: All 5 tabs work smoothly
2. **Habit Creation**: Add new habits with different colors
3. **Habit Completion**: Check off habits, see streak counters
4. **Statistics**: View progress charts and analytics
5. **Profile**: Check user stats and settings
6. **Performance**: Smooth animations and transitions

### Test Scenarios:
- [ ] Create 3-5 different habits
- [ ] Complete some habits multiple days in a row
- [ ] Check the statistics screen for progress visualization
- [ ] Test the habit detail view and editing
- [ ] Navigate between all screens
- [ ] Test on different screen sizes (if possible)

### Feedback to Collect:
- **UI/UX**: Is the interface intuitive?
- **Performance**: Any lag or crashes?
- **Features**: What's missing or confusing?
- **Bugs**: Any unexpected behavior?
- **Overall**: Would you use this app?

## 🔧 Developer Setup (For Technical Testers)

If the tester is a developer and wants to run locally:

```bash
# Clone and setup
git clone [your-repo-url]
cd HabitTrackr
npm install

# Create .env file
echo "SUPABASE_URL=your_url_here" > .env
echo "SUPABASE_ANON_KEY=your_key_here" >> .env

# Run
npx expo start
```

## 📊 Analytics & Feedback Collection

### Built-in Testing Features:
- All data is mock/simulated (safe for testing)
- No real user accounts needed
- Reset app data by clearing app storage

### Feedback Channels:
- GitHub Issues: [Create issue](link-to-your-repo)
- Email: your-email@domain.com
- Direct message: [Your preferred contact]

## 🚀 Distribution Timeline

| Method | Setup Time | Tester Time | Best For |
|--------|------------|-------------|----------|
| Expo Go | 2 min | 1 min | Quick feedback |
| Android APK | 10 min | 2 min | Real device testing |
| iOS TestFlight | 30 min | 5 min | iOS users |

## 🔒 Security Notes

- This is a demo app with simulated data
- No real personal information is stored
- Safe to test with any device
- All backend calls are mocked

## 📞 Support

If testers encounter issues:
1. Check device compatibility (iOS 11+, Android 6+)
2. Ensure stable internet connection
3. Try restarting the app
4. Contact developer with device info and error details

---

**Ready to test? Choose your preferred method above and start exploring HabitTrackr!** 🎯 