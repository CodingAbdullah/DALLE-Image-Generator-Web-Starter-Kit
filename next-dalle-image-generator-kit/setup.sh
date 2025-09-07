#!/bin/bash
echo "Setting up DALL-E Image Generator..."

npm install
cp .env.example .env.local
npm run db:generate

echo "Setup complete! Edit .env.local with your API keys, then run ./dev.sh"