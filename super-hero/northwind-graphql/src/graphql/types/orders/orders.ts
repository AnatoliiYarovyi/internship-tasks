export const orders = `
  type Orders {
    status: String
    data: DataOrders
  }
  type DataOrders {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultOrder]
    } 
  type ResultOrder {
    Id: Int
    TotalPrice: Float
    Products: Float
    Quantity: Float
    Shipped: String
    ShipName: String
    City: String
    Country: String
  }
`;
