import express from 'express';
import controller from '../controllers/problems';
const router = express.Router();

router.get('/get/problems', controller.getAllProblems);

export = router;
