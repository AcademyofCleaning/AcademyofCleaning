# Academy-of-Cleaning

## [Accessing/Editing Server Code](/server/README.md)
## [Database Details](/db/README.md)
## [Web App Details](/ui/README.md)

### Testing the Web App Locally
To test the web app locally, you must run the frontend and the server at the same time.
1. Run `serverless offline`, a list of viable endpoints will appear
2. Change the fetch/axios request you're making on the react side to hit the appropriate viable endpoint rather than the lambda endpoint.
3. Run `npm start` and type in `y` when prompted to start on a different port than what serverless is running on
4. Go to the localhost port that npm is running on and use the application like normal

### Deploying to Production
To deploy to production, you both have to deploy the front-end and the server. Instructions for both can be seen in their respective folders.

