import express, { Router } from 'express';
import controller from '../controllers/login.controller';

const router = express.Router();

router.get("/login", controller.login, (req, res) => {
    return res.status(200).json({ ...res.locals.access_token });
  });
// router.get('/api/login', controller.login);
// // router.post('/api/login/callback', controller.login);
// router.get('/api/login/callback', controller.login);

// // router.post('/api/login/auth', controller.auth)

export default router;