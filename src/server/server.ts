import express from 'express';
import fs from 'fs';
import path from 'path';
import { AppContainer } from 'react-hot-loader';
// const path = require('path');
// const express = require('express');
// const { AppContainer } = require('react-hot-loader');
// // const cors = require('cors');


// node dev.js
const app = express();
const PORT = 3000;

// // enable all CORS requests
// // app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello from Server')
// })

// const apiRouter = require('./routes/api');

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statically serve everything in the build folder on the route '/dist'
// app.use('/dist', express.static(path.join(__dirname, '../../dist')));
app.use('/', express.static(path.join(__dirname, 'static')))


// serve index.html on the route '/'
app.get('/', (req: any, res: any) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req: any, res: any) => res.sendStatus(404));

// express error handler
app.use((err: any, req: any, res: any, next: any) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
