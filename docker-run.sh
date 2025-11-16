#!/bin/bash

# Docker run script for learning.bayufirmansyah.site

echo "🐳 Building Docker image..."
docker build -t learning-bayufirmansyah:latest .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Starting container on port 9999..."
    docker run -d \
        --name learning-bayufirmansyah \
        -p 9999:9999 \
        --restart unless-stopped \
        learning-bayufirmansyah:latest
    
    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo ""
        echo "🌐 Application is running at: http://localhost:9999"
        echo ""
        echo "📋 Useful commands:"
        echo "   - View logs: docker logs -f learning-bayufirmansyah"
        echo "   - Stop: docker stop learning-bayufirmansyah"
        echo "   - Remove: docker rm learning-bayufirmansyah"
        echo "   - Restart: docker restart learning-bayufirmansyah"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Build failed"
    exit 1
fi
