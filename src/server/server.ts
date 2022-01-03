const path = require('path');
const express = require('express');
const { AppContainer } = require('react-hot-loader');
// const cors = require('cors');

const app = express();
const PORT = 3000;

// enable all CORS requests
// app.use(cors());

// const apiRouter = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req: any, res: any) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../../index.html'));
});

// app.use('/api', apiRouter);

app.use((req: any, res: any) => res.sendStatus(404));

app.use((err: any, req: any, res: any, next: any) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
