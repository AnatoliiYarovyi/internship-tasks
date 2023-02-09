type AllProducts = {
  Id: number;
  Name: string;
  QtPerUnit: string;
  Price: number;
  Stock: number;
  Orders: number;
}[];

type ProductById = {
  Id: number;
  ProductName: string;
  SupplierId: number;
  Supplier: string;
  QuantityPerUnit: string;
  UnitPrice: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
  ReorderLevel: number;
  Discontinued: number;
}[];

type SearchProducts = {
  Id: number;
  Name: string;
  QtPerUnit: string;
  Price: number;
  Stock: number;
}[];

export { AllProducts, ProductById, SearchProducts };
