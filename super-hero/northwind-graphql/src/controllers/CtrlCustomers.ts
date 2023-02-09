import { Customers } from '../data/repositories/Customers';
import { metrics } from './metrics';
import { TypedDataResponse, RowCount } from '../interfaces/Ctrl';
import {
  AllCustomers,
  CustomersById,
  SearchCustomers,
} from '../interfaces/CtrlCustomers';

const customers = new Customers();

export class CtrlCustomers {
  async getRowCount() {
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

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }

  async getAllCustomers(limit: number, page: number) {
    const triggerDate = metrics.getTriggerDate();
    const data = await customers.getAllCustomers(limit, page);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<AllCustomers> = {
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

  async getCustomerById(id: string) {
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

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }

  async getSearchCustomers(value: string) {
    const triggerDate = metrics.getTriggerDate();
    const data = await customers.getSearchCustomers(value);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<SearchCustomers> = {
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
