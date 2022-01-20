import express from 'express';
import passport from 'passport';

import dbController from '../controllers/reactrixController';

const router = express.Router();

function isUserAuthenticated(req: any,res: any,next: any){
    if(req.user){
        next();
    } else {
        res.send('Please login');
    }
}

router.get("/github", passport.authenticate("github", {scope: [`profile`]},
    function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    return;
    }));

router.get("/login/success", isUserAuthenticated, dbController.handleLogin, dbController.getReusableComponents, (req, res) => {
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
  passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login/failed' })
);

export default router;