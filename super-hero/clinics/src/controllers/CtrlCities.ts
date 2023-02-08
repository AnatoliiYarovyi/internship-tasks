import { Request, Response } from 'express';

import { Cities } from '../data/repositories/Cities';
import { Suggestion, TypedDataResponse } from '../interfaces/Ctrl';

const cities = new Cities();

export class CtrlCities {
  async getCities(req: Request, res: Response) {
    const { value } = req.query;

    const results = await cities.getCities(`${value}`);

    const typedDataResponse: TypedDataResponse<Suggestion> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getState(req: Request, res: Response) {
    const { value } = req.query;

    const results = await cities.getState(`${value}`);

    const typedDataResponse: TypedDataResponse<Suggestion> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }
}
