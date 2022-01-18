import express, { Router } from 'express';
import passport from 'passport';
import { BrowserRouter } from 'react-router-dom';
import { treeItemClasses } from '@mui/lab';
import dbController from '../controllers/reactrixController'
const router = express.Router();

router.get("/github", passport.authenticate("github", {scope: [ `user: username`] }),
    function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    console.log('app.get(/auth/github) is working')
    return;
    });

router.get("/login/success", dbController.handleLogin, dbController.getReusableComponents, (req, res) => {
    // console.log('req in auth.ts line 24: ', res.locals)
    if(req.user){
        console.log('auth.ts, line 19', res.locals)
        res.status(200)
        .json({
            success: true,
            message: "successful",
            user: res.locals.username,
            // cookies: res.cookies,
            isLoggedIn: true,
            // user_id: res.locals.user_id,
            userReusableComponents: res.locals.reusableComponents,
        })
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
    .redirect("http://localhost:3000/")
});


router.get('/github/callback', 
  (req: any, res: any, next: any) => {
    return next();
  }, 
  passport.authenticate('github', { successRedirect: 'http://localhost:3000/', failureRedirect: '/login/failed' })
);

export default router;