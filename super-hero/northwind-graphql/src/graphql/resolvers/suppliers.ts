import { CtrlSuppliers } from '../../controllers/CtrlSuppliers';
const ctrl = new CtrlSuppliers();

export const suppliers = {
  supplierRows: async () => await ctrl.getRowCount(),
  suppliers: async (_, { limit, page }) =>
    await ctrl.getAllSuppliers(limit, page),
  supplierById: async (_, { id }) => await ctrl.getSupplierById(id),
};
