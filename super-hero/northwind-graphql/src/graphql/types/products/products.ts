export const products = `
  type Products {
    status: String
    data: DataProducts
  }
  type DataProducts {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultProduct]
    } 
  type ResultProduct {
    Id: Int
    Name: String
    QtPerUnit: String
    Price: Float
    Stock: Float
    Orders: Float
  }
`;
