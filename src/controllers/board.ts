import { Request, Response, NextFunction } from 'express';
import Board from '../models/Board';
import logging from '../config/logging';
import IUser from '../interfaces/user';
import User from '../models/User';
import { uploadImage } from '../helpers/helpers';

const NAMESPACE = 'Board Controller';

// @desc - Store image in google cloud storage
// @method - POST
const upload = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Uploading image`);
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);

    res.status(200).json({
      message: 'Upload was successful',
      data: imageUrl
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error
    });
    next(error);
  }
};

// @desc - Store reference to board image in mongoDB
// @method - POST
const saveBoard = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { board, imageUrl } = req.body;
    const boardFields = {
      imageUrl: imageUrl,
      boardVersion: board
    };
    const newBoard = new Board(boardFields);
    await newBoard.save();
    res.status(200).json(newBoard);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
};

// @desc - Get all problems
// @method - GET
const getAllBoards = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Getting all boards`);
  try {
    const boards = await Board.find().sort({ date: -1 });
    if (!boards) {
      res.status(404).json({ message: 'Boards not found' });
    }
    res.status(200).json(boards);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
};

// @desc - Get board by object ID
// @method - GET
const getBoardById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Getting board by ID`);

  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      res.status(404).json({ message: 'Board not found' });
    }
    res.status(200).json(board);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
};
export default { upload, saveBoard, getAllBoards, getBoardById };
