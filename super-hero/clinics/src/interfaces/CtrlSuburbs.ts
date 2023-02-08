type AllOrders = {
  Id: number;
  'Total Price': number;
  Products: number;
  Quantity: number;
  Shipped: string;
  'Ship Name': string;
  City: string;
  Country: string;
}[];

type OrderInformation = {
  sqlString: string;
  data: [] | OrderInformationById;
};

type OrderInformationById = {
  Id: number;
  'Customer Id': string;
  'Ship Name': string;
  'Total Products': number;
  'Total Quantity': number;
  'Total Price': number;
  'Total Discount': number;
  'Ship Via': string;
  Freight: number;
  'Order Date': string;
  'Required Date': string;
  'Shipped Date': string;
  'Ship City': string;
  'Ship Region': string;
  'Ship Postal Code': string;
  'Ship Country': string;
}[];

type ProductsInOrder = {
  Id: number;
  ProductId: number;
  Product: string;
  Quantity: number;
  'Order Price': number;
  'Total Price': number;
  Discount: unknown;
}[];

export { AllOrders, OrderInformation, OrderInformationById, ProductsInOrder };
