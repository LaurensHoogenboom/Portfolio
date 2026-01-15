# configure builder
FROM node:24-alpine AS builder

RUN mkdir /app && mkdir /app/database && mkdir /app/uploads

COPY . /app

# build dependencies
RUN apk add --no-cache python3 make g++

# env file
RUN cd /app && npm install && \
    echo "DB_URL=/app/database/sqlite.db" > /app/.env && \
    echo "UPLOADS_FOLDER=/app/uploads/" >> /app/.env && \
    echo "ORIGIN=https://www.laurenshoogenboom.nl/" >> /app/.env && \
    echo "BODY_SIZE_LIMIT=20mb" >> /app/.env && \
    npm run build

# build actual image
FROM node:24-alpine 

RUN mkdir /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/.env /app/.env

# build dependencies
RUN apk add --no-cache python3 make g++

RUN cd /app && \
    npm install --omit=dev && \
    npm cache clean --force

WORKDIR /app

CMD ["node", "build/index.js"]