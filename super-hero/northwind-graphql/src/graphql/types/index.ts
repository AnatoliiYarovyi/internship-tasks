import { rows } from './rows';
import { customers } from './customers/customers';
import { customerById } from './customers/customerById';
import { customerByValue } from './customers/customerByValue';
import { employees } from './employees/employees';
import { employeeById } from './employees/employeeById';
import { orders } from './orders/orders';
import { orderById } from './orders/orderById';
import { products } from './products/products';
import { productById } from './products/productById';
import { productByValue } from './products/productByValue';
import { supplierById } from './suppliers/supplierById';
import { suppliers } from './suppliers/suppliers';

const typeDefs = `
type Query {
  customerRows: Rows!
  customers(limit: Int, page: Int): Customers!
  customerById(id: String!): CustomerById!
  customerByValue(value: String): CustomerByValue!

  employeeRows: Rows!
  employees(limit: Int, page: Int): Employees!
  employeeById(id: Int): EmployeeById!

  orderRows: Rows!
  orders(limit: Int, page: Int): Orders!
  orderById(id: Int): OrderById!

  productRows: Rows!
  products(limit: Int, page: Int): Products!
  productById(id: Int): ProductById!
  productByValue(value: String): ProductByValue!

  supplierRows: Rows!
  suppliers(limit: Int, page: Int): Suppliers!
  supplierById(id: Int): SupplierById!
}

${rows}
${customers}
${customerById}
${customerByValue}
${employees}
${employeeById}
${orders}
${orderById}
${products}
${productById}
${productByValue}
${suppliers}
${supplierById}
`;

export default typeDefs;
