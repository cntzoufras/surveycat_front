FROM node:16
WORKDIR /surveycat
COPY /template .
RUN yarn cache clean
RUN yarn install
EXPOSE 3000
