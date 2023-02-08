import { Request, Response } from 'express';

import { Customers } from '../data/repositories/Customers';
import { metrics } from './metrics';
import { TypedDataResponse, RowCount } from '../interfaces/Ctrl';
import { AllCustomers, CustomersById } from '../interfaces/CtrlCustomers';

const customers = new Customers();

export class CtrlCustomers {
  async getRowCount(req: Request, res: Response) {
    const triggerDate = metrics.getTriggerDate();
    const data = await customers.getRowCount();
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<RowCount> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: data.sqlString,
      data: data.data,
    };

    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getAllCustomers(req: Request, res: Response) {
    const { limit, page } = req.query;

    const triggerDate = metrics.getTriggerDate();
    const data = await customers.getAllCustomers(+limit, +page);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<AllCustomers> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: data.sqlString,
      data: data.data,
    };

    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;

    const triggerDate = metrics.getTriggerDate();
    const data = await customers.getCustomersById(id);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<CustomersById> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: data.sqlString,
      data: data.data,
    };

    res.status(200).json({
      status: 'success',
      data: typedDataResponse,
    });
  }

  async getSearchCustomers(req: Request, res: Response) {
    const { value } = req.query;

    const triggerDate = metrics.getTriggerDate();
    const data = await customers.getSearchCustomers(`${value}`);
    const duration = metrics.getTimeInterval(triggerDate);

    res.status(200).json({
      status: 'success',
      data: {
        duration,
        ts: metrics.getTimeISO(),
        servedBy: 'northwind.db',
        sqlString: data.sqlString,
        data: data.data,
      },
    });
  }
}
