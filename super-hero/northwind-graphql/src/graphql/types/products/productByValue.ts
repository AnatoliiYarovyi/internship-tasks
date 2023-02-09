export const productByValue = `
  type ProductByValue {
    status: String
    data: DataProductByValue
  }
  type DataProductByValue {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultProductByValue]
    } 
  type ResultProductByValue {
    Id: Int
    Name: String
    QtPerUnit: String
    Price: Float
    Stock: Float
  }
`;
