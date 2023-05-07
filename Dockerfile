# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

COPY init-employeedb.sql /docker-entrypoint-initdb.d/init-employeedb.sql
RUN sed -i 's/\r$//g' /docker-entrypoint-initdb.d/init-employeedb.sql


# Expose port 3000
EXPOSE 3000

# Start the app
CMD [ "node", "index.js" ]
