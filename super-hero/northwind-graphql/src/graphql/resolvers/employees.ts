import { CtrlEmployees } from '../../controllers/CtrlEmployees';
const ctrl = new CtrlEmployees();

export const employees = {
  employeeRows: async () => await ctrl.getRowCount(),
  employees: async (_, { limit, page }) =>
    await ctrl.getAllEmployees(limit, page),
  employeeById: async (_, { id }) => await ctrl.getEmployeeById(id),
};
