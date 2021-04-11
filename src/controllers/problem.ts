import { Request, Response, NextFunction } from 'express';
import Problem from '../models/Problem';
import logging from '../config/logging';
import IUser from 'src/interfaces/user';

const NAMESPACE = 'Problem Controller';

// @desc - Add new problem
// @method - POST
const addProblem = async (req: Request, res: Response, _next: NextFunction) => {
  logging.info(NAMESPACE, `Adding problem`);
  const { title, boardVersion, rules, dataUrl } = req.body;
  const { _id, name } = req.user as IUser;
  try {
    const newProblem = new Problem({
      user: _id,
      title,
      setBy: name,
      boardVersion,
      rules,
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
  logging.info(NAMESPACE, `Getting all problems`);

  try {
    const problems = await Problem.find().sort({ date: -1 });
    if (!problems) {
      res.status(404).json({ message: 'Problems not found' });
    }
    res.status(200).json(problems);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
};

// @desc - Get problem by object ID
// @method - GET
const getProblemById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Getting problem by ID`);

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json(problem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
};

// @desc - Delete problem by object ID
// @method - DELETE
const deleteProblem = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Deleting problem`);
  try {
    const { _id } = req.user as IUser;
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      res.status(404).json({ message: 'Problem not found' });
    }
    if (problem?.user.toString() !== _id) {
      res.status(401).json({ message: 'User not authorized' });
    }
    await problem?.remove();
    res.status(200).json({ message: 'Problem removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ msg: 'Problem not found' });
    }
    res.status(500).json({
      message: error.message,
      error
    });
  }
};

export default { addProblem, getAllProblems, getProblemById, deleteProblem };
