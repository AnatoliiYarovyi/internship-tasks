import { Request, Response } from 'express';

import { Products } from '../data/repositories/Products';
import { metrics } from './metrics';
import { RowCount, TypedDataResponse } from '../interfaces/Ctrl';
import {
  AllProducts,
  ProductById,
  SearchProducts,
} from '../interfaces/CtrlProducts';

const products = new Products();

export class CtrlProducts {
  async getRowCount(req: Request, res: Response) {
    const triggerDate = metrics.getTriggerDate();
    const data = await products.getRowCount();
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

  async getAllProducts(req: Request, res: Response) {
    const { limit, page } = req.query;

    const triggerDate = metrics.getTriggerDate();
    const data = await products.getAllProducts(+limit, +page);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<AllProducts> = {
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

  async getProductsById(req: Request, res: Response) {
    const { id } = req.params;

    const triggerDate = metrics.getTriggerDate();
    const data = await products.getProductById(+id);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<ProductById> = {
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

  async getSearchProducts(req: Request, res: Response) {
    const { value } = req.query;

    const triggerDate = metrics.getTriggerDate();
    const data = await products.getSearchProducts(`${value}`);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<SearchProducts> = {
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
}
