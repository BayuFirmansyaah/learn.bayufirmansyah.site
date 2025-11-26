#!/bin/bash

echo "🚀 Starting Ubay Tech PWA Preview..."
echo ""
echo "Building application..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "🌐 Starting preview server..."
echo "📱 Open your browser at: http://localhost:4173"
echo ""
echo "🔍 To test PWA features:"
echo "  1. Open DevTools (F12)"
echo "  2. Go to Application tab"
echo "  3. Check Service Workers, Manifest, and Storage"
echo ""
echo "📲 To install as app:"
echo "  - Desktop: Look for install button in address bar"
echo "  - Mobile: Look for 'Add to Home Screen' banner"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run preview
