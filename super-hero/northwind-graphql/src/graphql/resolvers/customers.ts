import { CtrlCustomers } from '../../controllers/CtrlCustomers';
const ctrl = new CtrlCustomers();

export const customers = {
  customerRows: async () => await ctrl.getRowCount(),
  customers: async (_, { limit, page }) =>
    await ctrl.getAllCustomers(limit, page),
  customerById: async (_, { id }) => await ctrl.getCustomerById(id),
  customerByValue: async (_, { value }) => await ctrl.getSearchCustomers(value),
};
