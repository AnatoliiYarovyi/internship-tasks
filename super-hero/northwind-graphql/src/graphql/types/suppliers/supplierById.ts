export const supplierById = `
  type SupplierById {
    status: String
    data: DataSupplierById
  }
  type DataSupplierById {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultSupplierById]
    } 
  type ResultSupplierById {
    Id: Int
    Company: String
    Contact: String
    Title: String
    Address: String
    City: String
    Region: String
    PostalCode: String
    Country: String
    Phone: String
  }
`;
