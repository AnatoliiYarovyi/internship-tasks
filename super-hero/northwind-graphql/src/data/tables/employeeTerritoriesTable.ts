import { InferModel, integer, sqliteTable } from 'drizzle-orm-sqlite';

import { employees } from './employeesTable';
import { territories } from './territoriesTable';

export const employeeTerritories = sqliteTable('EmployeeTerritories', {
  EmployeeID: integer('EmployeeID')
    .primaryKey()
    .references(() => employees.employeeId),
  TerritoryID: integer('TerritoryID')
    .primaryKey()
    .references(() => territories.territoryId),
});
export type EmployeeTerritories = InferModel<typeof employeeTerritories>;
