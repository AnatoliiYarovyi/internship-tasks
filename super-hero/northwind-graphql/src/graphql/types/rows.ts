export const rows = `
  type Rows {
    status: String
    data: DataRows
  }
  type DataRows {
      duration: Float
      ts: String
      servedBy: String
      sqlString: String
      data: [RowCount]
  }
    
  type RowCount { RowCount: Int }
`;
