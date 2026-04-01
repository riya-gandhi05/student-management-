# Use Node image
FROM node:18

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 4000

# Start app
CMD ["node", "server.js"]