import express from 'express';
import passport from 'passport';
import IUser from 'src/interfaces/user';
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const { _id } = req.user as IUser;
    res.send(_id);
  }
);

export = router;
