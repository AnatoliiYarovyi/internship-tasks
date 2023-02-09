import { CtrlProducts } from '../../controllers/CtrlProducts';
const ctrl = new CtrlProducts();

export const products = {
  productRows: async () => await ctrl.getRowCount(),
  products: async (_, { limit, page }) =>
    await ctrl.getAllProducts(limit, page),
  productById: async (_, { id }) => await ctrl.getProductsById(id),
  productByValue: async (_, { value }) => await ctrl.getSearchProducts(value),
};
