#!/bin/bash
set -e
echo "--- Installing dependencies ---"
npm install --legacy-peer-deps
echo "--- Building Next.js application ---"
npm run build
echo "--- Build complete ---"
