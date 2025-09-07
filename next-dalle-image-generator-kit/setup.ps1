Write-Host "Setting up DALL-E Image Generator..." -ForegroundColor Green

npm install
Copy-Item ".env.example" ".env.local" -Force
npm run db:generate

Write-Host "Setup complete! Edit .env.local with your API keys, then run dev.ps1" -ForegroundColor Green