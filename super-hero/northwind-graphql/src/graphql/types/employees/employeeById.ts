export const employeeById = `
  type EmployeeById {
    status: String
    data: DataEmployeeById
  }
  type DataEmployeeById {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [ResultEmployeeById]
    } 
  type ResultEmployeeById {
    Id: String
    Name: String
    Title: String
    TitleOfCourtesy: String
    BirthDate: String
    HireDate: String
    Address: String
    City: String
    PostalCode: String
    Country: String
    HomePhone: String
    Extension: Int
    Notes: String
    ReportsToId: String
    ReportsTo: String
  }
`;
