import express from 'express';
import { check, validationResult } from 'express-validator';
import passport from 'passport';
import controller from '../controllers/problem';
import auth from '../middleware/auth';
import { ensureLoggedIn } from 'connect-ensure-login';
const router = express.Router();

// @route    POST api/problems
// @desc     Add new problem
// @access   Private
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('setBy', 'Set By info is required').not().isEmpty(),
    check('firstAscent', 'First Ascentionist is required').not().isEmpty()
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  auth,
  controller.addProblem
);

// @route    GET api/problems
// @desc     Get all problems
// @access   Public
router.get('/', controller.getAllProblems);

// @route    GET api/problems/:id
// @desc     Get problem by object ID
// @access   Public
router.get('/:id', auth, controller.getProblemById);

// @route    DELETE api/problems/:id
// @desc     Delete problem by object ID
// @access   Private
router.delete('/:id', auth, controller.deleteProblem);

export = router;
