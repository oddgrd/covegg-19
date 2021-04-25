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

export default { upload };
