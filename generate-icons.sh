#!/bin/bash

# Generate PWA icons from SVG
# Requires: ImageMagick (convert command)

ICON_SVG="public/icons/icon.svg"
ICON_DIR="public/icons"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed."
    echo "Install it with: brew install imagemagick"
    echo ""
    echo "Alternatively, you can use an online tool like:"
    echo "- https://realfavicongenerator.net/"
    echo "- https://www.pwabuilder.com/imageGenerator"
    exit 1
fi

# Array of icon sizes
sizes=(72 96 128 144 152 192 384 512)

echo "Generating PWA icons..."

for size in "${sizes[@]}"; do
    output="${ICON_DIR}/icon-${size}x${size}.png"
    convert -background none -resize ${size}x${size} "${ICON_SVG}" "${output}"
    echo "Generated: ${output}"
done

echo ""
echo "All icons generated successfully!"
echo "Don't forget to also create:"
echo "- favicon.ico (16x16, 32x32)"
echo "- apple-touch-icon.png (180x180)"
echo "- og-image.jpg (1200x630 for social sharing)"
