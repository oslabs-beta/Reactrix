// // npx kill-port 8080      
// //import { AppContainer } from 'react-hot-loader';
// // const cors = require('cors');
// // import {Request, Response} from 'express'
// // const dotenv = require('dotenv');
// // const PORT: number = parseInt(process.env.PORT as string, 10);

// // const path = require('path');
// // const express = require ('express');

// // const app = express();

// // dotenv.config();

// // interface RequestHandler {
//   //   (req: Request, res: Response, next: any) : any;
//   // };
  
//   // interface ErrorRequestHandler {
//     //   (err: any, req: Request, res: Response, next: any): any;
//     // };
    
//     // enable all CORS requests
//     // app.use(cors());
    
//     // const apiRouter = require('./routes/api');
    
//     // app.use(express.static(path.resolve(__dirname, '../')));
    
//     // import path from 'path';
//     import express from 'express';
//     const app = express();
//     const PORT = 3000;
//     import sampleRoutes from './routes/sample';
    
// const clientId= 'd223334a158fd98423d8';
// const clientSecret = '5201648e266bf4a28fc225e84a7d4db9d04cec0316ff85a93ecd5a711d340f35e1d3b69503197ff1'
    
    
//     // app.use((req,res,next) => {
//     //   // logging.info(Server, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
//     //   res.on('finish', () => {
        
//     //   })
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Rules of our API
// app.use((req, res, next) => {
//   res.header('Access-Control-ALlow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//   next();
// });

// // Error Handling
// app.use((req, res, next) => {
//   const error = new Error('not found');
//   return res.status(404).json({
//     message: error.message
//   });
// });

// app.use('/sample', sampleRoutes);

// // app.get('/', (req, res) => {
// //   return(
// //     res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
// //   );
// // });

// // app.get('/login', (req, res) => {
// //   res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
// // });

// // app.get('/dashboard', (req, res) => {
// //   res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
// // });

// // app.get('/', (req, res) => {
// //   return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
// // });

// // app.get('/oauth-callback', (req: any, res: any) => {
// //  const body = {
// //    client_id: clientId,
// //    client_secret: clientSecret,
// //    code: req.query.code
// //  };
// //  const opts = { headers: { accept: 'application/json' } };
// //  axios.post(`https://github.com/login/oauth/access_token`, body, opts)
// //     .then(res => res.data['access_token'])
// //     .then(_token => {
// //      console.log('My token:', token);
// //      token = _token;
// //      res.json({ ok: 1 });
// //    }).
// //    catch(err => res.status(500).json({ message: err.message }));
// // );



// // app.use('/api', apiRouter);

// app.use((req, res) => res.sendStatus(404));

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}...`);
// });

// module.exports = app;
