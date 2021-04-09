import { Request, Response, NextFunction } from 'express';
import Problem from '../models/Problem';
import logging from '../config/logging';

const NAMESPACE = 'Problem Controller';

// @desc - Add new problem
// @method - POST
const addProblem = async (req: Request, res: Response, _next: NextFunction) => {
  logging.info(NAMESPACE, `Adding problem`);
  const {
    name,
    title,
    grade,
    setby,
    firstascent,
    attempts,
    rating,
    boardversion,
    rules,
    ascents,
    dataurl
  } = req.body;

  try {
    const newProblem = new Problem({
      name,
      title,
      grade,
      setby,
      firstascent,
      attempts,
      rating,
      boardversion,
      rules,
      ascents,
      dataurl
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
  logging.info(NAMESPACE, `Getting all problems`);

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
