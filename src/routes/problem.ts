import express from 'express';
import { check, validationResult } from 'express-validator';
import controller from '../controllers/problem';
import auth from '../middleware/auth';

const router = express.Router();

// @route    POST api/problems
// @desc     Add new problem
// @access   Private
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('setBy', 'Set By info is required').not().isEmpty()
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
router.post('/:id', auth, controller.addAscent);

// @route    DELETE api/problems/:id/:ascent_id
// @desc     Delete ascent by problem and ascent id
// @access   Private
router.delete('/:id/:ascent_id', auth, controller.deleteAscent);

// @route    DELETE api/problems/:id
// @desc     Delete problem by object ID
// @access   Private
router.delete('/:id', auth, controller.deleteProblem);

export = router;
