import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq } from 'drizzle-orm/expressions';
import { sql } from 'drizzle-orm';

import { connecting } from '../../db/connecting';
import { employees } from '../tables/employeesTable';

export class Employees {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const queryTemp = this.db.select(employees).fields({
      RowCount: sql`count(${employees.employeeId})`.as<number>(),
    });
    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw.replace(/"/gm, "'");

    return { sqlString, data };
  }

  async getAllEmployees(limit: number, page: number) {
    const offset = this.getOffset(limit, page);
    const queryTemp = this.db
      .select(employees)
      .fields({
        Id: employees.employeeId,
        FirstName: employees.firstName,
        LastName: employees.lastName,
        Title: employees.title,
        City: employees.city,
        Phone: employees.homePhone,
        Country: employees.country,
      })
      .limit(limit)
      .offset(offset);

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace('limit ?', `limit ${limit}`)
      .replace('offset ?', `offset ${offset}`);

    return { sqlString, data };
  }

  async getEmployeeById(id: string) {
    const queryTemp = this.db
      .select(employees)
      .fields({
        Id: employees.employeeId,
        FirstName: employees.firstName,
        LastName: employees.lastName,
        Title: employees.title,
        TitleOfCourtesy: employees.titleOfCourtesy,
        BirthDate: employees.birthDate,
        HireDate: employees.hireDate,
        Address: employees.address,
        City: employees.city,
        PostalCode: employees.postalCode,
        Country: employees.country,
        HomePhone: employees.homePhone,
        Extension: employees.extension,
        Notes: employees.notes,
        ReportsToId: employees.reportsTo,
      })
      .where(eq(employees.employeeId, id));

    const data = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`'EmployeeID' = ?`, `'EmployeeID' = ${id}`);

    return { sqlString, data };
  }

  async getEmployeeAcceptsReport(id: string) {
    const queryTemp = this.db
      .select(employees)
      .fields({
        Id: employees.employeeId,
        FirstName: employees.firstName,
        LastName: employees.lastName,
      })
      .where(eq(employees.employeeId, id));

    const employeeAcceptsReport = queryTemp.all();
    const { sql: sqlRaw } = queryTemp.toSQL();
    const sqlString = sqlRaw
      .replace(/"/gm, "'")
      .replace(`'EmployeeID' = ?`, `'EmployeeID' = ${id}`);

    return { sqlString, employeeAcceptsReport };
  }
}
