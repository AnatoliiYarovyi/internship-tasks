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
  'Company Name': string;
  'Contact Name': string;
  'Contact Title': string;
  Address: string;
  City: string;
  'Postal Code': string;
  Region: string;
  Country: string;
  Phone: string;
  Fax: string;
}[];

export { AllCustomers, CustomersById };
