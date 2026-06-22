# Ecampai (ecampusupdateai)

This repository contains the AI services frontend for Ecampus.

## Local Development

To run the Next.js app locally in development mode:

```bash
npm install
npm run dev
```

## Docker Deployment (Production)

This project has been set up with a production-ready multi-stage `Dockerfile` that compiles the Next.js app to a lightweight standalone build.

### Prerequisite

1. Ensure Docker is installed on your server.
2. Create and configure your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in the required keys (`OPENAI_API_KEY`, Twilio keys, etc.).

### Using the Helper Script

We have provided a helper script `run-docker.sh` to automate the build, container teardown, and start commands:

```bash
./run-docker.sh
```

### Manual Commands

If you prefer to run the commands manually, use the following:

1. **Build the image**:
   ```bash
   docker build -t ecampusupdateai .
   ```

2. **Run the container** (running on port **4001**):
   ```bash
   docker run -d \
     --name ecampusupdateai \
     -p 4001:3000 \
     --env-file .env \
     --restart unless-stopped \
     ecampusupdateai
   ```

3. **Verify and logs**:
   ```bash
   docker ps
   docker logs -f ecampusupdateai
   ```
