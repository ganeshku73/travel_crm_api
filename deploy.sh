#!/bin/bash

# Stop any running instance of the app (if necessary)
echo "Stopping any running app..."
pm2 stop travel-crm-api-test || true

# Navigate to the application directory
cd /var/www/html/testapi || exit

# Pull the latest changes (if using git)
echo "Pulling the latest code..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the app (if necessary)
echo "Building the app..."
npm run build

# Restart the app using pm2 (assuming you are using pm2 to manage your app)
#echo "Starting the app..."
#pm2 start travel-crm-api --name travel-crm-api-test

# Optionally, restart Nginx or other services if you are using them
# sudo systemctl restart nginx

echo "Deployment complete!"
