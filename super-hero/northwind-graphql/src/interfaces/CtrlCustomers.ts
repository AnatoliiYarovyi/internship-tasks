type AllCustomers = {
  Id: string;
  Company: string;
  Contact: string;
  Title: string;
  City: string;
  Country: string;
}[];

type CustomersById = {
  Id: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Address: string;
  City: string;
  PostalCode: string;
  Region: string;
  Country: string;
  Phone: string;
  Fax: string;
}[];

type SearchCustomers = {
  Id: string;
  Name: string;
  Contact: string;
  Title: string;
  Phone: string;
}[];

export { AllCustomers, CustomersById, SearchCustomers };
