import { Request, Response, NextFunction } from 'express';
import Problem from '../models/Problem';
import logging from '../config/logging';
import IUser from '../interfaces/user';
import User from '../models/User';

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

// @desc - Add ascent to problem
// @method - POST
const addAscent = async (req: Request, res: Response, _next: NextFunction) => {
  logging.info(NAMESPACE, `Adding ascent to problem`);
  const { _id } = req.user as IUser;
  try {
    const user = await User.findById(_id);
    const problem = await Problem.findById(req.params.id);
    const { attempts, rating, grade, ...rest } = req.body;
    if (!problem) {
      res.status(404).json({ message: 'Problem not found' });
    }
    const newAscent = {
      user: _id,
      name: user?.name,
      attempts,
      rating,
      grade,
      ...rest
    };
    problem?.ascents.push(newAscent);
    await problem?.save();
    res.status(200).json(problem?.ascents);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      error
    });
  }
};

// @desc - Delete ascent by problem and ascent id
// @method - DELETE
const deleteAscent = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Deleting problem`);
  const { _id } = req.user as IUser;
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    console.log(problem.ascents.length);
    const ascent = problem.ascents.find(
      (ascent) => ascent._id.toString() === req.params.ascent_id
    );
    if (!ascent) {
      return res.status(404).json({ message: 'Ascent does not exist' });
    }
    if (ascent.user.toString() !== _id.toString()) {
      return res.status(401).json({ message: 'User not ascent creator' });
    }

    const removeIdx = problem.ascents
      .map((problem) => problem.user.toString())
      .indexOf(_id.toString());
    problem.ascents.splice(removeIdx, 1);
    await problem.save();
    return res.status(200).json(problem);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    return res.status(500).json({
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
  const { _id } = req.user as IUser;
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    if (problem.user.toString() !== _id.toString()) {
      return res.status(401).json({ message: 'User not problem creator' });
    }

    await problem?.remove();
    return res.status(200).json({ message: 'Problem removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    return res.status(500).json({
      message: error.message,
      error
    });
  }
};

export default {
  addProblem,
  getAllProblems,
  getProblemById,
  deleteProblem,
  addAscent,
  deleteAscent
};
