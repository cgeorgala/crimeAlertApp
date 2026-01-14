# Use an existing docker image as a base
FROM node:20

# Set environment varibles

# Change working directory
WORKDIR /server

# Copy main server files
COPY ./ ./

# Execute commands inside the container
RUN npm install

# Expose backend port
EXPOSE 8000

# Tell what to do when it starts as a container
CMD ["npm", "start"]