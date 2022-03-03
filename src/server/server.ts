import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from "cors";
import dotenv from "dotenv";
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

import authRoute from "./routes/auth";
import dbController from "./controllers/reactrixController"

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------- GITHUB -------------------------------//
// Below is where we introduce encrypted sessions
// It has in-built ability to parse and use cookies
app.use(session({ secret: `${process.env.SESSION_SECRET}`, resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
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
    process.nextTick(
      function (req: any, res: any) {
        return done(profile.user, profile);
    }
    );
  }
));

app.use("/auth", authRoute);

// -------------------------- GITHUB -------------------------------//
// statically serve everything in the build folder on the route '/dist'
app.use('/', express.static(path.join(__dirname, 'static')))

app.get('/', (req: any, res: any) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/*', (req: any, res: any) => {
  return res.redirect('/');
});

app.post('/reusablecomponents/insert', dbController.insertReusableComponents, (req: any, res: any) => {
  return res.status(200);
})

app.post('/reusablecomponents/delete', dbController.deleteReusableComponents, (req: any, res: any) => {
  return res.status(200);
})

app.use((req: any, res: any) => {
  res.sendStatus(404)
})

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
