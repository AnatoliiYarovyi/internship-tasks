import { Suppliers } from '../data/repositories/Suppliers';
import { metrics } from './metrics';
import { RowCount, TypedDataResponse } from '../interfaces/Ctrl';
import { AllSuppliers, SupplierById } from '../interfaces/CtrlSuppliers';

const suppliers = new Suppliers();

export class CtrlSuppliers {
  async getRowCount() {
    const triggerDate = metrics.getTriggerDate();
    const data = await suppliers.getRowCount();
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

  async getAllSuppliers(limit: string, page: string) {
    const triggerDate = metrics.getTriggerDate();
    const data = await suppliers.getAllSuppliers(+limit, +page);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<AllSuppliers> = {
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

  async getSupplierById(id: number) {
    const triggerDate = metrics.getTriggerDate();
    const data = await suppliers.getSupplierById(id);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<SupplierById> = {
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
