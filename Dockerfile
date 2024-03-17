# Use a Node base image
FROM node:20-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install openssl
RUN apk update && apk add openssl

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma/ ./prisma/
RUN npx prisma generate

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Production environment
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 3000

CMD ["node", "dist/main"]
