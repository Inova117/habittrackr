#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 HabitTrackr Testing Setup\n');

const args = process.argv.slice(2);
const method = args[0] || 'expo';

switch (method) {
  case 'expo':
  case 'dev':
    console.log('📱 Starting Expo Go testing...');
    console.log('1. Tester needs Expo Go app installed');
    console.log('2. Share the QR code that appears');
    console.log('3. Tester scans QR code with Expo Go\n');
    
    try {
      execSync('npx expo start --tunnel', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Failed to start Expo server');
    }
    break;

  case 'android':
  case 'apk':
    console.log('🤖 Building Android APK for testing...');
    console.log('This will take 5-10 minutes...\n');
    
    try {
      execSync('npx eas build --platform android --profile preview', { stdio: 'inherit' });
      console.log('\n✅ Build complete! Check EAS dashboard for download link');
    } catch (error) {
      console.error('❌ Build failed. Make sure you have EAS CLI configured');
    }
    break;

  case 'ios':
    console.log('🍎 Building iOS for TestFlight...');
    console.log('Requires Apple Developer account ($99/year)');
    console.log('This will take 10-15 minutes...\n');
    
    try {
      execSync('npx eas build --platform ios --profile preview', { stdio: 'inherit' });
      console.log('\n✅ Build complete! Submit to TestFlight from EAS dashboard');
    } catch (error) {
      console.error('❌ Build failed. Check Apple Developer account setup');
    }
    break;

  case 'both':
  case 'all':
    console.log('📱🤖 Building for both platforms...');
    console.log('This will take 15-20 minutes...\n');
    
    try {
      execSync('npx eas build --platform all --profile preview', { stdio: 'inherit' });
      console.log('\n✅ Both builds complete! Check EAS dashboard');
    } catch (error) {
      console.error('❌ Build failed. Check EAS configuration');
    }
    break;

  default:
    console.log('Usage: npm run share [method]');
    console.log('');
    console.log('Methods:');
    console.log('  expo     - Start Expo Go testing (default)');
    console.log('  android  - Build Android APK');
    console.log('  ios      - Build iOS for TestFlight');
    console.log('  both     - Build for both platforms');
    console.log('');
    console.log('Examples:');
    console.log('  npm run share');
    console.log('  npm run share android');
    console.log('  npm run share ios');
} 