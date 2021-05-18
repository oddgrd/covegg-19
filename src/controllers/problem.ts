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
  const { title, board, rules, grade, coords } = req.body;
  const { _id, name } = req.user as IUser;
  const problemFields = {
    user: _id,
    title,
    board,
    rules,
    setBy: name,
    grade,
    coords
  };
  try {
    const newProblem = new Problem(problemFields);
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

// @desc - Edit problem
// @method - PUT
const editProblem = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Editing problem`);
  const { _id: userId, name } = req.user as IUser;
  const problemFields = {
    user: userId,
    setBy: name,
    ...req.body
  };
  try {
    const problem = await Problem.findOneAndUpdate(
      { _id: req.params.id as any },
      { $set: problemFields },
      { new: true }
    );
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
      message: error.message
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
      return res.status(404).json({ message: 'Problem not found' });
    }
    return res.status(200).json(problem);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message
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
      return res.status(404).json({ message: 'Problem not found' });
    }
    const hasSent = problem.ascents.filter(
      (ascent) => ascent.user.toString() === _id.toString()
    );
    if (hasSent.length > 0)
      return res.status(400).json({ message: 'Problem already sent' });
    const newAscent = {
      user: _id,
      name: user?.name,
      attempts,
      rating,
      grade,
      ...rest
    };
    problem.ascents.push(newAscent);
    await problem.save();
    return res.status(200).json(problem);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message,
      error
    });
  }
};

// @desc - Edit ascent
// @method - PUT
const editAscent = async (req: Request, res: Response, _next: NextFunction) => {
  logging.info(NAMESPACE, `Editing ascent`);
  const { attempts, rating, grade, comment, avatar } = req.body;
  try {
    const problem = await Problem.findOneAndUpdate(
      {
        _id: req.params.id as any,
        'ascents._id': req.params.ascent_id
      },
      {
        $set: {
          'ascents.$._id': req.params.ascent_id,
          'ascents.$.avatar': avatar,
          'ascents.$.attempts': attempts,
          'ascents.$.rating': rating,
          'ascents.$.grade': grade,
          'ascents.$.comment': comment
        }
      },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    return res.status(200).json(problem);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
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
  logging.info(NAMESPACE, `Deleting ascent`);
  const { _id } = req.user as IUser;
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

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
  editProblem,
  getAllProblems,
  getProblemById,
  deleteProblem,
  addAscent,
  editAscent,
  deleteAscent
};
