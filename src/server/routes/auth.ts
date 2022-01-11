import express, { Router } from 'express';
import passport from 'passport';
import { BrowserRouter } from 'react-router-dom';
import { treeItemClasses } from '@mui/lab';
// import { Redirect } from 'react-router-dom';
const router = express.Router();

router.get("/github", passport.authenticate("github", {scope: [ `user:email`] }),
    function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    console.log('app.get(/auth/github) is working')
    return;
    });
// (req, res) => {
//     return res.status(200).json({ ...res.locals.access_token });
//   });
// router.get('/api/login', controller.login);
// // router.post('/api/login/callback', controller.login);
// router.get('/api/login/callback', controller.login);

router.get("/login/success", (req, res) => {
    console.log(req.user)
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
            // cookies: req.cookies
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