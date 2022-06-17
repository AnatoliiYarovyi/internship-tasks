import { Request, Response, NextFunction } from 'express';

const controllerWrapper = ctrl => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default controllerWrapper;
