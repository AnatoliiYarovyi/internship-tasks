export const suppliers = `
  type Suppliers {
    status: String
    data: DataSuppliers
  }
  type DataSuppliers {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultSupplier]
    } 
  type ResultSupplier {
    Id: Int!
    Company: String
    Contact: String
    Title: String
    City: String
    Country: String
  }
`;
