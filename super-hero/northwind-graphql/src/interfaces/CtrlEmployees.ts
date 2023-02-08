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
  'Title Of Courtesy': string;
  'Birth Date': string;
  'Hire Date': string;
  Address: string;
  City: string;
  'Postal Code': string;
  Country: string;
  'Home Phone': string;
  Extension: number;
  Notes: string;
  ReportsToId: string;
  'Reports To': string;
}[];

export { AllEmployees, EmployeeById };
