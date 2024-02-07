# Stage 1: Build dependencies for both frontend and backend
FROM node:17-alpine AS builder
WORKDIR .

COPY frontend/package.json ./frontend
RUN npm install --prefix frontend

COPY backend/package.json ./backend
RUN npm install --prefix backend

CMD ["npm", "run", "devStart"]