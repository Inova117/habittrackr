#!/bin/bash

# HabitTrackr Production Deployment Script
# This script builds and deploys the app to both iOS and Android app stores

set -e  # Exit on any error

echo "🚀 Starting HabitTrackr Production Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    print_error "EAS CLI is not installed. Please install it first:"
    echo "npm install -g eas-cli"
    exit 1
fi

# Check if user is logged in to Expo
print_status "Checking Expo authentication..."
if ! eas whoami &> /dev/null; then
    print_error "You are not logged in to Expo. Please run 'eas login' first."
    exit 1
fi

print_success "Expo authentication verified"

# Verify we're in the correct directory
if [ ! -f "package.json" ] || [ ! -f "app.json" ]; then
    print_error "This script must be run from the project root directory"
    exit 1
fi

# Check if this is a clean git state
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. It's recommended to commit all changes before deployment."
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled"
        exit 1
    fi
fi

# Get current version from app.json
CURRENT_VERSION=$(node -p "require('./app.json').expo.version")
print_status "Current version: $CURRENT_VERSION"

# Ask for version bump
echo "Version bump options:"
echo "1) Patch (1.0.0 -> 1.0.1)"
echo "2) Minor (1.0.0 -> 1.1.0)"
echo "3) Major (1.0.0 -> 2.0.0)"
echo "4) Custom version"
echo "5) Keep current version"

read -p "Select version bump (1-5): " VERSION_CHOICE

case $VERSION_CHOICE in
    1)
        NEW_VERSION=$(node -p "
            const v = require('./app.json').expo.version.split('.');
            v[2] = parseInt(v[2]) + 1;
            v.join('.');
        ")
        ;;
    2)
        NEW_VERSION=$(node -p "
            const v = require('./app.json').expo.version.split('.');
            v[1] = parseInt(v[1]) + 1;
            v[2] = 0;
            v.join('.');
        ")
        ;;
    3)
        NEW_VERSION=$(node -p "
            const v = require('./app.json').expo.version.split('.');
            v[0] = parseInt(v[0]) + 1;
            v[1] = 0;
            v[2] = 0;
            v.join('.');
        ")
        ;;
    4)
        read -p "Enter custom version: " NEW_VERSION
        ;;
    5)
        NEW_VERSION=$CURRENT_VERSION
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

if [ "$NEW_VERSION" != "$CURRENT_VERSION" ]; then
    print_status "Updating version to $NEW_VERSION"
    
    # Update version in app.json
    node -e "
        const fs = require('fs');
        const config = JSON.parse(fs.readFileSync('app.json', 'utf8'));
        config.expo.version = '$NEW_VERSION';
        fs.writeFileSync('app.json', JSON.stringify(config, null, 2));
    "
    
    # Update version in package.json
    npm version $NEW_VERSION --no-git-tag-version
    
    print_success "Version updated to $NEW_VERSION"
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Run tests if they exist
if [ -f "package.json" ] && npm run test --dry-run &> /dev/null; then
    print_status "Running tests..."
    npm test
    print_success "Tests passed"
fi

# Build for production
print_status "Building for production..."

# Ask which platforms to build
echo "Select platforms to build:"
echo "1) iOS only"
echo "2) Android only"
echo "3) Both iOS and Android"

read -p "Select platform (1-3): " PLATFORM_CHOICE

case $PLATFORM_CHOICE in
    1)
        PLATFORMS="ios"
        ;;
    2)
        PLATFORMS="android"
        ;;
    3)
        PLATFORMS="all"
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

# Start the build
print_status "Starting EAS build for $PLATFORMS..."
eas build --platform $PLATFORMS --profile production --non-interactive

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

# Ask about submission
read -p "Do you want to submit to app stores? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Submitting to app stores..."
    
    if [ "$PLATFORMS" = "ios" ] || [ "$PLATFORMS" = "all" ]; then
        print_status "Submitting to iOS App Store..."
        eas submit --platform ios --profile production --non-interactive
    fi
    
    if [ "$PLATFORMS" = "android" ] || [ "$PLATFORMS" = "all" ]; then
        print_status "Submitting to Google Play Store..."
        eas submit --platform android --profile production --non-interactive
    fi
    
    print_success "Submission completed!"
else
    print_status "Skipping app store submission"
fi

# Commit version changes if any
if [ "$NEW_VERSION" != "$CURRENT_VERSION" ]; then
    print_status "Committing version changes..."
    git add app.json package.json package-lock.json
    git commit -m "chore: bump version to $NEW_VERSION"
    git tag "v$NEW_VERSION"
    
    print_success "Version changes committed and tagged"
    print_status "Don't forget to push your changes: git push && git push --tags"
fi

echo ""
print_success "🎉 Deployment process completed!"
echo "=============================================="
echo "Version: $NEW_VERSION"
echo "Platforms: $PLATFORMS"
echo ""
echo "Next steps:"
echo "1. Monitor the build status in Expo dashboard"
echo "2. Test the production build thoroughly"
echo "3. Monitor app store review process"
echo "4. Update release notes and marketing materials"
echo ""
echo "Happy shipping! 🚀" 