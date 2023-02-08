type AllProducts = {
  Id: number;
  Name: string;
  'Qt per unit': string;
  Price: number;
  Stock: number;
  Orders: number;
}[];

type ProductById = {
  Id: number;
  ProductName: string;
  SupplierId: number;
  Supplier: string;
  'Quantity per unit': string;
  'Unit price': number;
  'Units in stock': number;
  'Units on order': number;
  'Reorder level': number;
  Discontinued: number;
}[];

type SearchProducts = {
  Id: number;
  Name: string;
  'Qt per unit': string;
  Price: number;
  Stock: number;
}[];

export { AllProducts, ProductById, SearchProducts };
