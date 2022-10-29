FROM node:14
WORKDIR /easydev/proxy
COPY /proxy .
RUN yarn cache clean
RUN yarn install
EXPOSE 5000
