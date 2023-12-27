# Installation

To get started follow below steps:

1. Install [Node](https://nodejs.org/en/) & [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install).
2. Clone and open project.
3. Follow development or prod build instructions

## For developers

You can also use docker

Project has 2 images, 1 serves as proxy for axios requests to backend API.

## Available Scripts

In the project directory, after having cloned the project, you can navigate to the /template folder and run:

1. `yarn install`
2. `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

*To use finance dahboard, test CoinMarketCap API in env files by providing key*

## Deployment

For prod:

From the /template folder run:

- ```yarn docker-build:prod```
- ```yarn docker:prod```

This section has moved here: <https://facebook.github.io/create-react-app/docs/deployment>

 `yarn build` fails to minify

This section has moved here: <https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify>

## About Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

