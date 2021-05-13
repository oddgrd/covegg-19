import express from 'express';
import { check, validationResult } from 'express-validator';
import controller from '../../controllers/problem';
import auth from '../../middleware/auth';

const router = express.Router();

// @route    POST api/problems
// @desc     Add new problem
// @access   Private
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty().trim().escape(),
    check('rules', 'Problem Rules are required').not().isEmpty().trim().escape()
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

// @route    PUT api/problems/:id
// @desc     Edit problem
// @access   Private
router.put(
  '/:id',
  [
    check('title', 'Title is required').not().isEmpty().trim().escape(),
    check('rules', 'Problem Rules are required').not().isEmpty().trim().escape()
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
router.get('/:id', controller.getProblemById);

// @route    POST api/problems/:id
// @desc     Add ascent to problem
// @access   Private
router.post(
  '/:id',
  [
    check('attempts', 'Attempts is required').not().isEmpty(),
    check('rating', 'Rating is required').not().isEmpty(),
    check('grade', 'Rating is required').not().isEmpty(),
    check('comment').optional().trim().escape()
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
  controller.addAscent
);

// @route    PUT api/problems/:id/:ascent_id
// @desc     Edit ascent
// @access   Private
router.put(
  '/:id/:ascent_id',
  [
    check('attempts', 'Attempts is required').not().isEmpty(),
    check('rating', 'Rating is required').not().isEmpty(),
    check('grade', 'Rating is required').not().isEmpty(),
    check('comment').optional().trim().escape()
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
  controller.editAscent
);

// @route    DELETE api/problems/:id/:ascent_id
// @desc     Delete ascent by problem and ascent id
// @access   Private
router.delete('/:id/:ascent_id', auth, controller.deleteAscent);

// @route    DELETE api/problems/:id
// @desc     Delete problem by object ID
// @access   Private
router.delete('/:id', auth, controller.deleteProblem);

export = router;
