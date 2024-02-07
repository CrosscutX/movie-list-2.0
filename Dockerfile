# Stage 1: Build dependencies for both frontend and backend
FROM node:17-alpine AS builder
WORKDIR /app

# Install frontend dependencies
COPY frontend/package.json ./frontend
RUN npm ci --prefix frontend

# Install backend dependencies
COPY backend/package.json ./backend
RUN npm ci --prefix backend

# Stage 2: Copy final application files
FROM node:17-alpine
WORKDIR /app

# Copy built frontend and backend assets
COPY --from=builder /app/frontend dist/frontend .
COPY --from=builder /app/backend dist/backend .

CMD ["npm", "start"]