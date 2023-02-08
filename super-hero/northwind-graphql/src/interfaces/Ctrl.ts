interface TypedDataResponse<T> {
  duration: number;
  ts: string;
  servedBy: 'northwind.db';
  sqlString: string;
  data: T;
}

type RowCount = { RowCount: number }[];

export { TypedDataResponse, RowCount };
