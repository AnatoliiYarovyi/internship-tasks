export const customerByValue = `
  type CustomerByValue {
    status: String
    data: DataCustomerByValue
  }
  type DataCustomerByValue {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultCustomerByValue]
    } 
  type ResultCustomerByValue {
    Id: String
    Name: String
    Contact: String
    Title: String
    Phone: String
  }
`;
