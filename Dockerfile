# configure builder
FROM node:22-alpine AS builder

RUN mkdir /app && mkdir /app/database && mkdir /app/uploads

COPY . /app

# build dependencies
RUN apk add --no-cache python3 make g++

RUN cd /app && npm install && npm run build

# build actual image
FROM node:22-alpine 

RUN mkdir /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/

# build dependencies
RUN apk add --no-cache python3 make g++

RUN cd /app && \
    npm install --omit=dev && \
    npm cache clean --force

WORKDIR /app

CMD ["node", "build/index.js"]