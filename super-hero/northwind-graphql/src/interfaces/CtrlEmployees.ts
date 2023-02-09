type AllEmployees = {
  Id: string;
  Name: string;
  Title: string;
  City: string;
  Phone: string;
  Country: string;
}[];

type EmployeeById = {
  Id: string;
  Name: string;
  Title: string;
  TitleOfCourtesy: string;
  BirthDate: string;
  HireDate: string;
  Address: string;
  City: string;
  PostalCode: string;
  Country: string;
  HomePhone: string;
  Extension: number;
  Notes: string;
  ReportsToId: string;
  ReportsTo: string;
}[];

export { AllEmployees, EmployeeById };
