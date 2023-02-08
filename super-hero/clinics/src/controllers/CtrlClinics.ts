import { Request, Response } from 'express';

import { Clinics } from '../data/repositories/Clinics';
import { Suggestion, TypedDataResponse } from '../interfaces/Ctrl';
import { AllClinics } from '../interfaces/CtrlClinics';

const clinics = new Clinics();

export class CtrlClinics {
  async getClinicsByCity(req: Request, res: Response) {
    const { value } = req.query;

    const results = await clinics.getClinicsByCity(`${value}`);

    const typedDataResponse: TypedDataResponse<AllClinics> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getClinicsByName(req: Request, res: Response) {
    const { value } = req.query;

    const results = await clinics.getClinicsByName(`${value}`);

    const typedDataResponse: TypedDataResponse<AllClinics> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getClinicsByPostcode(req: Request, res: Response) {
    const { value } = req.query;

    const results = await clinics.getClinicsByPostcode(`${value}`);

    const typedDataResponse: TypedDataResponse<AllClinics> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getClinicsByState(req: Request, res: Response) {
    const { value } = req.query;

    const results = await clinics.getClinicsByState(`${value}`);

    const typedDataResponse: TypedDataResponse<AllClinics> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getClinicsBySuburb(req: Request, res: Response) {
    const { value } = req.query;

    const results = await clinics.getClinicsBySuburb(`${value}`);

    const typedDataResponse: TypedDataResponse<AllClinics> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getClinicNames(req: Request, res: Response) {
    const { value } = req.query;

    const results = await clinics.getClinicNames(`${value}`);

    const typedDataResponse: TypedDataResponse<Suggestion> = {
      results,
    };
    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }
}
