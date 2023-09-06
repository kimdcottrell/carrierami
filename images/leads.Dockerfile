ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-bookworm AS base

WORKDIR /leads

FROM base as dev 

COPY ./leads/package.json package.json
COPY ./leads/package-lock.json package-lock.json
RUN npm install

# if your script is called something other than `dev`, you can change the name here
CMD npm run dev 

# this is assuming you're running vite as the webserver
EXPOSE 5173

