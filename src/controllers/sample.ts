import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';

const sampleHealthCheck = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logging.info(NAMESPACE, `Sample health check route called.`);

  return res.status(200).json({
    message: 'pong'
  });
};

export default { sampleHealthCheck };
