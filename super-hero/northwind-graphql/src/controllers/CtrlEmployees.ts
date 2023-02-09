import { Employees } from '../data/repositories/Employees';
import { metrics } from './metrics';
import { TypedDataResponse, RowCount } from '../interfaces/Ctrl';
import { AllEmployees, EmployeeById } from '../interfaces/CtrlEmployees';

const employees = new Employees();

export class CtrlEmployees {
  async getRowCount() {
    const triggerDate = metrics.getTriggerDate();
    const data = await employees.getRowCount();
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<RowCount> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString: data.sqlString,
      data: data.data,
    };

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }

  async getAllEmployees(limit: number, page: number) {
    const triggerDate = metrics.getTriggerDate();
    const { sqlString, data } = await employees.getAllEmployees(limit, page);
    const duration = metrics.getTimeInterval(triggerDate);

    const changedName: AllEmployees = data.reduce(
      (employees: AllEmployees, employee) => {
        employees.push({
          Id: employee.Id,
          Name: `${employee.FirstName} ${employee.LastName}`,
          Title: employee.Title,
          City: employee.City,
          Phone: employee.Phone,
          Country: employee.Country,
        });
        return employees;
      },
      [],
    );

    const typedDataResponse: TypedDataResponse<AllEmployees> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString,
      data: changedName,
    };

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }

  async getEmployeeById(id: number) {
    const triggerDate = metrics.getTriggerDate();
    const { sqlString, data } = await employees.getEmployeeById(`${id}`);

    let changedName: [] | EmployeeById;
    if (!data[0]) {
      changedName = [];
    } else {
      const { ReportsToId } = data[0];
      const { employeeAcceptsReport } =
        await employees.getEmployeeAcceptsReport(`${ReportsToId}`);

      changedName = data.reduce((acc: EmployeeById, el) => {
        acc.push({
          Id: el.Id,
          Name: `${el.FirstName} ${el.LastName}`,
          Title: el.Title,
          TitleOfCourtesy: el.TitleOfCourtesy,
          BirthDate: el.BirthDate,
          HireDate: el.HireDate,
          Address: el.Address,
          City: el.City,
          PostalCode: el.PostalCode,
          Country: el.Country,
          HomePhone: el.HomePhone,
          Extension: el.Extension,
          Notes: el.Notes,
          ReportsToId: employeeAcceptsReport[0].Id,
          ReportsTo: `${employeeAcceptsReport[0].FirstName} ${employeeAcceptsReport[0].LastName}`,
        });
        return acc;
      }, []);
    }
    const duration = metrics.getTimeInterval(triggerDate);

    const typedDataResponse: TypedDataResponse<[] | EmployeeById> = {
      duration,
      ts: metrics.getTimeISO(),
      servedBy: 'northwind.db',
      sqlString,
      data: changedName,
    };

    return {
      status: 'success',
      data: typedDataResponse,
    };
  }
}
