export const orderById = `
  type OrderById {
    status: String
    orderInformation: DataOrderInformation
    productsInOrder: DataProductsInOrder
  }

  type DataOrderInformation {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultOrderInformation]
    } 
  type ResultOrderInformation {
    Id: Int
    CustomerId: String
    ShipName: String
    TotalProducts: Float
    TotalQuantity: Float
    TotalPrice: Float
    TotalDiscount: Float
    ShipVia: String
    Freight: Float
    OrderDate: String
    RequiredDate: String
    ShippedDate: String
    ShipCity: String
    ShipRegion: String
    ShipPostalCode: String
    ShipCountry: String
  }

  type DataProductsInOrder {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultProductInOrder]
    } 
  type ResultProductInOrder {
    Id: Int
    ProductId: Int
    Product: String
    Quantity: Float
    OrderPrice: Float
    TotalPrice: Float
    Discount: Float
  }
`;
