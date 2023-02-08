import { Request, Response } from 'express';

import { Suburbs } from '../data/repositories/Suburbs';
import { Suggestion, TypedDataResponse } from '../interfaces/Ctrl';

const suburbs = new Suburbs();

export class CtrlSuburbs {
  async getSuburbs(req: Request, res: Response) {
    const { value } = req.query;

    const results = await suburbs.getSuburbs(`${value}`);

    const typedDataResponse: TypedDataResponse<Suggestion> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getPostcode(req: Request, res: Response) {
    const { value } = req.query;

    const results = await suburbs.getPostcode(`${value}`);

    const typedDataResponse: TypedDataResponse<Suggestion> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }
}
