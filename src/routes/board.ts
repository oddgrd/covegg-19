import express from 'express';
import multer from 'multer';
import Board from '../models/Board';
import fs from 'fs';

const router = express.Router();

interface multerFile {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

let upload = multer({ dest: 'images/' });

router.post('/add', upload.single('image'), async (req, res) => {
  const img = fs.readFileSync(req.file.path);
  try {
    const newBoard = new Board({ image: img });
    await newBoard.save();
    res.status(200).json({ message: 'Image Added' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
});

router.get('/', async (_req, res) => {
  try {
    const boards = await Board.find().sort({ date: -1 });
    if (!boards) {
      res.status(404).json({ message: 'Problems not found' });
    }
    res.status(200).json(boards);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
});
export = router;
