import express from 'express';
import controller from '../controllers/board';
import auth from '../middleware/auth';

const router = express.Router();

// @route    POST api/boards/upload
// @desc     Store image in google cloud storage
// @access   Private
router.post('/upload', auth, controller.upload);

export = router;
