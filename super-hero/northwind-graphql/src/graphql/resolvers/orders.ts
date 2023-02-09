import { CtrlOrders } from '../../controllers/CtrlOrders';
const ctrl = new CtrlOrders();

export const orders = {
  orderRows: async () => await ctrl.getRowCount(),
  orders: async (_, { limit, page }) => await ctrl.getAllOrders(limit, page),
  orderById: async (_, { id }) => await ctrl.getOrderById(id),
};
