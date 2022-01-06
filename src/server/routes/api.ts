import express, { Router } from 'express';
import controller from '../controllers/login.controller';

const router = express.Router();

router.get('/api/login', controller.login);
// router.post('/api/login/callback', controller.login);
router.get('/api/login/callback', controller.login);

// router.post('/api/login/auth', controller.auth)

export default router;