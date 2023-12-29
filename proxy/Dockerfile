FROM node:20
WORKDIR /surveycat/proxy
COPY . .
RUN yarn cache clean
RUN yarn install
EXPOSE 5000
CMD ["yarn", "start"]