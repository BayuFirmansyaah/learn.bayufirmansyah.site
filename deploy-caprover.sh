#!/bin/bash

# CapRover Deploy Script
# Usage: ./deploy-caprover.sh [app-name] [caprover-url]

APP_NAME=${1:-learning-bayufirmansyah}
CAPROVER_URL=${2:-"https://captain.yourdomain.com"}

echo "🚀 Deploying to CapRover..."
echo "App Name: $APP_NAME"
echo "CapRover URL: $CAPROVER_URL"
echo ""

# Check if caprover CLI is installed
if ! command -v caprover &> /dev/null; then
    echo "❌ CapRover CLI not found. Installing..."
    npm install -g caprover
fi

# Login to CapRover (if not already logged in)
echo "🔐 Logging in to CapRover..."
caprover login

# Deploy the app
echo "📦 Deploying application..."
caprover deploy -a $APP_NAME

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "🌐 Your app should be available at: https://$APP_NAME.$CAPROVER_URL"
else
    echo ""
    echo "❌ Deployment failed!"
    exit 1
fi
