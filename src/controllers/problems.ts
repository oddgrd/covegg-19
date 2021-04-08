import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Problems Controller';

const getAllProblems = (_req: Request, res: Response, _next: NextFunction) => {
  logging.info(NAMESPACE, `Sample health check route called.`);

  return res.status(200).json({
    message: 'pong'
  });
};

export default { getAllProblems };
