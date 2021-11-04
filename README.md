# EZAV Recordings

This app is intended to provide an easy-to-use interface for the recording and uploading of video presentations.
It's built with Nodejs, Express, Sequelize, PostgreSQL, and React with Bootstrap 4, Reactstrap, and SCSS.
Created by John Crowley for EZ Audio Visual, LLC.

## How to run

Make sure you have the Sequelize CLI installed and make a db.json file in the config directory with yor database settings. In the project root directory, run:

### `sequelize db:create`
### `sequelize db:migrate`
### `sequelize db:seed:all` (optional)

then run

### `node app.js` 

to start the Express server. 

Express is configured to serve the client build folder, and the React dev server is also configured to proxy api requests back to Express.


to install deps and start the React dev server run:

### `npm install`
### `npm start`

in the client directory.
