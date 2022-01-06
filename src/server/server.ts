import express from "express";
// import axios from "axios";
import config from "config";
import api from './routes/api';
import log from './logger';

const port = config.get("port") as number;
const host = config.get("host") as string;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use('/api', api);

// app.get('/', (req, res) => {
//   return(
//     res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
//   );
// });

// app.get('/', (req, res) => {
//   res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=d223334a158fd98423d8`)
// });

// app.get('/login/callback', ({ query: { code } }, res) => {
//   const body = {
//     client_id: 'd223334a158fd98423d8',
//     client_secret: '5201648e266bf4a28fc225e84a7d4db9d04cec0316ff85a93ecd5a711d340f35e1d3b69503197ff1',
//     code,
//   };
//   const opts = { headers: { accept: 'application/json' } };
//   axios
//     .post('https://github.com/login/oauth/access_token', body, opts)
//     .then((_res) => _res.data.access_token)
//     .then((token) => {
//       res.redirect(`/?token=${token}`);
//     })
//     .catch((err) => res.status(500).json({ err: err.message }));
  
// })

// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
// });

// app.get('/oauth-callback', (req: any, res: any) => {
//  const body = {
//    client_id: clientId,
//    client_secret: clientSecret,
//    code: req.query.code
//  };
//  const opts = { headers: { accept: 'application/json' } };
//  axios.post(`https://github.com/login/oauth/access_token`, body, opts)
//     .then(res => res.data['access_token'])
//     .then(_token => {
//      console.log('My token:', token);
//      token = _token;
//      res.json({ ok: 1 });
//    }).
//    catch(err => res.status(500).json({ message: err.message }));
// );



// app.use('/api', apiRouter);

app.use((req, res) => res.sendStatus(404));

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

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}...`);

});


