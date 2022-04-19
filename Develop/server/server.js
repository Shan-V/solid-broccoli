const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const morgan = require('morgan');
const apolloServer = require('./config/apolloServer');

dotenv.config({ path: './config/config.env' });

db();

const app = express();
const PORT = process.env.PORT || 3001;

apolloServer(app, PORT);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// turn on logging for dev environment
if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

const server = app.listen(
  PORT,
  console.log(
    `Server 🌍 running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .underline.bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
