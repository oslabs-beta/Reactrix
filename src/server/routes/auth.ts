import express from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { resolve } from 'path/win32';
import dbController from '../controllers/reactrixController';

const router = express.Router();

router.get("/github", passport.authenticate("github", {scope: [ 'user' ]},
    function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    return;
    }
));

router.get("/login/success", dbController.handleLogin, dbController.getReusableComponents, (req, res) => {
    if(req.user){
        res.status(200)
        .json({
            success: true,
            message: "successful",
            user: res.locals.username,
            isLoggedIn: true,
            userReusableComponents: res.locals.reusableComponents,
        })
    }
});

router.post("/logout", (req, res) => {
    if (!req){
        res.redirect('/');
    }
    req.logout();
    res.json({
        success: null,
        message: "successful",
        user: null,
        isLoggedIn: false,
        userReusableComponents: null,
    })
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
    .redirect("http://localhost:3000/")
});


router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

export default router;