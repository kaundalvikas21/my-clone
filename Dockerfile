FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb (if exists)
COPY package.json ./
COPY bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN bun run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]