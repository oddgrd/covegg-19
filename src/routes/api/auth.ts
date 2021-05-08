import express from 'express';
import passport from 'passport';
import config from '../../config/config';
import auth from '../../middleware/auth';
import User from '../../models/User';
const router = express.Router();

// @route    GET api/auth
// @desc     Load user
// @access   Private
router.get('/', auth, async (req: any, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/auth/google
// @desc     Login redirect to google
// @access   Public
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

// @route    GET api/auth/google/callback
// @desc     Google callback URL
// @access   Private
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${config.redirectUrl}`,
    failureRedirect: '/api/auth/login/failed'
  })
);

// @route    GET api/auth/logout
// @desc     Log out
// @access   Public
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${config.redirectUrl}`);
});

export = router;
