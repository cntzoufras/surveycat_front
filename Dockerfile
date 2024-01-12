FROM node:20
WORKDIR /surveycat
RUN yarn cache clean
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]