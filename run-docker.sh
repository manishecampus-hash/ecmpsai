#!/bin/bash

# Exit on error
set -e

IMAGE_NAME="ecampusupdateai"
CONTAINER_NAME="ecampusupdateai"
PORT_MAPPING="4001:3000"

echo "=================================================="
echo "Building Docker image: ${IMAGE_NAME}..."
echo "=================================================="
docker build -t ${IMAGE_NAME} .

# Check if container already exists and stop/remove it
if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "Stopping and removing existing container: ${CONTAINER_NAME}..."
    docker stop ${CONTAINER_NAME} || true
    docker rm ${CONTAINER_NAME} || true
fi

# Ensure .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please copy .env.example to .env and configure it before running."
    echo "Example: cp .env.example .env"
    exit 1
fi

echo "=================================================="
echo "Running container: ${CONTAINER_NAME}..."
echo "Host Port: 4001, Container Port: 3000"
echo "=================================================="

docker run -d \
  --name ${CONTAINER_NAME} \
  -p ${PORT_MAPPING} \
  --env-file .env \
  --restart unless-stopped \
  ${IMAGE_NAME}

echo "=================================================="
echo "Container started successfully!"
echo "You can access the application at http://localhost:4001"
echo "=================================================="
