FROM node:16
WORKDIR /surveycat/proxy
COPY /proxy .
RUN yarn cache clean
RUN yarn install
EXPOSE 5000
