import { Request, Response } from 'express';

import { Orders } from '../data/repositories/Orders';
import { metrics } from './metrics';
import { RowCount, TypedDataResponse } from '../interfaces/Ctrl';
import {
  AllOrders,
  OrderInformation,
  OrderInformationById,
  ProductsInOrder,
} from '../interfaces/CtrlOrders';

const orders = new Orders();

export class CtrlOrders {
  async getRowCount(req: Request, res: Response) {
    const triggerDate = metrics.getTriggerDate();
    const data = await orders.getRowCount();
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

  async getAllOrders(req: Request, res: Response) {
    const { limit, page } = req.query;

    const triggerDate = metrics.getTriggerDate();
    const data = await orders.getAllOrders(+limit, +page);
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<AllOrders> = {
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

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;

    const triggerDateOrder = metrics.getTriggerDate();
    let orderInformation: OrderInformation;
    const data = await orders.orderInformationById(+id);
    if (data.data[0].Id === null) {
      orderInformation = {
        sqlString: data.sqlString,
        data: [],
      };
    } else {
      orderInformation = data;
    }
    const durationOrder = metrics.getTimeInterval(triggerDateOrder);

    const triggerDateProducts = metrics.getTriggerDate();
    const productsInOrder = await orders.productsInOrderById(+id);
    const durationProducts = metrics.getTimeInterval(triggerDateProducts);

    const typedOrderResponse: TypedDataResponse<OrderInformationById> = {
      duration: durationOrder,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: orderInformation.sqlString,
      data: orderInformation.data,
    };
    const typedProductsResponse: TypedDataResponse<ProductsInOrder> = {
      duration: durationProducts,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: productsInOrder.sqlString,
      data: productsInOrder.data,
    };

    res.status(200).json({
      status: 'success',
      orderInformation: typedOrderResponse,
      productsInOrder: typedProductsResponse,
    });
  }
}
