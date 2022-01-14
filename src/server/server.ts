import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from "cors";
import dotenv from "dotenv";
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import authRoute from "./routes/auth";

dotenv.config();


// node dev.js
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
    clientID: `${process.env.GH_CLIENT_ID}`, 
    clientSecret: `${process.env.GH_CLIENT_SECRET}`,
    callbackURL: `${process.env.GH_CALLBACK_URL}`,
    },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log('profile: ',profile);
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