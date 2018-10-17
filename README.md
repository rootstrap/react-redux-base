# React Redux Base

[![CircleCI](https://circleci.com/gh/rootstrap/react-redux-base.svg?style=shield)](https://circleci.com/gh/rootstrap/react-redux-base)
[![Dependency Status](https://img.shields.io/david/rootstrap/react-redux-base.svg)](https://david-dm.org/rootstrap/react-redux-base)
[![License](https://img.shields.io/github/license/rootstrap/react-redux-base.svg)](https://github.com/rootstrap/react-redux-base/blob/master/LICENSE.md)


## Commands
1. **Run the app**. `yarn start` or `npm start`
2. **Build the app**. `yarn build` or `npm run build`
3. **Lint the app**. `yarn lint` or `npm run lint`
4. **Test the app**. `yarn test` or `npm run test`
5. **Run the app with SSR**. `yarn ssr` or `npm run ssr`

## Getting Started
1. Clone the repository
2. Install dependencies: `yarn` or `npm install`
3. Create the environment variables files in root folder(.env.dev, .env.staging and .env.prod):

  `.env.example` example:
  ```
    API_URL=http://your-api-url.com
    CABLE_URL=wss://your-api-url.com/cable
    AWS_BUCKET=bucket
    AWS_REGION=region
    AWS_ACCESS_KEY_ID=key_id
    AWS_SECRET_ACCESS_KEY=secret_key
  ```
4. Start the dev server: `yarn start` or `npm start -s`

## Running script with different environments
To change the set of environment variables for a script it's needed to run ENV=my_environment before the script.

For example: `ENV=staging yarn build`

## Initial Machine Setup
**Install [Node 7.0.0 or greater](https://nodejs.org)**

**Install [Yarn](https://yarnpkg.com/en/docs/install)** - Fast, reliable, and secure package manager

## Server Side Rendering
This base is already set up with a Node server for SSR.

The command `yarn ssr` will compile the server and client.

## Progressive web app
To enable your progressive web app, set the environment variable `ENABLE_PWA` in your dot environment file.

### Fetching data
The server is prepared to fetch data directly from the backend before rendering the HTML.

## Deploying to AWS S3
1. **Add the environment variables for each .env** AWS_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
2. **Run the command to deploy with an environment** `ENV=your_environment yarn deploy`

## Deploying to Heroku
1. **Add all the environment variables in .env to Heroku**
2. **Add the env variable NPM_CONFIG_PRODUCTION=false to Heroku**
2. **Deploy your branch to Heroku**

## Technologies

| **Tech** | **Description**
|----------|-------
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.|
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging.|
|  [React Router 4](https://github.com/reactjs/react-router) | A complete routing library for React |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.|
| [Webpack 4](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Includes hot reloading via [React Hot Loader](https://github.com/gaearon/react-hot-loader). |
| [Express](https://github.com/expressjs/express) | Fast, unopinionated, minimalist web framework for node. |
| [Jest](https://facebook.github.io/jest/) | Automated tests with built-in expect assertions and  [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. |
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) for the airbnb style guides. |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more.
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Stylelint](https://github.com/stylelint/stylelint) | Modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets. |
| [Redux React Session](https://github.com/bernabe9/redux-react-session) | Keep your session sync with localStorage and Redux |
| [ReduxForm](http://redux-form.com/6.4.3/) | Redux-form works with React Redux to enable an html form in React to use Redux to store all of its state. |
| [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch) |  Is a Promise-based mechanism for programatically making web requests in the browser. |
| [Immutable.js](https://github.com/facebook/immutable-js/) | Immutable persistent data collections for Javascript which increase efficiency and simplicity. |
| [React Intl](https://github.com/yahoo/react-intl/) | Localization for language support. |

## License

React Redux Base is available under the MIT license. See the LICENSE file for more info.

## Credits

**React Redux Base** is maintained by [Rootstrap](http://www.rootstrap.com) with the help of our [contributors](https://github.com/rootstrap/react-redux-base/contributors).

[<img src="https://s3-us-west-1.amazonaws.com/rootstrap.com/img/rs.png" width="100"/>](http://www.rootstrap.com)
