export const employees = `
  type Employees {
    status: String
    data: DataEmployees
  }
  type DataEmployees {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultEmployee]
    } 
  type ResultEmployee {
    Id: String
    Name: String
    Title: String
    City: String
    Phone: String
    Country: String
  }
`;
