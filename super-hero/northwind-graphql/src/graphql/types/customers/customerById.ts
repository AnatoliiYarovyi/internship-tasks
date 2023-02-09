export const customerById = `
  type CustomerById {
    status: String
    data: DataCustomerById
  }
  type DataCustomerById {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultCustomerById]
    } 
  type ResultCustomerById {
    Id: String
    CompanyName: String
    ContactName: String
    ContactTitle: String
    Address: String
    City: String
    PostalCode: String
    Region: String
    Country: String
    Phone: String
    Fax: String
  }
`;
