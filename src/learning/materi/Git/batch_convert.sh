#!/bin/bash

# Backup original files first
mkdir -p backup
cp Materi*.jsx backup/ 2>/dev/null

echo "Starting batch conversion to React components..."
echo "Files will be converted one by one..."

