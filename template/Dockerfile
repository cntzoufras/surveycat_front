FROM node:14
WORKDIR /surveycat
COPY /template .
RUN yarn cache clean
RUN yarn install
EXPOSE 3000
