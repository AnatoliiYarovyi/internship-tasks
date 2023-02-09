type AllSuppliers = {
  Id: number;
  Company: string;
  Contact: string;
  Title: string;
  City: string;
  Country: string;
}[];

type SupplierById = {
  Id: number;
  Company: string;
  Contact: string;
  Title: string;
  Address: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  Phone: string;
}[];

export { AllSuppliers, SupplierById };
