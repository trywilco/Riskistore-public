#!/bin/bash

# Ensure the script is run from the project root
cd "$(dirname "$0")"

# Use curl to create a new admin user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@riskistore.com",
    "password": "AdminPass123!",
  }'
