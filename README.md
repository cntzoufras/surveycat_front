# Installation

To get started follow below steps:

1. Install [Node](https://nodejs.org/en/) & [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install).
2. Clone and open project.
3. Follow development or prod build instructions

## For developers

You can also use Docker to open the app.

## Available Scripts

In the project directory, after having cloned the project, you can navigate to the project root folder and run:

1. `yarn install`
2. `yarn start`

Runs the app in the development mode.
Opens [http://localhost:3000](http://localhost:3000) to view in the browser.
Optionally, setup local hostname in your /etc/hosts file to `surveycat.test` so you can access it at `http://surveycat.test:3000`

The page will hot-reload if you make edits.
You will also see any lint errors in the console.

## Deployment

* For prod:

From the project root folder run:

- ```yarn docker-build:prod```
- ```yarn docker:prod```

This section has moved here: <https://facebook.github.io/create-react-app/docs/deployment>

 * `yarn build` fails to minify

This section has moved here: <https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify>

* In `nginx.prod.conf` update `server_name`  to your domain.

## About Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## License

The Surveycat app is licensed under the [MIT license](https://opensource.org/licenses/MIT).