import express from 'express';
import { check, validationResult } from 'express-validator';
import controller from '../controllers/problem';

const router = express.Router();

// @route    GET api/problems
// @desc     Get all problems
// @access   Public
router.get('/', controller.getAllProblems);

// @route    POST api/problems
// @desc     Add new problem
// @access   Public (todo: private)
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
  controller.addProblem
);

export = router;
// name,
//     title,
//     grade,
//     set_by,
//     first_ascent,
//     attempts,
//     rating,
//     board_version,
//     rules,
//     ascents,
//     dataUrl
