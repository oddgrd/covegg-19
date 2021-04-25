import express from 'express';
import controller from '../controllers/board';
import auth from '../middleware/auth';

const router = express.Router();

// @route    POST api/boards/upload
// @desc     Store image in google cloud storage
// @access   Private
router.post('/upload', auth, controller.upload);

// @route    POST api/boards
// @desc     Store reference to GC img in mongoDB
// @access   Private
router.post('/', auth, controller.saveBoard);

// @route    GET api/boards
// @desc     Get all boards
// @access   Public
router.get('/', controller.getAllBoards);

// @route    GET api/boards/:id
// @desc     Get board by object ID
// @access   Public
router.get('/:id', controller.getBoardById);

export = router;
