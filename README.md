## Live version on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/5efa7926-4d34-42c7-857b-0fa5441f5a10/deploy-status)](https://app.netlify.com/sites/priceless-lalande-c8081a/deploys)

https://priceless-lalande-c8081a.netlify.app/

## About the app

- The app is built with [React](https://reactjs.org/) + [Redux](https://redux.js.org/). No extra component libraries or css frameworks are used.
- Each component has its own unit test folder, tests with coverages can be run via `yarn test:coverage` command.
- Mock products and cart items can be found under `products` and `cart` keys in local storage.
- Multiple filtering is possible.
- After the filtering, the sort preference is preserved.
- Side panel and select box sort options are synced.
- Re-clicking any of the selected colors/sort types/brands will remove the selected option.
- Total price in cart is updated according to the added/deleted items
- The app has pagination support (page count is updated when a filter is applied).

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:coverage`

Launches the test runner with the coverage option.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
