import express from 'express';
import passport from 'passport';
import auth from '../middleware/auth';
import User from '../models/User';
const router = express.Router();

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      message: 'User has successfully authenticated',
      user: req.user,
      cookies: req.cookies
    });
  } else
    res.status(400).json({
      message: 'User Not Authenticated'
    });
});

router.get('/', auth, async (req: any, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/login/failed', (_req, res) => {
  res.status(401).json({
    message: 'User failed to authenticate.'
  });
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/api/auth/login/failed'
  })
);

export = router;
