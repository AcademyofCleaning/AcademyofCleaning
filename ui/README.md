## Components/Styling Guide
1. This project leverages `react-strap`. Most components can be taken from react-strap with little modification
1. If modification is needed, see an illustration of how to use a styled component in `src/Components/ProfilePage.jsx`
1. For page headings, use a styled H3 component. For profile pages, the heading can be center-aligned. For other pages, please follow the styled H3 component in `ProfilePage.jsx`

## Setting up Authentication with Auth0 locally
Create a .env file in `ui/` and populate with the following:

```
DEV_PORT=3000
PROD_PORT=3001
REACT_APP_AUTH0_DOMAIN=academyofcleaning.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=
BASE_URL=http://localhost:3000
SESSION_SECRET=
```

Please privately message @MatthewFollegot to obtain the client ID and secret

## Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
