import { Request, Response, NextFunction } from 'express';
import Problem from '../models/Problem';
import logging from '../config/logging';

const NAMESPACE = 'Problem Controller';

// @desc - Add new problem
// @method - POST
const addProblem = async (req: Request, res: Response, _next: NextFunction) => {
  logging.info(NAMESPACE, `Add problem route called.`);
  const {
    name,
    title,
    grade,
    setBy,
    firstAscent,
    attempts,
    rating,
    boardVersion,
    rules,
    ascents,
    dataUrl
  } = req.body;

  try {
    const newProblem = new Problem({
      name,
      title,
      grade,
      setBy,
      firstAscent,
      attempts,
      rating,
      boardVersion,
      rules,
      ascents,
      dataUrl
    });
    await newProblem.save();
    res.status(200).json(newProblem);
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
const getAllProblems = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Get all problems route called.`);

  try {
    const problems = await Problem.find().sort({ date: -1 });
    res.status(200).json(problems);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
};

export default { addProblem, getAllProblems };
