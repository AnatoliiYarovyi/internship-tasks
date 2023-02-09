export const productById = `
  type ProductById {
    status: String
    data: DataProductById
  }
  type DataProductById {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultProductById]
    } 
  type ResultProductById {
    Id: Int
    ProductName: String
    SupplierId: Int
    Supplier: String
    QuantityPerUnit: String
    UnitPrice: Float
    UnitsInStock: Float
    UnitsOnOrder: Int
    ReorderLevel: Int
    Discontinued: Float
  }
`;
