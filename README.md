# React Redux Base

## Npm commands
1. **Run the app**. `npm start -s`
2. **Build the app**. `npm run build`
3. **Lint the app**. `npm run lint`
4. **Test the app**. `npm run test`

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Create two constants files in `./src` folder(devConstant.js and prodConstants.js):
  * devConstants is used while you are developing(on `npm start` script)
  * prodConstats is used once you build the app(on `npm run build` script)

  Those files should include the `API_URL` constant.

  devConstants.js or prodConstants.js example:
  ```javascript
  export const config = {
    API_URL: 'http://your-api-url.com'
  };
  ```
4. Start the dev server: `npm start -s`

## Initial Machine Setup
**Install [Node 4.0.0 or greater](https://nodejs.org)** - (5.0 or greater is recommended for optimal build performance). Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).

##Deploying to AWS S3
1. **Install [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)**
2. **Configure AWS** with the command `aws configure`
3. **Set the buckets for your app** in the script `/tools/deployS3.js`
4. **Run the command to deploy** `npm run deploy:staging` or `npm run deploy:production`

## Technologies

| **Tech** | **Description**
|----------|-------
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.|
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging.|
|  [React Router](https://github.com/reactjs/react-router) | A complete routing library for React |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.|
| [Webpack](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Includes hot reloading via [React Hot Loader](https://github.com/gaearon/react-hot-loader). |
| [Express](https://github.com/expressjs/express) | Fast, unopinionated, minimalist web framework for node. |
| [Jest](https://facebook.github.io/jest/) | Automated tests with built-in expect assertions and  [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. |
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more.
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. |
| [Stylelint](https://github.com/stylelint/stylelint) | Modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets. |
| [LocalForage](https://github.com/localForage/localForage) |  Fast and simple storage library, improves the offline experience of your web app by using asynchronous storage (IndexedDB or WebSQL) |
| [ReduxForm](http://redux-form.com/6.4.3/) | Redux-form works with React Redux to enable an html form in React to use Redux to store all of its state. |
| [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch) |  Is a Promise-based mechanism for programatically making web requests in the browser. |
| [Validate.js](https://validatejs.org/) | Provides a declarative way of validating javascript objects. |
| [Humps](https://github.com/domchristie/humps) | Underscore-to-camelCase converter (and vice versa) for strings and object keys in JavaScript.|
