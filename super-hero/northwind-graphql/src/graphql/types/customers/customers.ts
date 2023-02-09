export const customers = `
  type Customers {
    status: String
    data: DataCustomers
  }
  type DataCustomers {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultCustomer]
    } 
  type ResultCustomer {
    Id: String
    Company: String
    Contact: String
    Title: String
    City: String
    Country: String
  }
`;
