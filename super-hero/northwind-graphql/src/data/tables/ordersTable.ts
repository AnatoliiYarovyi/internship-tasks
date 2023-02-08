import { InferModel, integer, sqliteTable, text } from 'drizzle-orm-sqlite';
import { customers } from './customersTable';
import { employees } from './employeesTable';

export const orders = sqliteTable('Orders', {
  orderId: integer('OrderID').primaryKey(),
  customerId: text('CustomerID').references(() => customers.customerId),
  employeeId: integer('EmployeeID').references(() => employees.employeeId),
  orderDate: text('OrderDate'),
  requiredDate: text('RequiredDate'),
  shippedDate: text('ShippedDate'),
  shipVia: integer('ShipVia'),
  freight: integer('Freight'),
  shipName: text('ShipName'),
  shipAddress: text('ShipAddress'),
  shipCity: text('ShipCity'),
  shipRegion: text('ShipRegion'),
  shipPostalCode: text('ShipPostalCode'),
  shipCountry: text('ShipCountry'),
});
export type Orders = InferModel<typeof orders>;
