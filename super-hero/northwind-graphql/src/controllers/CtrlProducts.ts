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
  async getRowCount() {
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

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }

  async getAllProducts(limit: number, page: number) {
    const triggerDate = metrics.getTriggerDate();
    const data = await products.getAllProducts(limit, page);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<AllProducts> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: data.sqlString,
      data: data.data,
    };

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }

  async getProductsById(id: number) {
    const triggerDate = metrics.getTriggerDate();
    const data = await products.getProductById(id);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<ProductById> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: data.sqlString,
      data: data.data,
    };

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }

  async getSearchProducts(value: string) {
    const triggerDate = metrics.getTriggerDate();
    const data = await products.getSearchProducts(value);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<SearchProducts> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: data.sqlString,
      data: data.data,
    };

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }
}
