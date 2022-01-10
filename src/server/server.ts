import express from 'express';
import session from 'express-session';
// import fs from 'fs';
import path from 'path';
import cors from "cors";
// import dotenv from '.env';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import authRoute from "./routes/auth";

const app = express();
const PORT = 3000;

// // enable all CORS requests
 app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
 }
 ));

import ReactDOMServer from 'react-dom/server';



// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------- GITHUB -------------------------------//
// Below is where we introduce encrypted sessions
// Make sure your app secret is unique and
// defined by cryptographic random generator.
// It has in-built ability to parse and use cookies
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function(obj:any , done: any) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
  new GitHubStrategy(
    {
    clientID: 'd223334a158fd98423d8',
    clientSecret: '318cd7b4cb94c3d06cd6c704cfb23c65430db7fe',
    callbackURL: "http://localhost:3000/auth/github/callback"
    },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log('profile: ',profile);
    console.log('this is done', done);
    // const user = {
    //   username: profile.login,
    //   avatar: profile.avatar_url
    // }
    process.nextTick(function () {
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      console.log('process next tick is running');
      return done(null, profile);
    });
  }
));

app.use("/auth", authRoute);


// -------------------------- GITHUB -------------------------------//


// statically serve everything in the build folder on the route '/dist'
// app.use('/dist', express.static(path.join(__dirname, '../../dist')));
app.use('/', express.static(path.join(__dirname, 'static')))



app.get('/', (req: any, res: any) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});


// catch-all route handler for any requests to an unknown route
app.use((req: any, res: any) => res.sendStatus(404));

// express error handler
// app.use((err: any, req: any, res: any, next: any) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});





// import express from "express";
// import axios from "axios";
// import config from "config";
// // import api from './routes/api';
// import log from './logger';

// const port = config.get("port") as number;
// const host = config.get("host") as string;
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

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

// // app.use('/api', api);

// // app.get('/', (req, res) => {
// //   return(
// //     res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
// //   );
// // });

// app.get('/login', (req, res) => {
//   res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=d223334a158fd98423d8&redirect_uri=http://localhost:3000/login/auth?path=/&scope=user:email`)
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

// // app.use((err, req, res, next) => {
// //   const defaultErr = {
// //     log: 'Express error handler caught unknown middleware error',
// //     status: 400,
// //     message: { err: 'An error occurred' },
// //   };
// //   const errorObj = Object.assign({}, defaultErr, err);
// //   console.log(errorObj.log);
// //   return res.status(errorObj.status).json(errorObj.message);
// // });

// app.listen(port, host, () => {
//   log.info(`Server listening at http://${host}:${port}...`);

// });


