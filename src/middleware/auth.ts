import { Request, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  } else {
    res.status(401).json({ message: 'User not authorized' });
  }
};

export default auth;
