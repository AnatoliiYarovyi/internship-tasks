type AllOrders = {
  Id: number;
  TotalPrice: number;
  Products: number;
  Quantity: number;
  Shipped: string;
  ShipName: string;
  City: string;
  Country: string;
}[];

type OrderInformation = {
  sqlString: string;
  data: [] | OrderInformationById;
};

type OrderInformationById = {
  Id: number;
  CustomerId: string;
  ShipName: string;
  TotalProducts: number;
  TotalQuantity: number;
  TotalPrice: number;
  TotalDiscount: number;
  ShipVia: string;
  Freight: number;
  OrderDate: string;
  RequiredDate: string;
  ShippedDate: string;
  ShipCity: string;
  ShipRegion: string;
  ShipPostalCode: string;
  ShipCountry: string;
}[];

type ProductsInOrder = {
  Id: number;
  ProductId: number;
  Product: string;
  Quantity: number;
  OrderPrice: number;
  TotalPrice: number;
  Discount: unknown;
}[];

export { AllOrders, OrderInformation, OrderInformationById, ProductsInOrder };
